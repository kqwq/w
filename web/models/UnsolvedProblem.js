// models/UnsolvedProblem.js

import mongoose from "mongoose";

const unsolvedProblemSchema = new mongoose.Schema({
  problemNumber: {
    type: Number,
    default: -1,
  },
  title: String,
  body: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  meta: {
    votes: Number,
    views: Number,
    comments: Number,
  },
  isSolved: {
    type: Boolean,
    default: false,
  },
  solution: {
    solvedBy: {
      type: String,
      default: null,
    },
    solvedDate: {
      type: Date,
      default: null,
    },
    solutionInfo: {
      type: String,
      default: null,
    },
  },
});

export default mongoose.models.UnsolvedProblem ||
  mongoose.model("UnsolvedProblem", unsolvedProblemSchema);
