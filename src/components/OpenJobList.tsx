import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AuthContext, JobContext } from "@/App";
import { useGetJobs } from "@/hooks/useGetJobs";
import OpenJobCard from "./OpenJobCard";
import { IIssue, IJob, ITask } from "@/lib/interfaces";
import { getIssues } from "@/lib/github.utils";
import { useOrganisationContract } from "@/hooks/useOrgContract";

export default function OpenJobList() {
  const { jobState, dispatchJob } = useContext(JobContext);
  const { getJob, activateJob, orgContract } = useOrganisationContract();
  const { jobs } = useGetJobs();
  const { state, dispatch } = useContext(AuthContext);
  const [activeIssues, setActiveIssues] = useState<any>([]);
  // console.log("🚀 ~ OpenJobList ~ jobs:", jobs);

  const checkIssuestate = async (issues: IIssue[], job: IJob) => {
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
        org: job.org,
        repo: job.repo,
      };
      //if not recorded or not active

      if (res.isActive != undefined && !res.isActive) {
        pendingJob = [...pendingJob, data];
      } else {
        activeJob = [...activeJob, data];

        // dispatchJob({
        //   type: "INIT_ORG_ACTIVE_JOB_LIST",
        //   payload: activeJob,
        // });
      }
    }

    setActiveIssues(activeJob);
  };

  const getJobIssues = async (job: IJob) => {
    const owner = job.org;
    const repo = job.repo;
    const issues: IIssue[] = await getIssues(
      owner,
      repo,
      state.user.access_token
    );
    // console.log(issues);
    await checkIssuestate(issues, job);
  };

  const getJobDetails = async (jobs: IJob[]) => {
    for (const job of jobs) {
      await getJobIssues(job);
    }
  };

  useEffect(() => {
    getJobDetails(jobs);
  }, [jobs]);

  return (
    <div className="h-full flex flex-col gap-2   font-semibold text-foreground px-2 overflow-y-auto pb-10">
      {activeIssues.map((activeIssues: any, idx: number) => (
        <OpenJobCard key={idx} job={activeIssues} />
      ))}
    </div>
  );
}
