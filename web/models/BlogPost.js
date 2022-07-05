// models/User.js

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String],
  comments: [{ body: String, date: Date, author: String, ip: String }],
  date: { type: Date, default: Date.now },
  isPublic: Boolean,
  isThot: Boolean,
  meta: {
    votes: Number,
    views: Number,
  },
});

module.exports =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogSchema);
