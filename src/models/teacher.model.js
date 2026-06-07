const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Teacher's name is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department/Subject is required"],
      trim: true,
    },
    qualifications: {
      type: String,
      required: [true, "Educational qualifications are required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Profile image URL is required"],
    },
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Retired"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Teacher", teacherSchema);
