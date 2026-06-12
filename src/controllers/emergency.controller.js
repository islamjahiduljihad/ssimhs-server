const asyncHandler = require("../utils/asyncHandler");

// @desc    Emergency server shutdown
// @route   POST /api/v1/emergency/shutdown
const emergencyShutdown = asyncHandler(async (req, res) => {
  const { key } = req.body;

  // simple protection (you can improve it later)
  if (key !== process.env.EMERGENCY_KEY) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized emergency request",
    });
    console.log(process.env.EMERGENCY_KEY);
    console.log(key);
  }

  res.status(200).json({
    success: true,
    message: "Server is shutting down...",
  });

  console.log("🚨 Emergency shutdown triggered!");

  // graceful shutdown
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

module.exports = { emergencyShutdown };
