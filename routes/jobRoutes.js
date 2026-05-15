const express = require("express");
const router = express.Router();
const { createJob, findJobs, applyJobs } = require("../controller/jobController");
const { protectCompany, protectUser } = require("../middleware/authMiddleware");

router.post("/job", protectCompany,createJob);
router.get("/jobs", findJobs);
router.patch("/apply/:id",protectUser,applyJobs);

module.exports = router;
