import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Tasks from "../models/AcceptedTasksModel";
import axios from "axios";
import { verifyClaim } from "../utils/blockchain";

type Task = {
  _id: string;
};
// create task
const createTask = async (req: Request, res: Response) => {
  try {
    // create task if not already accepted
    const oldTask: Task[] = await Tasks.find({ ...req.body });
    if (oldTask.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Task already accepted",
      });
    } else {
      const task: Task = await Tasks.create({ ...req.body });
      // console.log(task);

      res.status(StatusCodes.CREATED).json({
        task,
      });
    }
  } catch (error: any) {
    // send error response
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

// get accepted tasks
const getAcceptedTasks = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const tasks: Task[] = await Tasks.find({ email });

    // send response
    res.status(StatusCodes.OK).json({
      tasks,
    });
  } catch (error) {
    // send error response
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

async function verify(data: any, accessCode: string, res: Response) {
  const prNumber: number = data.prNumber;
  // get pr data
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

    // get issues belonging to this pr
    const baseBranch = prData.base.ref;
    const issueUrl = `https://api.github.com/repos/${data.org}/${data.repo}/issues?state=all&head=${data.org}:${baseBranch}`;
    const issueResponse = await axios.get(issueUrl, { headers });
    const issueData = issueResponse.data;
    const match = issueData.filter((issue: any) => issue.id === data.issueId);

    // get user data
    const userUrl = "https://api.github.com/user";
    const userResponse = await axios.get(userUrl, { headers });
    const userData = userResponse.data;

    // check for errors
    if (prData.user.id != userData.id) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized claim" });
    } else if (!prData.merged) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "PR not merged" });
    } else if (match.length === 0) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "No matching issue found" });
    } else if (match[0].state === "open") {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Issue still open" });
    }

    if (verifyClaim(data.issueId, data.completedBy)) {
      //updated verified state
      const verifiedTask = await Tasks.findOneAndUpdate(
        { _id: data._id },
        { verified: true }
      );

      res.status(StatusCodes.OK).json({
        verifiedTask,
      });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Blockchain transaction failed" });
    }
  } catch (error: any) {
    console.error("Error performing task:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}

// claim task
const claimTask = async (req: Request, res: Response) => {
  try {
    const token: string = req.headers["authorization"] || "";
    await verify(req.body, token, res);
  } catch (error: any) {
    // send error response
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

export { createTask, getAcceptedTasks, claimTask };
