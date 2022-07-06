// models/Comment.js

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  body: String,
  date: { type: Date, default: Date.now },
  author: String,
  ip: String, // Gets added in comment.js "middleware" - can be safely ignored
  postId: String,
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
