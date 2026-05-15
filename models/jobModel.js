const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Offline",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    salary: { type: Number, required: false },
    jobUrl: { type: String, required: false },
  },
  { timestamps: true },
);
module.exports = mongoose.model("job_mstr", jobSchema);
