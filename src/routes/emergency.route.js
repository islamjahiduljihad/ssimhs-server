const express = require("express");
const router = express.Router();

const { emergencyShutdown } = require("../controllers/emergency.controller");

// POST: emergency shutdown
router.post("/emergency", emergencyShutdown);

module.exports = router;
