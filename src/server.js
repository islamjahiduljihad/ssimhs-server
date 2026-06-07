// Import dependencies
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.config");
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
