import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "@/App";

const GitHubOAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;
  const githubOAuthURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, "", newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1],
      };

      console.log(requestData);

      const proxy_url = state.proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch({
            type: "LOGIN",
            payload: { user: data, isLoggedIn: true },
          });
        })
        .catch((error) => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed",
          });
        });
    }
    console.log(state);
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return (
      <>
        User Already Logged In
        {/* @techyNonso User state.user object to get user data and change UI accordingly  */}
      </>
    );
  }

  return (
    <div>
      <a href={githubOAuthURL}>
        <Button
          variant={"outline"}
          className="flex gap-3"
          onClick={() => {
            setData({ ...data, errorMessage: "" });
          }}
        >
          <FaGithub /> Login{" "}
        </Button>
      </a>
    </div>
  );
};

export default GitHubOAuth;
