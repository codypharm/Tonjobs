import axios from "axios";

interface IJob {
  owner: string;
  org: string;
  repo: string;
}

export interface IAcceptance {
  email: string;
  org: string;
  repo: string;
  issueId: number;
  repoId: number;
  title: string;
  reward: number;
  issueNumber: number;
  prNumber: number;
}

// user orgs
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

//task acceptance
export async function acceptTask(
  accessCode: string,
  data: IAcceptance
): Promise<any> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/tasksacceptance`,
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
    return error;
  }
}

export async function getAcceptedTask(
  accessCode: string,
  email: string
): Promise<any> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/tasksacceptance?email=${email}`,

      {
        headers: {
          Authorization: `Bearer ${accessCode}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    return error;
  }
}

export async function claimTask(
  accessCode: string,
  data: IAcceptance,
  prNumber: number
): Promise<any> {
  data.prNumber = prNumber;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/tasksacceptance/claim`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessCode}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    //@ts-ignore
    if (error.response) {
      // The server responded with an error status code
      //@ts-ignore
      console.error("Error claiming task reward:", error.response.data);
      //@ts-ignore
      return error.response.data; // Return the error message from the server
      //@ts-ignore
    } else if (error.request) {
      // The request was made but no response was received
      //@ts-ignore
      console.error("Error making request:", error.request);
      return { error: "No response from server" }; // Return a generic error message
    } else {
      // Something else happened in setting up the request
      //@ts-ignore
      console.error("Error:", error.message);
      //@ts-ignore
      return { error: error.message }; // Return the error message
    }
  }
}
