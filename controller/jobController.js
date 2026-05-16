const Jobs = require("../models/jobModel");
const jobRepository = require("../repository/jobRepository");

const createJob = async (req, res) => {
  const { title, description, requiredSkills, status, mode, salary, jobUrl } =
    req.body;

  // Validate required fields
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!description || description.trim() === "") {
    return res.status(400).json({ message: "Description is required" });
  }
  if (!requiredSkills || requiredSkills.length === 0) {
    return res.status(400).json({ message: "Required skills cannot be empty" });
  }

  try {
    const job = {
      title,
      description,
      requiredSkills,
      status: status || "Open", 
      mode: mode || "Offline",
      postedBy: req.company._id, 
      salary,
      jobUrl,
      applicants: [],
    };

    const result = await jobRepository.createJob(job);
    return res.status(201).json({
      message: "Job created successfully",
      job: result,
    });
  } catch (error) {
    console.log("ERROR →", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const findJobs = async (req, res, next) => {
  const skills = req.query.skills;
  const search = req.query.search;
  const skillsArray = skills ? skills.split(",") : [];
  console.log("skillsArray", skillsArray);
  const lowerSkill = skillsArray.map((skill) => new RegExp(skill, "i"));
  try {
    const result = await jobRepository.searchJob(lowerSkill, search);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(400).json({ message: err });
  }
};

const applyJobs = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const job = await jobRepository.findJobbyId(id);

    if (job.postedBy.name === name && job.postedBy.email === email) {
      return res.status(404).json({ message: "cannot2" });
    }

    if (job?.applicant?.name && job?.applicant?.email) {
      return res.status(404).json({ message: "cannot3" });
    }
    const result = await jobRepository.applyJob(id, req.body);
    return res.status(200).json({ message: "applied", data: result });
  } catch (error) {
    return res.status(400).json({ message: "id not found" });
  }
};
module.exports = {
  createJob,
  findJobs,
  applyJobs,
};
