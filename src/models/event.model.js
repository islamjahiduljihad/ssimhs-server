const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    coverImageUrl: {
      type: String,
      required: [true, "Event cover image URL is required"],
    },
    registrationLink: {
      type: String,
      default: "",
    },
    highlights: [
      {
        type: String,
      },
    ],
    eventSchedule: [
      {
        time: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
      },
    ],
    organizer: {
      clubName: { type: String, trim: true },
      contactPerson: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
    },
    chiefGuest: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
