// api/comment/[postId]

import dbConnect from "../../../lib/dbConnect";
import BlogPost from "../../../models/Comment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log(req.query);
        const posts = await BlogPost.find({ postId: req.query.postId })
          .sort("-date")
          .limit(100);
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
