import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompletedList from "./CompletedList";
import ActiveList from "./ActiveList";
import PendingList from "./PendingList";
import { JobContext } from "@/App";

export default function JobView() {
  const { jobState, dispatchJob } = useContext(JobContext);

  return (
    <div className="h-full pt-3">
      <Tabs defaultValue="pending" className="h-full ">
        <div className=" flex gap-2 w-full justify-center">
          <span className="text-sm font-semibold">
            {jobState.jobList[jobState.jobId].org}:
          </span>
          <span className="text-sm font-light">
            {" "}
            {jobState.jobList[jobState.jobId].repo}
          </span>
        </div>
        <TabsList className="h-[10%] w-full bg-background">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="h-[90%] ">
          <PendingList />{" "}
        </TabsContent>
        <TabsContent value="active" className="h-[90%]">
          <ActiveList />
        </TabsContent>
        <TabsContent value="completed" className="h-[90%]">
          <CompletedList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
