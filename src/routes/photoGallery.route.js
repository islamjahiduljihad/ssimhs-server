const express = require("express");
const {
  addPhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
} = require("../controllers/photoGallery.controller");

const router = express.Router();

router.route("/").get(getAllPhotos).post(addPhoto);

router.route("/:id").get(getPhotoById).patch(updatePhoto).delete(deletePhoto);

module.exports = router;
