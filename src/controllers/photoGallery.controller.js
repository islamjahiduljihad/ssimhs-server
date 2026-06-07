const PhotoGallery = require("../models/photoGallery.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Add a new photo to the gallery
// @route   POST /api/v1/gallery
const addPhoto = asyncHandler(async (req, res) => {
  const photo = await PhotoGallery.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, photo, "Photo added to gallery successfully"));
});

// @desc    Get all photos (with optional category filter)
// @route   GET /api/v1/gallery?category=Sports
const getAllPhotos = asyncHandler(async (req, res) => {
  const query = req.query.category ? { category: req.query.category } : {};

  const photos = await PhotoGallery.find(query).sort({ eventDate: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, photos, "Photos fetched successfully"));
});

// @desc    Get a single photo by ID
// @route   GET /api/v1/gallery/:id
const getPhotoById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Photo ID format");
  }

  const photo = await PhotoGallery.findById(id);

  if (!photo) {
    throw new ApiError(404, "Photo not found in gallery");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, photo, "Photo fetched successfully"));
});

// @desc    Update photo details
// @route   PATCH /api/v1/gallery/:id
const updatePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Photo ID format");
  }

  const updatedPhoto = await PhotoGallery.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedPhoto) {
    throw new ApiError(404, "Photo not found to update");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPhoto, "Photo details updated successfully"),
    );
});

// @desc    Delete a photo from gallery
// @route   DELETE /api/v1/gallery/:id
const deletePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Photo ID format");
  }

  const deletedPhoto = await PhotoGallery.findByIdAndDelete(id);

  if (!deletedPhoto) {
    throw new ApiError(404, "Photo not found to delete");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, null, "Photo deleted from gallery successfully"),
    );
});

module.exports = {
  addPhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
};
