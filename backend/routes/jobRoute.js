const { createJob, getJobs } = require("../controllers/Jobcontroller");
const express = require("express");
const router = express.Router();

// games routes
router.route("/").post(createJob).get(getJobs);
// favorites routes

module.exports = router;
