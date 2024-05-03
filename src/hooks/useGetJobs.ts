import { AuthContext, JobContext } from "@/App";
import { getJobs } from "@/lib/backendUtils";
import { IJob } from "@/lib/interfaces";
import { useContext, useEffect, useState } from "react";

export function useGetJobs() {
  const { state, dispatch } = useContext(AuthContext);
  const { jobState, dispatchJob } = useContext(JobContext);

  const [jobs, setJobs] = useState<IJob[] | []>([]);

  const fetchJobs = async () => {
    const list: {
      jobs: IJob[];
    } = await getJobs(state.user.accessCode);

    setJobs(list.jobs);
    dispatchJob({
      type: "INIT_JOB",
      payload: list.jobs,
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => fetchJobs(), 2000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    jobs,
  };
}
