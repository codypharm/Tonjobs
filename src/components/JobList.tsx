import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/App";

export default function JobList() {
  const { state, dispatch } = useContext(AuthContext);
  console.log(state.user.access_token);

  useEffect(() => {});
  return (
    <div className="h-[90%] flex flex-col gap-2 border-b border-border  font-semibold text-foreground px-2 overflow-y-auto">
      <div className="w-full h-auto py-2 px-3 border-b border-border hover:shadow-sm ">
        <div className=" flex gap-2 w-full">
          <span className="text-sm font-semibold">Decenter AI : </span>
          <span className="text-sm font-light">App.decenterai.com</span>
        </div>
        <div className="flex justify-between text-sm items-center font-semibold mt-2 text-gray-400">
          <p>Issues: 30</p>
        </div>
      </div>

      <div className="w-full h-auto py-2 px-3 border-b border-border hover:shadow-sm ">
        <div className=" flex gap-2 w-full">
          <span className="text-sm font-semibold">Decenter AI : </span>
          <span className="text-sm font-light">App.decenterai.com</span>
        </div>
        <div className="flex justify-between text-sm items-center font-semibold mt-2 text-gray-400">
          <p>Issues: 30</p>
        </div>
      </div>
    </div>
  );
}
