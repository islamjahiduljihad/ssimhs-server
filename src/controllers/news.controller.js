const News = require("../models/news.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Create a news article
// @route   POST /api/v1/news
const createNews = asyncHandler(async (req, res) => {
  const news = await News.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, news, "News published successfully"));
});

// @desc    Get all news articles (Only published ones for frontend)
// @route   GET /api/v1/news
const getAllNews = asyncHandler(async (req, res) => {
  const newsArticles = await News.find({ isPublished: true }).sort({
    publishedAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newsArticles, "News fetched successfully"));
});

// @desc    Get a single news by ID (and optionally fetch related news)
// @route   GET /api/v1/news/:id
const getNewsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid News ID format");
  }

  const news = await News.findById(id);

  if (!news) {
    throw new ApiError(404, "News article not found");
  }

  const relatedNews = await News.find({
    _id: { $ne: id },
    tags: { $in: news.tags },
    isPublished: true,
  })
    .select("title publishedAt thumbnailUrl")
    .limit(3);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { news, relatedNews }, "News fetched successfully"),
    );
});

// @desc    Update a news article
// @route   PATCH /api/v1/news/:id
const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid News ID format");
  }

  const updatedNews = await News.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedNews) {
    throw new ApiError(404, "News not found to update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNews, "News updated successfully"));
});

// @desc    Delete a news article
// @route   DELETE /api/v1/news/:id
const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid News ID format");
  }

  const deletedNews = await News.findByIdAndDelete(id);

  if (!deletedNews) {
    throw new ApiError(404, "News not found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "News deleted successfully"));
});

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
