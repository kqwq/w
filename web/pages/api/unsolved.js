import dbConnect from "../../lib/dbConnect";
import UnsolvedProblem from "../../models/UnsolvedProblem";
import { validateAdminPassword } from "../../lib/adminPassword";
import { validateContentPassword } from "../../lib/contentPassword";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const problems = await UnsolvedProblem.find({})
          .limit(105)
          .sort("problemNumber");
        res.status(200).json({ success: true, data: problems });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        if (validateAdminPassword(req)) {
          const problem = await UnsolvedProblem.create(req.body);
          res.status(201).json({ success: true, data: problem });
        } else {
          res.status(403).json({ success: false });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        if (validateAdminPassword(req)) {
          const problem = await UnsolvedProblem.findOneAndUpdate(
            { _id: req.body._id },
            {
              $set: {
                problemNumber: req.body.problemNumber,
                title: req.body.title,
                body: req.body.body,
                tags: req.body.tags,
                lastEdited: req.body.lastEdited,
              },
            },
            {
              new: true,
            }
          );
          res.status(201).json({ success: true, data: problem });
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
