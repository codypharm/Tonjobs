import { Request, Response } from "express";
import {
  createTask,
  getAcceptedTasks,
  claimTask,
} from "../controllers/AcceptedTaskController";
import express from "express";

const router = express.Router();

// AcceptedTask routes
router.route("/").post(createTask).get(getAcceptedTasks);
router.route("/claim").post(claimTask);

export default router;
