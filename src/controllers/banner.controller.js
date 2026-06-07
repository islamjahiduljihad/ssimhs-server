const Banner = require("../models/banner.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Create a new banner
// @route   POST /api/v1/banners
const createBanner = asyncHandler(async (req, res) => {
  const { title, description, buttonText, buttonTargetUrl, imageUrl } =
    req.body;

  // ১. ম্যানুয়াল ভ্যালিডেশন (যদিও মঙ্গুজ করবে, তবু এখানে ডাবল চেক করা ভালো)
  if (!title || !description || !imageUrl) {
    throw new ApiError(400, "Title, description, and image URL are required");
  }

  // ২. ডাটাবেজে সেভ করা
  const banner = await Banner.create({
    title,
    description,
    buttonText,
    buttonTargetUrl,
    imageUrl,
  });

  // ৩. সাকসেস রেসপন্স পাঠানো
  return res
    .status(201)
    .json(new ApiResponse(201, banner, "Banner created successfully"));
});

// @desc    Get all banners
// @route   GET /api/v1/banners
const getAllBanners = asyncHandler(async (req, res) => {
  // সব ব্যানার খুঁজবে এবং লেটেস্ট গুলো আগে দেখাবে (sort -1)
  const banners = await Banner.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, banners, "Banners fetched successfully"));
});

// @desc    Get a single banner by ID
// @route   GET /api/v1/banners/:id
const getBannerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Banner ID format");
  }

  const banner = await Banner.findById(id);

  if (!banner) {
    throw new ApiError(404, "Banner not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, banner, "Banner fetched successfully"));
});

// @desc    Update a banner
// @route   PATCH /api/v1/banners/:id
const updateBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Banner ID format");
  }

  // new: true দিলে আপডেটেড ডেটা রিটার্ন করে, runValidators: true দিলে স্কিমার রুলস চেক করে
  const updatedBanner = await Banner.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedBanner) {
    throw new ApiError(404, "Banner not found to update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBanner, "Banner updated successfully"));
});

// @desc    Delete a banner
// @route   DELETE /api/v1/banners/:id
const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Banner ID format");
  }

  const deletedBanner = await Banner.findByIdAndDelete(id);

  if (!deletedBanner) {
    throw new ApiError(404, "Banner not found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Banner deleted successfully"));
});

module.exports = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
};
