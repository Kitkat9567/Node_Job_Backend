const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: { type: [String], default: [], required: true },
  status: { type: String, enum: ["open", "In Progress"] },
  postedBy: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  applicant: {
    type: { name: { type: String }, email: { type: String } },
    default: {},
  },
});

module.exports = mongoose.model("Jobs", jobSchema);
