import React, { useContext, useEffect } from "react";
import { AuthContext, JobContext } from "@/App";
import { useGetJobs } from "@/hooks/useGetJobs";

export default function JobList() {
  const { state, dispatch } = useContext(AuthContext);
  const { jobState, dispatchJob } = useContext(JobContext);
  const { jobs } = useGetJobs();

  // console.log(state.user.access_token);
  const changeJob = (id: number) => {
    dispatchJob({
      type: "SELECT_JOB",
      payload: { jobId: id, isJobSelected: true },
    });
  };

  useEffect(() => {});
  return (
    <div className="h-[90%] pt-4 flex flex-col gap-2 border-b border-border  cursor-pointer font-semibold text-foreground px-2 overflow-y-auto">
      {jobs.map((job, id) => (
        <div
          key={id}
          onClick={() => changeJob(id)}
          className="w-full h-auto py-2 px-3 border-b border-border hover:shadow-sm "
        >
          <div className=" flex gap-2 w-full">
            <span className="text-sm font-semibold">{job.org}: </span>
            <span className="text-sm font-light">{job.repo}</span>
          </div>

          <div className="flex justify-between text-sm items-center font-semibold mt-2 text-gray-400">
            <p>owner: {job.owner}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
