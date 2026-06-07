const express = require("express");
const {
  createHighlight,
  getAllHighlights,
  getHighlightById,
  updateHighlight,
  deleteHighlight,
} = require("../controllers/campusHighlight.controller");

const router = express.Router();

router.route("/").get(getAllHighlights).post(createHighlight);

router
  .route("/:id")
  .get(getHighlightById)
  .patch(updateHighlight)
  .delete(deleteHighlight);

module.exports = router;
