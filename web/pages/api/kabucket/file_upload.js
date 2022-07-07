import { IncomingForm } from "formidable";
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from "fs";
import { KHAN_ACADEMY_PROGRAM_CHAR_LIMIT } from "../../../constants";
import getIp from "../../../lib/getIp";
import { createProgram, login } from "../../../lib/ka_utils";
import KABucket from "../../../models/KABucket";

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (process.fileUploadBusy) {
    /////////////////////////////////todo revert
    res
      .status(503)
      .json({ success: false, message: "Server busy with another upload." });
    return;
  }
  process.fileUploadBusy = true;

  try {
    let socket = process.socket || { emit: (a, b) => {} };
    socket.emit("update", {
      msg: "Receiving file...",
      percent: 1,
    });

    // parse form with a Promise wrapper
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // read file from the temporary path
    const fileObj = data?.files?.myfile;
    if (!fileObj) {
      res.status(500).send({ success: false, message: "No file uploaded" });
      return;
    }
    socket.emit("update", {
      msg: "Reading file...",
      percent: 3,
    });
    let contents = await fs.readFile(fileObj?.filepath, "base64");
    // contents is a string with the content of uploaded file, so you can read it or store
    // await fs.writeFile("./uploads_debug/" + fileObj.originalFilename, contents);
    res.status(200).json({ success: true });

    // Split contents into small pieces
    socket.emit("update", {
      msg: "Splitting file into chunks...",
      percent: 4,
    });
    const contentsLength = contents.length;
    const chunks = [];
    for (let i = 0; i < contents.length; i += KHAN_ACADEMY_PROGRAM_CHAR_LIMIT) {
      chunks.push(contents.slice(i, i + KHAN_ACADEMY_PROGRAM_CHAR_LIMIT));
    }
    contents = null; // free up some memory

    /* KA upload part */

    // Get fields from form data
    let agentType = data?.fields?.agent;
    let kaUsername, kaPassword;
    if (agentType === "personal") {
      kaUsername = data?.fields?.username;
      kaPassword = data?.fields?.password;
    } else {
      kaUsername = process.env.KHAN_ACADEMY_SHARED_USERNAME;
      kaPassword = process.env.KHAN_ACADEMY_SHARED_PASSWORD;
    }

    // Get KAAS login credential from either cache, shared credentials, or personal credentials
    let kaas;
    if (process.kaas) {
      kaas = process.kaas;
    } else {
      socket.emit("update", {
        msg: "Logging into Khan Academy...",
        percent: 5,
      });
      kaas = await login(kaUsername, kaPassword);
    }
    if (kaas) {
      process.kaas = kaas; // cache kaas key
    } else {
      socket.emit("update", {
        msg: "Error logging in. Please try again",
        percent: 6,
      });
      throw new Error("Error logging in. Please try again");
    }

    // Create database entry
    socket.emit("update", {
      msg: "Saving metadata...",
      percent: 8,
    });
    let bucketJson = {
      filename: fileObj.originalFilename || "unknown_filename",
      programIds: [],
      ip: getIp(req),
      complete: false,
      agentType,
      contentsLength,
    };
    console.log(bucketJson);
    let myBucket = await KABucket.create(bucketJson);

    // Create the program(s)
    let percentWithChunks;
    let programIdList = [];
    for (let i = 0; i < chunks.length; i++) {
      // Create program on KA
      percentWithChunks = i / chunks.length;
      socket.emit("update", {
        msg: `Creating program...`,
        percent: 10 + percentWithChunks * 80, // progress from 10% to 90%
      });
      let programRes = await createProgram(kaas, chunks[i], "::New program");
      if (!programRes.ok) {
        throw new Error("Error creating program: " + programRes.message);
      }
      let programJson = await programRes.json();
      programIdList.push(programJson.id);
      console.log(programJson.id);

      // Update mongodb bucket metadata
      percentWithChunks = (i + 0.5) / chunks.length;
      socket.emit("update", {
        msg: `Creating program ${programJson.id}... (metadata)`,
        percent: 10 + percentWithChunks * 80,
      });
      await KABucket.findOneAndUpdate(
        { _id: myBucket._id },
        { $push: { programIds: programJson.id } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      ).clone();
    }

    // Set mongodb bucket complete field to true
    await KABucket.findOneAndUpdate(
      { _id: myBucket._id },
      { $set: { complete: true } }
    );

    socket.emit("update", {
      msg: `Done::` + JSON.stringify(programIdList),
      percent: 100,
    });
    process.fileUploadBusy = false; // made it through
  } catch (e) {
    process.fileUploadBusy = false; // If error occurred, upload proces is no longer busy
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: e });
    }

    console.error(e);
  }
};
