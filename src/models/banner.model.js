const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Banner title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Banner description is required"],
      trim: true,
    },
    buttonText: {
      type: String,
      default: "Learn More",
    },
    buttonTargetUrl: {
      type: String,
      default: "/",
    },
    imageUrl: {
      type: String,
      required: [true, "Banner image URL is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Banner", bannerSchema);
