const mongoose = require("mongoose");

const acceptedTaskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
  },
  issueId: {
    type: Number,
    required: [true, "Please add issue id"],
  },
  repoId: {
    type: Number,
    required: [true, "Please add repo id"],
  },
  title: {
    type: String,
    required: [true, "Please add issue title"],
  },
  reward: {
    type: Number,
    required: [true, "Please add reward"],
  },
  org: {
    type: String,
    required: [true, "Please add an org"],
  },
  repo: {
    type: String,
    required: [true, "Please add repo name"],
  },
});

module.exports = mongoose.model("AcceptedTasks", acceptedTaskSchema);
