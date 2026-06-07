const express = require("express");
const {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
} = require("../controllers/club.controller");

const router = express.Router();

router.route("/").get(getAllClubs).post(createClub);

router.route("/:id").get(getClubById).patch(updateClub).delete(deleteClub);

module.exports = router;
