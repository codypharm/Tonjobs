import { JobContext } from "@/App";
import { Button } from "./ui/button";
import { useContext } from "react";
import { ITask } from "@/lib/interfaces";

export default function ActiveList() {
  const { jobState, dispatchJob } = useContext(JobContext);
  return (
    <div className="h-full flex flex-col gap-2   font-semibold text-foreground px-2 overflow-y-auto pb-10">
      {jobState.orgActiveJobList.map((job: ITask, idx: number) => (
        <div
          key={idx}
          className="w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border "
        >
          <div className=" flex justify-between items-center">
            <span>Issue #{job.number}</span>{" "}
            <span className="text-green-500 font-semibold">
              {job.reward} Ton
            </span>
          </div>
          <p className="font-semibold text-md">{job.title}</p>
          <Button
            variant={"secondary"}
            className="hover:bg-primary hover:text-white"
          >
            Cancel
          </Button>
        </div>
      ))}
    </div>
  );
}
