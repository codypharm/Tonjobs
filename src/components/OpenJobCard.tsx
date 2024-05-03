import React, { useContext } from "react";
import { Button } from "./ui/button";
import { boolean } from "zod";
import { AuthContext, JobContext } from "@/App";
import { getRepoInfo } from "@/lib/github.utils";
import { Link } from "react-router-dom";
import { IAcceptance, acceptTask } from "@/lib/backendUtils";

type IJob = {
  org: string;
  owner: string;
  repo: string;
  number: number;
  html_url: string;
  title: string;
  state: string;
  repository_url: string;
  id: number;
  reward: number;
  completedBy: string;
  isActive: boolean;
};

export default function OpenJobCard({ job }: { job: IJob }) {
  const { jobState, dispatchJob } = useContext(JobContext);
  const { state, dispatch } = useContext(AuthContext);

  const initiateClaim = async () => {
    const owner = job.org;
    const repo = job.repo;
    const repoInfo = await getRepoInfo(owner, repo, state.user.access_token);

    if (!repoInfo) return;
    const data: IAcceptance = {
      email: state.user.email,
      issueId: job.id,
      org: job.org,
      repo,
      repoId: repoInfo.id,
      reward: job.reward,
      title: job.title,
    };
    try {
      await acceptTask(state.user.access_token, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border ">
      <div className=" flex gap-2 w-full ">
        <span className="text-sm font-semibold">{job.org} : </span>
        <span className="text-sm font-light">{job.repo}</span>
      </div>
      <div className=" flex justify-between items-center text-sm">
        <span>Issue #{job.number}</span>{" "}
        <span className="text-green-500 font-semibold">{job.reward} Ton</span>
      </div>
      <p className="font-semibold text-sm">{job.title}</p>
      <Link to={job.html_url} target="_blank" className="text-xs text-gray-400">
        View on github
      </Link>
      <Button
        variant={"secondary"}
        onClick={initiateClaim}
        className="hover:bg-primary hover:text-white"
      >
        Accept
      </Button>
    </div>
  );
}
