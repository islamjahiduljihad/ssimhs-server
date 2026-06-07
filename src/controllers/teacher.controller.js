const Teacher = require("../models/teacher.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Add a new teacher
// @route   POST /api/v1/teachers
const createTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.create(req.body);

  return res
    .status(201)
    .json(
      new ApiResponse(201, teacher, "Teacher profile created successfully"),
    );
});

// @desc    Get all teachers
// @route   GET /api/v1/teachers
const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find().sort({ joiningDate: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, teachers, "Teachers fetched successfully"));
});

// @desc    Get a single teacher by ID
// @route   GET /api/v1/teachers/:id
const getTeacherById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Teacher ID format");
  }

  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, teacher, "Teacher profile fetched successfully"),
    );
});

// @desc    Update a teacher profile
// @route   PATCH /api/v1/teachers/:id
const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Teacher ID format");
  }

  const updatedTeacher = await Teacher.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedTeacher) {
    throw new ApiError(404, "Teacher not found to update");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTeacher,
        "Teacher profile updated successfully",
      ),
    );
});

// @desc    Delete a teacher profile
// @route   DELETE /api/v1/teachers/:id
const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Teacher ID format");
  }

  const deletedTeacher = await Teacher.findByIdAndDelete(id);

  if (!deletedTeacher) {
    throw new ApiError(404, "Teacher not found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Teacher profile deleted successfully"));
});

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
