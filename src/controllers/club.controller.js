const Club = require("../models/club.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Create a new club
// @route   POST /api/v1/clubs
const createClub = asyncHandler(async (req, res) => {
  const club = await Club.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, club, "Club profile created successfully"));
});

// @desc    Get all clubs
// @route   GET /api/v1/clubs
const getAllClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find().sort({ name: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, clubs, "Clubs fetched successfully"));
});

// @desc    Get a single club by ID
// @route   GET /api/v1/clubs/:id
const getClubById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Club ID format");
  }

  const club = await Club.findById(id);

  if (!club) {
    throw new ApiError(404, "Club not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, club, "Club details fetched successfully"));
});

// @desc    Update a club profile
// @route   PATCH /api/v1/clubs/:id
const updateClub = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Club ID format");
  }

  const updatedClub = await Club.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedClub) {
    throw new ApiError(404, "Club not found to update");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedClub, "Club profile updated successfully"),
    );
});

// @desc    Delete a club
// @route   DELETE /api/v1/clubs/:id
const deleteClub = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Club ID format");
  }

  const deletedClub = await Club.findByIdAndDelete(id);

  if (!deletedClub) {
    throw new ApiError(404, "Club not found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Club deleted successfully"));
});

module.exports = {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
};
