const CampusHighlight = require("../models/campusHighlight.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Create a new campus highlight (Video)
// @route   POST /api/v1/campus-highlights
const createHighlight = asyncHandler(async (req, res) => {
  const highlight = await CampusHighlight.create(req.body);

  return res
    .status(201)
    .json(
      new ApiResponse(201, highlight, "Campus highlight created successfully"),
    );
});

// @desc    Get all campus highlights
// @route   GET /api/v1/campus-highlights
const getAllHighlights = asyncHandler(async (req, res) => {
  const highlights = await CampusHighlight.find().sort({ eventDate: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        highlights,
        "Campus highlights fetched successfully",
      ),
    );
});

// @desc    Get a single campus highlight by ID
// @route   GET /api/v1/campus-highlights/:id
const getHighlightById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Highlight ID format");
  }

  const highlight = await CampusHighlight.findById(id);

  if (!highlight) {
    throw new ApiError(404, "Campus highlight not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, highlight, "Campus highlight fetched successfully"),
    );
});

// @desc    Update a campus highlight
// @route   PATCH /api/v1/campus-highlights/:id
const updateHighlight = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Highlight ID format");
  }

  const updatedHighlight = await CampusHighlight.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedHighlight) {
    throw new ApiError(404, "Campus highlight not found to update");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedHighlight,
        "Campus highlight updated successfully",
      ),
    );
});

// @desc    Delete a campus highlight
// @route   DELETE /api/v1/campus-highlights/:id
const deleteHighlight = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Highlight ID format");
  }

  const deletedHighlight = await CampusHighlight.findByIdAndDelete(id);

  if (!deletedHighlight) {
    throw new ApiError(404, "Campus highlight not found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Campus highlight deleted successfully"));
});

module.exports = {
  createHighlight,
  getAllHighlights,
  getHighlightById,
  updateHighlight,
  deleteHighlight,
};
