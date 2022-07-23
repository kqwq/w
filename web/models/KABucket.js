// models/KABucket.js

import mongoose from "mongoose";

const bucketSchema = new mongoose.Schema({
  filename: String,
  programIds: [String],
  ip: String,
  complete: Boolean,
  agentType: String,
  date: { type: Date, default: Date.now },
  contentsLength: Number,
  bytes: Number,
  contentsLength: Number,
  description: String,
});

export default mongoose.models.KABucket ||
  mongoose.model("KABucket", bucketSchema);
