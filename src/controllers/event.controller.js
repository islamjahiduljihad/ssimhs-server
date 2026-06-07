const Event = require("../models/event.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

// @desc    Create a new event
// @route   POST /api/v1/events
const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});

// @desc    Get all events
// @route   GET /api/v1/events
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ eventDate: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

// @desc    Get a single event by ID
// @route   GET /api/v1/events/:id
const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Event ID format");
  }

  const event = await Event.findById(id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event fetched successfully"));
});

// @desc    Update an event
// @route   PATCH /api/v1/events/:id
const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Event ID format");
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!updatedEvent) {
    throw new ApiError(404, "Event not found to update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEvent, "Event updated successfully"));
});

// @desc    Delete an event
// @route   DELETE /api/v1/events/:id
const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Event ID format");
  }

  const deletedEvent = await Event.findByIdAndDelete(id);

  if (!deletedEvent) {
    throw new ApiError(404, "Event not found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Event deleted successfully"));
});

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
