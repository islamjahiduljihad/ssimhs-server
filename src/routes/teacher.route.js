const express = require("express");
const {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacher.controller");

const router = express.Router();

router.route("/").get(getAllTeachers).post(createTeacher);

router
  .route("/:id")
  .get(getTeacherById)
  .patch(updateTeacher)
  .delete(deleteTeacher);

module.exports = router;
