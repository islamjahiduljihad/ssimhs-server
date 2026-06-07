const mongoose = require("mongoose");

const studentActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Activity title is required"],
      trim: true,
    },
    activityType: {
      type: String,
      required: [true, "Activity type/category is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Activity date is required"],
    },
    description: {
      type: String,
      required: [true, "Activity description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Activity image URL is required"],
    },
    location: {
      type: String,
      default: "School Campus",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("StudentActivity", studentActivitySchema);
