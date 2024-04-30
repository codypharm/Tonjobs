import { AuthContext } from "@/App";
import { getJobs } from "@/lib/backendUtils";
import { IJob } from "@/lib/interfaces";
import { useContext, useEffect, useState } from "react";

export function useGetJobs() {
  const { state, dispatch } = useContext(AuthContext);

  const [jobs, setJobs] = useState<IJob[] | []>([]);

  const fetchJobs = async () => {
    const list: {
      jobs: IJob[];
    } = await getJobs(state.user.accessCode);
    console.log(list);
    setJobs(list.jobs);
  };

  useEffect(() => {
    const intervalId = setInterval(() => fetchJobs(), 2000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    jobs,
  };
}
