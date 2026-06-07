const express = require("express");
const {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} = require("../controllers/banner.controller");

const router = express.Router();

// /api/v1/banners
router.route("/").get(getAllBanners).post(createBanner);

// /api/v1/banners/:id
router
  .route("/:id")
  .get(getBannerById)
  .patch(updateBanner)
  .delete(deleteBanner);

module.exports = router;
