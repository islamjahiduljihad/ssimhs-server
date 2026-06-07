const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "News title is required"],
      trim: true,
    },
    author: {
      type: String,
      default: "Campus Correspondent",
      trim: true,
    },
    readTime: {
      type: String,
      default: "3 Min Read",
    },
    content: {
      type: String,
      required: [true, "News content is required"],
    },
    thumbnailUrl: {
      type: String,
      required: [true, "News thumbnail URL is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("News", newsSchema);
