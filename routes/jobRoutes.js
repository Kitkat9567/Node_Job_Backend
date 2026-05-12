const express = require("express");
const router = express.Router();
const { createJobs, findJobs, applyJobs } = require("../controller/jobController");

router.post("/job", createJobs);
router.get("/jobs", findJobs);
router.patch("/apply/:id",applyJobs);

module.exports = router;
