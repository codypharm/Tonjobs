import React, { useContext, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AuthContext } from "@/App";
import { IAcceptance, claimTask, getAcceptedTask } from "@/lib/backendUtils";
import TaskCard from "./TaskCard";

export default function MyTasks() {
  const { state, dispatch } = useContext(AuthContext);
  const [tasks, setTasks] = useState<IAcceptance[]>([]);

  const fetchTasks = async () => {
    const tasks: { tasks: IAcceptance[] } = await getAcceptedTask(
      state.user.access_token,
      state.user.email
    );
    setTasks(tasks.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [state]);

  return (
    <div className="h-full flex flex-col gap-2   font-semibold text-foreground px-2 overflow-y-auto pb-10">
      {tasks.map((task, idx) => (
        <TaskCard task={task} key={idx} />
      ))}
    </div>
  );
}
