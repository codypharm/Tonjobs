const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Tasks = require("../models/AcceptedTasksModel");

// create job
const createTask = async (req, res) => {
  try {
    // create task
    const oldTask = await Tasks.find({
      ...req.body,
    });
    if (oldTask.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Task already accepted",
      });
    } else {
      const task = await Tasks.create({ ...req.body });
      console.log(task);

      // const data = {
      //   _id: job._id,
      //   owner: job.owner,
      //   org: job.org,
      //   repo: job.repo,
      // };
      // send response
      res.status(StatusCodes.CREATED);
    }
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

//get jobs
// const getTask = async (req, res) => {
//   try {
//     const jobs = await Jobs.find({});

//     // send response
//     res.status(StatusCodes.OK).json({
//       jobs,
//     });
//   } catch (error) {
//     // throw error
//     res.status(StatusCodes.BAD_REQUEST).send(error);
//   }
// };
module.exports = {
  createTask,
  //   getJobs,
};
