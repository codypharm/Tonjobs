const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Jobs = require("../models/JobModel");

// create job
const createJob = async (req, res) => {
  try {
    const oldJob = await Jobs.find({
      ...req.body,
    });

    let job;
    if (oldJob.length == 0) {
      // create job
      job = await Jobs.create({ ...req.body });
    } else {
      job = oldJob[0];
    }

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
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

//get jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({});

    // send response
    res.status(StatusCodes.OK).json({
      jobs,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};
module.exports = {
  createJob,
  getJobs,
};
