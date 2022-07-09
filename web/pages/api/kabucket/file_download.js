import { getProgram } from "../../../lib/ka_utils";
import KABucket from "../../../models/KABucket";
import { }

export default async (req, res) => {
  try {
    let bucket = await KABucket.findOne({ _id: req.query.bucketId }, { ip: 0 });
    let programIds = bucket.programIds;

    // Response
    res.status(200).json({ success: true });

    const chunks = []
    for (let pid of programIds) {
      const scratchpad = await getProgram(pid);
      chunks.push(scratchpad.revision.code)
    }
    const contents = chunks.join("");
    chunks.length = 0; // Garbage collect

    // Create file
    const bitmap = Buffer.from(contents, 'base64');
    await fs





  
  } catch (e) {
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: e });
    }
    console.error(e);
  }
};
