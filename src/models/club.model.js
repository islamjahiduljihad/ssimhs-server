const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Club name is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Club category is required"],
      trim: true,
    },
    logoUrl: {
      type: String,
      required: [true, "Club logo or cover image is required"],
    },
    description: {
      type: String,
      required: [true, "Club description is required"],
    },
    mission: {
      type: String,
      trim: true,
    },
    vision: {
      type: String,
      trim: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    moderator: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      imageUrl: { type: String },
    },
    executiveCommittee: [
      {
        studentName: { type: String, required: true },
        role: { type: String, required: true },
        class: { type: String },
        imageUrl: { type: String },
      },
    ],
    meetingSchedule: {
      type: String,
      default: "To be announced",
    },
    achievements: [
      {
        type: String,
      },
    ],
    contactInfo: {
      email: { type: String },
      facebookPage: { type: String },
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Club", clubSchema);
