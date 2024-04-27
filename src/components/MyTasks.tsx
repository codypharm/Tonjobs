import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function MyTasks() {
  return (
    <div className="h-full flex flex-col gap-2   font-semibold text-foreground px-2 overflow-y-auto pb-10">
      <div className="w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border ">
        <div className=" flex gap-2 w-full ">
          <span className="text-sm font-semibold">Decenter AI : </span>
          <span className="text-sm font-light">App.decenterai.com</span>
        </div>
        <div className=" flex justify-between items-center text-sm">
          <span>Issue #201</span>{" "}
          <span className="text-green-500 font-semibold">1 Ton</span>
        </div>
        <p className="font-semibold text-sm">Landing Page of Decenter Ai</p>
        <Button className="hover:bg-primary hover:text-white">Claim</Button>
      </div>
    </div>
  );
}
