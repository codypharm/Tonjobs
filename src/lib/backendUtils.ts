import axios from "axios";

interface IJob {
  owner: string;
  org: string;
  repo: string;
}

//get user orgs
export async function createJob(accessCode: string, data: IJob): Promise<any> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/jobs`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessCode}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    return [];
  }
}

export async function getJobs(accessCode: string): Promise<any> {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`, {
      headers: {
        Authorization: `Bearer ${accessCode}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    return [];
  }
}
