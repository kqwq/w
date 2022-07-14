// api/users.js

import dbConnect from "../../lib/dbConnect";
import BlogPost from "../../models/BlogPost";
import crypto from "crypto";
import { validateAdminPassword } from "../../lib/adminPassword";
import { validateContentPassword } from "../../lib/contentPassword";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (validateContentPassword(req)) {
          const posts = await BlogPost.find({}).sort("-date").limit(10);
          res.status(200).json({ success: true, data: posts });
        } else {
          res.status(403).json({ success: false });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        if (validateAdminPassword(req)) {
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
