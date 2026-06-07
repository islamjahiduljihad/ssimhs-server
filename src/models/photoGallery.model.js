const mongoose = require("mongoose");

const photoGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Photo title/event name is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    eventDate: {
      type: Date,
      default: Date.now,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PhotoGallery", photoGallerySchema);
