// models/User.js

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublic: Boolean,
  isThot: Boolean,
  meta: {
    votes: Number,
    views: Number,
    comments: Number,
  },
});

module.exports =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogSchema);
