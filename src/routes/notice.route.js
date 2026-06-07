const express = require("express");
const {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} = require("../controllers/notice.controller");

const router = express.Router();

router.route("/").get(getAllNotices).post(createNotice);

router
  .route("/:id")
  .get(getNoticeById)
  .patch(updateNotice)
  .delete(deleteNotice);

module.exports = router;
