// api/comment/[postId]

import { validateAdminPassword } from "../../../lib/adminPassword";
import dbConnect from "../../../lib/dbConnect";
import BlogPost from "../../../models/Comment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let pid = req.query.postId;
        if (pid === "thots_contact") {
          let valid = validateAdminPassword(req);
          if (!valid) {
            res.status(403).json({ success: false });
            return;
          }
        }
        const posts = await BlogPost.find({ postId: pid }, { ip: 0 })

          .sort("date")
          .limit(100);
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
