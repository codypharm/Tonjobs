import mongoose, { Schema, Document } from "mongoose";

interface Job extends Document {
  owner: string;
  org: string;
  repo: string;
}

const jobSchema: Schema<Job> = new Schema({
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

const Jobs = mongoose.model<Job>("Jobs", jobSchema);

export default Jobs;
