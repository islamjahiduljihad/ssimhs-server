// Import dependencies
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.config");
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().catch((error) => {
  console.error("Failed to connect to MongoDB", error);
});

// Start the server only in local environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running smoothly at http://localhost:${PORT}`);
  });
}

module.exports = app;
