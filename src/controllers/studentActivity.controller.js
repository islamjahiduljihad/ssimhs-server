const StudentActivity = require("../models/studentActivity.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Create a new student activity
// @route   POST /api/v1/student-activities
const createActivity = asyncHandler(async (req, res) => {
  const activity = await StudentActivity.create(req.body);

  return res
    .status(201)
    .json(
      new ApiResponse(201, activity, "Student activity created successfully"),
    );
});

// @desc    Get all student activities
// @route   GET /api/v1/student-activities
const getAllActivities = asyncHandler(async (req, res) => {
  const activities = await StudentActivity.find().sort({ date: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        activities,
        "Student activities fetched successfully",
      ),
    );
});

// @desc    Get a single student activity by ID
// @route   GET /api/v1/student-activities/:id
const getActivityById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Activity ID format");
  }

  const activity = await StudentActivity.findById(id);

  if (!activity) {
    throw new ApiError(404, "Student activity not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, activity, "Student activity fetched successfully"),
    );
});

// @desc    Update a student activity
// @route   PATCH /api/v1/student-activities/:id
const updateActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Activity ID format");
  }

  const updatedActivity = await StudentActivity.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedActivity) {
    throw new ApiError(404, "Student activity not found to update");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedActivity,
        "Student activity updated successfully",
      ),
    );
});

// @desc    Delete a student activity
// @route   DELETE /api/v1/student-activities/:id
const deleteActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Activity ID format");
  }

  const deletedActivity = await StudentActivity.findByIdAndDelete(id);

  if (!deletedActivity) {
    throw new ApiError(404, "Student activity not found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Student activity deleted successfully"));
});

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
