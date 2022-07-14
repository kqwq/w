// api/users.js

import dbConnect from "../../lib/dbConnect";
import BlogPost from "../../models/BlogPost";
import { validateAdminPassword } from "../../lib/adminPassword";
import { validateContentPassword } from "../../lib/contentPassword";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const validated = await validateContentPassword(req.query.content_pw);
        if (validated) {
          console.log(req.query.content_pw);
          let aggregateList = [
            {
              $match: { isThot: req.query.isThot === "true" },
            },
          ];
          if (req.query.sort === "random") {
            aggregateList.push({
              $sample: { size: 3 },
            });
            aggregateList.push({
              $sort: { date: -1 },
            });
          } else if (req.query.sort === "recent") {
            aggregateList.push({
              $sort: { date: -1 },
            });
            aggregateList.push({
              $limit: 10,
            });
          }
          const posts = await BlogPost.aggregate(aggregateList);
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
