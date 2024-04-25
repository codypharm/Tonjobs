import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Claim() {
  return (
    <div className=" ">
      <h3 className="text-sm font-semibold text-center py-4">
        Claim Completed Jobs
      </h3>

      <div className="flex flex-col gap-2">
        <div className=" flex gap-2 w-full justify-center">
          <span className="text-sm font-semibold">Decenter AI : </span>
          <span className="text-sm font-light">App.decenterai.com</span>
        </div>

        <div className=" flex justify-between items-center text-sm">
          <span>Issue #201</span>{" "}
          <span className="text-green-500 font-semibold">1 Ton</span>
        </div>
        <div className="grid grid-cols-1 items-center gap-4">
          <Input
            id="name"
            className=""
            placeholder="Enter PR url"
            type="text"
          />

          <Button>Claim</Button>
        </div>
      </div>
    </div>
  );
}
