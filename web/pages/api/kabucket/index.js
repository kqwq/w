import KABucket from "../../../models/KABucket";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const buckets = await KABucket.find({}, { ip: 0 })
          .sort("-date")
          .limit(100);
        res.status(200).json({ success: true, data: buckets });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
  }
}
