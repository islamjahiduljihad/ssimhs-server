// Import dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const dns = require("dns");
const ApiError = require("./utils/ApiError");
const errorHandler = require("./middlewares/error.middleware");

// Import routes
const bannerRoutes = require("./routes/banner.route");
const noticeRoutes = require("./routes/notice.route");
const campusHighlightRoutes = require("./routes/campusHighlight.route");
const newsRoutes = require("./routes/news.route");
const studentActivityRoutes = require("./routes/studentActivity.route");
const teacherRoutes = require("./routes/teacher.route");
const photoGalleryRoutes = require("./routes/photoGallery.route");

// DNS resolution for MongoDB Atlas
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Create Express app
const app = express();

// Global Security middleware

//Helmet
app.use(helmet());

// Cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Standard middleware
app.use(
  express.json({
    limit: "10kb",
  }),
);
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Mongoose sanitization
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  if (req.headers) mongoSanitize.sanitize(req.headers);
  next();
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes for Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Api Routes--------------->>>
// Banner Routes
app.use("/api/v1/banners", bannerRoutes);

// Notice Routes
app.use("/api/v1/notices", noticeRoutes);

// Campus Highlight Routes
app.use("/api/v1/campus-highlights", campusHighlightRoutes);

// News Routes
app.use("/api/v1/news", newsRoutes);

// Student Activity Routes
app.use("/api/v1/student-activities", studentActivityRoutes);

// Teacher Routes
app.use("/api/v1/teachers", teacherRoutes);

// Photo Gallery Routes
app.use("/api/v1/gallery", photoGalleryRoutes);

// Global Error Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});
app.use(errorHandler);

// Export the app
module.exports = app;
