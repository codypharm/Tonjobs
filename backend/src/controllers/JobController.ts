import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Jobs from "../models/JobModel";

type Job = {
  _id: string;
  owner: string;
  org: string;
  repo: string;
};
// create job
const createJob = async (req: Request, res: Response) => {
  try {
    const oldJobs: Job[] = await Jobs.find({ ...req.body });

    let job: Job | null;
    if (oldJobs.length === 0) {
      // create job if not exists
      job = await Jobs.create({ ...req.body });
    } else {
      job = oldJobs[0];
    }

    if (job) {
      const data = {
        _id: job._id,
        owner: job.owner,
        org: job.org,
        repo: job.repo,
      };
      // send response
      res.status(StatusCodes.CREATED).json({
        job: data,
      });
    } else {
      throw new Error("Job not found or could not be created.");
    }
  } catch (error: any) {
    // send error response
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

// get jobs
const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs: Job[] = await Jobs.find({});

    // send response
    res.status(StatusCodes.OK).json({
      jobs,
    });
  } catch (error: any) {
    // send error response
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

export { createJob, getJobs };
