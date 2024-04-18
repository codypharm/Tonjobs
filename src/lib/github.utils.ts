import axios from "axios";

export async function checkIfUserIsRepoOwner(
  accessCode: string,
  orgName: string,
  repoName: string
): Promise<boolean> {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${orgName}/${repoName}/issues?labels=ton-jobs`,
      {
        headers: {
          Authorization: `Bearer ${accessCode}`,
        },
      }
    );
    console.log(response.data);
    const { owner } = response.data;
    const { login } = owner;

    // Check if the user login matches the owner of the repository
    return login === "Abhay-2811";
  } catch (error) {
    console.error("Error checking repository owner:", error);
    return false;
  }
}

//get user orgs
export async function getOrgs(accessCode: string): Promise<any[]> {
  try {
    const response = await axios.get("https://api.github.com/user/orgs", {
      headers: {
        Authorization: `Bearer ${accessCode}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user organizations:", error);
    return [];
  }
}


//get 