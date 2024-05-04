const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Tasks = require("../models/AcceptedTasksModel");
const { default: axios } = require("axios");

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

//get accepted tasks
const getAcceptedTasks = async (req, res) => {
  const { email } = req.query;
  try {
    const tasks = await Tasks.find({ email });

    // send response
    res.status(StatusCodes.OK).json({
      tasks,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

async function verify(data, accessCode, res) {
  const prNumber = data.prNumber;
  //get pr data
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${data.org}/${data.repo}/pulls/${prNumber}`,
      {
        headers: {
          Authorization: `${accessCode}`,
        },
      }
    );

    const prData = response.data;

    const headers = {
      Authorization: `${accessCode}`,
    };

    //get issues belonging to this pr
    const baseBranch = prData.base.ref;
    const issueUrl = `https://api.github.com/repos/${data.org}/${data.repo}/issues?state=all&head=${data.org}:${baseBranch}`;
    const issueResponse = await fetch(issueUrl, {
      headers,
    });
    const issueData = await issueResponse.json();
    const match = issueData.filter((issue, id) => issue.id === data.issueId);

    //get user data
    const userUrl = "https://api.github.com/user";
    const userResponse = await fetch(userUrl, { headers });
    const userData = await userResponse.json();

    //check for errors
    if (prData.user.id != userData.id)
      return res.status(500).json({ error: "Unauthorized claim" });
    if (!prData.merged) return res.status(500).json({ error: "Pr not merged" });
    if (match.length == 0)
      return res.status(500).json({ error: "No matching issue found" });
    if (match[0].state == "open")
      return res.status(500).json({ error: "Issue still open" });
  } catch (error) {
    console.error("Error performing task:", error);
    return [];
  }
}

const claimTask = async (req, res) => {
  try {
    // create task
    const token = req.headers["authorization"];

    await verify(req.body, token, res);
    // res.status(StatusCodes.CREATED);
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  createTask,
  getAcceptedTasks,
  claimTask,
};
