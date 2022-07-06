// api/users.js

import dbConnect from "../../lib/dbConnect";
import Comment from "../../models/Comment";
import BlogPost from "../../models/BlogPost";
import getIp from "../../lib/getIp";
import { validateAdminPassword } from "../../lib/adminPassword";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (validateAdminPassword(req)) {
          const comments = await Comment.find({}).sort("-date").limit(20);
          res.status(200).json({ success: true, data: comments });
        } else {
          res.status(403).json({ success: false });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        let json = req.body;
        json.ip = getIp(req);
        const comment = await Comment.create(json);
        await BlogPost.findOneAndUpdate(
          { _id: json.postId },
          { $inc: { "meta.comments": 1 } }
        );
        res.status(201).json({ success: true, data: comment });
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