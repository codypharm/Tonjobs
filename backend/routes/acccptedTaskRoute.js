const {
  createTask,
  getAcceptedTasks,
  claimTask,
} = require("../controllers/AcceptedTaskController");
const express = require("express");
const router = express.Router();

// games routes
router.route("/").post(createTask).get(getAcceptedTasks);
router.route("/claim").post(claimTask);
// favorites routes

module.exports = router;
