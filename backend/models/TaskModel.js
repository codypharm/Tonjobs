const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  chain: {
    type: String,
    required: [true, "Please add chain"],
  },
  image: {
    type: String,
    required: [true, "Please add image"],
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
