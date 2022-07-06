// api/users.js

import dbConnect from "../../lib/dbConnect";
import Comment from "../../models/Comment";
import BlogPost from "../../models/BlogPost";
import getIp from "../../lib/getIp";
import { validateAdminPassword } from "../../lib/adminPassword";
import Sentiment from "sentiment";
let sentiment = new Sentiment();

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (1 || validateAdminPassword(req)) {
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
        let result = sentiment.analyze(json.body);
        json.meta = {
          sentimentScore: result.score,
          sentimentComparative: result.comparative,
        };
        let posInc = result.score >= 0 ? 1 : 0;
        let negInc = result.score < 0 ? 1 : 0;

        const comment = await Comment.create(json);
        await BlogPost.findOneAndUpdate(
          { _id: json.postId },
          {
            $inc: {
              "meta.comments": 1,
              "meta.positiveComments": posInc,
              "meta.negativeComments": negInc,
            },
          }
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
