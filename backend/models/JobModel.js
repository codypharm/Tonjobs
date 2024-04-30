const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: [true, "Please provide email"],
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

module.exports = mongoose.model("Jobs", jobSchema);
