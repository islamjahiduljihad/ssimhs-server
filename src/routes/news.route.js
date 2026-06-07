const express = require("express");
const {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

const router = express.Router();

router.route("/").get(getAllNews).post(createNews);

router.route("/:id").get(getNewsById).patch(updateNews).delete(deleteNews);

module.exports = router;
