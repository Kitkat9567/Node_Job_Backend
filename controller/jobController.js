const Jobs = require("../models/jobModel");
const jobRepository = require("../repository/jobRepository");

const createJobs = async (req, res, next) => {
  const job = req.body;

  if (!job.title || job.title.trim() === "") {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (!job.description || job.description.trim() === "") {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (!job.requiredSkills || job.requiredSkills.length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (!job.name || !job.email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newJob = new Jobs({
    title: job.title,
    description: job.description,
    requiredSkills: job.requiredSkills,
    status: "open",
    postedBy: {
      name: job.name,
      email: job.email,
    },
  });

  try {
    const result = await jobRepository.createJob(newJob);
    console.log("job", result);
    return res.status(200).json({ message: "created" });
  } catch (err) {
    return res.status(400).json({ message: err });
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

const applyJobs = async(req, res, next) => {
  const {id} = req.params;
  const {name,email} = req.body;
  try {
    const job = await jobRepository.findJobbyId(id);
    console.log('job',job);
    
    if(job.postedBy.name === name && job.postedBy.email === email){
      return res.status(404).json({message:'cannot2'});
    }
    
    if(job?.applicant?.name && job?.applicant?.email  ){
      return res.status(404).json({message:'cannot3'});
    }
   const result = await jobRepository.applyJob(id,req.body);
    return res.status(200).json({message:'applied', data:result})
  } catch (error) {
      return res.status(400).json({message:'id not found'});
  }
}
module.exports = {
  createJobs,
  findJobs,
  applyJobs
};
