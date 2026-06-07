const Teacher = require("../models/teacher.model");
const Event = require("../models/event.model");
const Notice = require("../models/notice.model");
const News = require("../models/news.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get dashboard statistics and recent activities
// @route   GET /api/v1/dashboard/stats
const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalTeachers, totalEvents, totalNotices, totalNews] =
    await Promise.all([
      Teacher.countDocuments(),
      Event.countDocuments(),
      Notice.countDocuments(),
      News.countDocuments(),
    ]);

  const latestNotices = await Notice.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  const latestEvents = await Event.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  const latestNews = await News.find().sort({ createdAt: -1 }).limit(3).lean();

  let recentActivities = [
    ...latestNotices.map((item) => ({
      type: "Notice",
      title: item.title,
      date: item.createdAt,
      id: item._id,
    })),
    ...latestEvents.map((item) => ({
      type: "Event",
      title: item.title,
      date: item.createdAt,
      id: item._id,
    })),
    ...latestNews.map((item) => ({
      type: "News",
      title: item.title,
      date: item.createdAt,
      id: item._id,
    })),
  ];

  recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
  recentActivities = recentActivities.slice(0, 5);

  const dashboardData = {
    stats: {
      teachers: totalTeachers,
      events: totalEvents,
      notices: totalNotices,
      news: totalNews,
    },
    recentActivities,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        dashboardData,
        "Dashboard stats fetched successfully",
      ),
    );
});

module.exports = { getDashboardStats };
