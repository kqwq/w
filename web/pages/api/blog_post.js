// api/users.js

import dbConnect from "../../lib/dbConnect";
import BlogPost from "../../models/BlogPost";
import crypto from "crypto";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const posts = await BlogPost.find({}).sort("-date").limit(100);
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        let attemptAdminPass = Buffer.from(req.headers["x-adminpass"]); // Yes I know this isn't the usual implementation but I want to be more sweet and simple
        let correctPassword = Buffer.from(process.env.ADMIN_PASSWORD_HASH);

        console.log(attemptAdminPass, correctPassword);
        if (crypto.timingSafeEqual(attemptAdminPass, correctPassword)) {
          const user = await BlogPost.create(req.body);
          res.status(201).json({ success: true, data: user });
        } else {
          res.status(403).json({ success: false });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
