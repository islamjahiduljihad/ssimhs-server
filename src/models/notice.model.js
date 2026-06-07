const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    refNo: {
      type: String,
      required: [true, "Reference number is required"],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Notice content is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required (e.g., Academic, Administrative)"],
      trim: true,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    issuedBy: {
      type: String,
      default: "Office of the Principal",
    },
    directives: [
      {
        type: String,
      },
    ],
    signatory: {
      name: {
        type: String,
        required: [true, "Signatory name is required"],
      },
      designation: {
        type: String,
        required: [true, "Signatory designation is required"],
      },
    },
    attachment: {
      fileName: { type: String },
      fileUrl: { type: String },
      fileSize: { type: String },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notice", noticeSchema);
