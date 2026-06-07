const Notice = require("../models/notice.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Create a new notice
// @route   POST /api/v1/notices
const createNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, notice, "Notice created successfully"));
});

// @desc    Get all notices
// @route   GET /api/v1/notices
const getAllNotices = asyncHandler(async (req, res) => {
  const notices = await Notice.find().sort({ publishedDate: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, notices, "Notices fetched successfully"));
});

// @desc    Get a single notice by ID
// @route   GET /api/v1/notices/:id
const getNoticeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Notice ID format");
  }

  const notice = await Notice.findById(id);

  if (!notice) {
    throw new ApiError(404, "Notice not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notice, "Notice fetched successfully"));
});

// @desc    Update a notice
// @route   PATCH /api/v1/notices/:id
const updateNotice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Notice ID format");
  }

  const updatedNotice = await Notice.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedNotice) {
    throw new ApiError(404, "Notice not found to update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNotice, "Notice updated successfully"));
});

// @desc    Delete a notice
// @route   DELETE /api/v1/notices/:id
const deleteNotice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Notice ID format");
  }

  const deletedNotice = await Notice.findByIdAndDelete(id);

  if (!deletedNotice) {
    throw new ApiError(404, "Notice not found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Notice deleted successfully"));
});

module.exports = {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};
