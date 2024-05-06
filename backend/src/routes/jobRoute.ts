import { Request, Response } from "express";
import { createJob, getJobs } from "../controllers/JobController";
import express from "express";

const router = express.Router();

// Job routes
router.route("/").post(createJob).get(getJobs);

export default router;
