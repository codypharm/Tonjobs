import mongoose, { Schema, Document } from "mongoose";

interface AcceptedTask extends Document {
  email: string;
  issueNumber: number;
  issueId: number;
  repoId: number;
  title: string;
  reward: number;
  org: string;
  repo: string;
}

const acceptedTaskSchema: Schema<AcceptedTask> = new Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
  },
  issueNumber: {
    type: Number,
    required: [true, "Please add issue number"],
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

const AcceptedTasks =
  mongoose.model < AcceptedTask > ("AcceptedTasks", acceptedTaskSchema);

export default AcceptedTasks;
