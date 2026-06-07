const express = require("express");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const router = express.Router();

router.route("/").get(getAllEvents).post(createEvent);

router.route("/:id").get(getEventById).patch(updateEvent).delete(deleteEvent);

module.exports = router;
