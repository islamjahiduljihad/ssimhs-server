const mongoose = require("mongoose");

const campusHighlightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Highlight title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Highlight description is required"],
      trim: true,
    },
    videoUrl: {
      type: String,
      required: [true, "YouTube or Video URL is required"],
    },
    thumbnailUrl: {
      type: String,
      required: [true, "Video thumbnail URL is required"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("CampusHighlight", campusHighlightSchema);
