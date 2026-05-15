const Jobs = require("../models/jobModel");

class JobRepository {
  constructor() {
    this.collectionName = "job_mstr_dtl";
  }

  async createJob(job) {
    const newJob = new Jobs(job)
    const result = await newJob.save();
    return result;
  }

  async searchJob(skills, title) {
    console.log("skills", skills);
    console.log("title", title);

    try {
      const query = {};

      if (skills && skills.length > 0) {
        query.requiredSkills = { $in: skills };
      }
      if (title) {
        query.title = { $regex: title, $options: "i" };
      }

      const result = await Jobs.find(query);
      return result;
    } catch (err) {
      return err;
    }
  }

  async findJobbyId(id) {
    try {
      const job = await Jobs.findById(id);
      return job;
    } catch (error) {
      return error;
    }
  }

  async applyJob(id, payload) {
    try {
      console.log("id", id);
      console.log("payload", payload);

      const result = await Jobs.findByIdAndUpdate(
        id,
        { $set: { applicant: payload, status: "In Progress" } },
        { new: true },
      );
      console.log("result", result);

      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new JobRepository();
