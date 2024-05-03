import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AuthContext, JobContext } from "@/App";
import { getIssues, getRepoInfo } from "@/lib/github.utils";
import { IIssue, ITask } from "@/lib/interfaces";
import { useOrganisationContract } from "@/hooks/useOrgContract";
import { Link } from "react-router-dom";
import { useTonClient } from "@/hooks/useTonClient";

export default function PendingList() {
  //   const { client } = useTonClient();
  const { jobState, dispatchJob } = useContext(JobContext);
  const { state, dispatch } = useContext(AuthContext);
  const { getJob, activateJob, orgContract } = useOrganisationContract();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [amt, setAmount] = useState<number>(0);

  const checkIssuestate = async (issues: IIssue[]) => {
    let pendingJob: ITask[] = [];
    let activeJob: ITask[] = [];
    //loop through and filter
    for (const issue of issues) {
      const res = await getJob(issue.id);
      let data = {
        number: issue.number,
        html_url: issue.html_url,
        title: issue.title,
        state: issue.state,
        repository_url: issue.repository_url,
        id: issue.id,
        reward: res?.reward || 0,
        completedBy: res?.completedBy || "",
        isActive: res?.isActive || false,
      };
      //if not recorded or not active

      if (res.isActive != undefined && !res.isActive) {
        pendingJob = [...pendingJob, data];
      } else {
        activeJob = [...activeJob, data];

        dispatchJob({
          type: "INIT_ORG_ACTIVE_JOB_LIST",
          payload: activeJob,
        });
      }
    }

    //save active jobs to state variable

    //return non active jobs
    return pendingJob;
  };

  const getJobIssues = async () => {
    const owner = jobState.jobList[jobState.jobId].org;
    const repo = jobState.jobList[jobState.jobId].repo;
    const issues: IIssue[] = await getIssues(
      owner,
      repo,
      state.user.access_token
    );
    // console.log(issues);
    const pendingdata = await checkIssuestate(issues);

    setTasks(pendingdata);
  };

  const activate = async (task: ITask) => {
    const owner = jobState.jobList[jobState.jobId].org;
    const repo = jobState.jobList[jobState.jobId].repo;
    const repoInfo = await getRepoInfo(owner, repo, state.user.access_token);

    if (!amt || amt == 0 || !repoInfo) return;
    await activateJob(repoInfo.id, task.id, amt);
  };

  useEffect(() => {
    getJobIssues();
  }, [jobState, orgContract]);

  return (
    <div className="h-full flex flex-col gap-2   font-semibold text-foreground px-2 overflow-y-auto pb-10">
      {tasks.map((task, id) => (
        <div
          key={id}
          className="w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border "
        >
          <div className=" flex justify-between items-center">
            <span>Issue #{task.number}</span>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"secondary"}
                  className="hover:bg-primary hover:text-white"
                >
                  Activate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Activate Job #{task.number}</DialogTitle>
                  <DialogDescription>
                    Allocate funds to activate this job.
                  </DialogDescription>

                  <DialogDescription>
                    This would attract a charge of 0.5 Ton
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Input
                      id="name"
                      className=""
                      placeholder="Enter amount"
                      type="number"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAmount(Number(e.target.value))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose>
                    <Button type="submit" onClick={() => activate(task)}>
                      Activate
                    </Button>
                  </DialogClose>
                  {/* <DialogClose>
                    <Button type="submit">Activate</Button>
                  </DialogClose> */}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="font-semibold text-md">{task.title}</p>
          <Link
            to={task.html_url}
            target="_blank"
            className="text-xs text-gray-400"
          >
            View on github
          </Link>
        </div>
      ))}
    </div>
  );
}
