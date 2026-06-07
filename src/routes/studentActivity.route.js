const express = require("express");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controllers/studentActivity.controller");

const router = express.Router();

router.route("/").get(getAllActivities).post(createActivity);

router
  .route("/:id")
  .get(getActivityById)
  .patch(updateActivity)
  .delete(deleteActivity);

module.exports = router;
