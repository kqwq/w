// models/Project.js

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  authors: [String],
  category: [String],
  programIds: [String],
  ip: String,
  complete: Boolean,
  agentType: String,
  contentsLength: Number,
  bytes: Number,
  description: String,
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
