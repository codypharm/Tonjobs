import { IAcceptance, claimTask } from "@/lib/backendUtils";
import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { AuthContext } from "@/App";
import { Button } from "./ui/button";

export default function TaskCard({ task }: { task: IAcceptance }) {
  const { state, dispatch } = useContext(AuthContext);
  const [prNumber, setPrNumber] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const verify = async (task: IAcceptance) => {
    if (!prNumber) return;
    const req = await claimTask(state.user.access_token, task, prNumber);
    if (req.error) setError(req.error);
  };
  return (
    <div className="w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border ">
      <div className=" flex gap-2 w-full ">
        <span className="text-sm font-semibold">{task.org} : </span>
        <span className="text-sm font-light">{task.repo}</span>
      </div>
      <div className=" flex justify-between items-center text-sm">
        <span>Issue #{task.issueNumber}</span>{" "}
        <span className="text-green-500 font-semibold">{task.reward} Ton</span>
      </div>
      <p className="font-semibold text-sm">{task.title}</p>
      <Input
        placeholder="enter pr Number"
        type="number"
        min={0}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPrNumber(Number(e.target.value));
          setError("");
        }}
      />
      <p className="text-xs text-red-600 text-center">{error}</p>
      <Button
        className="hover:bg-primary hover:text-white"
        onClick={() => verify(task)}
      >
        Verify
      </Button>
    </div>
  );
}
