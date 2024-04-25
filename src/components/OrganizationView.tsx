import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/App";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import JobList from "./JobList";
import { getOrgs } from "@/lib/github.utils";

interface IOrgs {
  login: string;
  id: number;
}
export default function OrganizationView() {
  const { state, dispatch } = useContext(AuthContext);
  const [orgs, setOrgs] = useState<IOrgs[] | null>(null);

  const getUsersOrgs = async () => {
    console.log(state.user.access_token);
    const orgs = await getOrgs(state.user.access_token);
    console.log(orgs);
    setOrgs(orgs);
  };

  useEffect(() => {
    getUsersOrgs();
  }, [state]);
  return (
    <div className="h-full py-2">
      <div className="h-[10%]  flex justify-between items-center font-semibold text-foreground px-2">
        <Link to="/">
          <Button variant={"secondary"}>Back </Button>
        </Link>
        {/* <Button variant={"secondary"} className='flex gap-2'> Add <FaPlus /></Button> */}
        {/* Dialog for adding organization */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"} className="flex gap-2">
              {" "}
              Add <FaPlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Job</DialogTitle>
              <DialogDescription>
                Select and Organization and repo to create a job.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Organizations</SelectLabel>
                      {orgs?.map((org, idx) => (
                        <SelectItem key={idx} value={org.login}>
                          {org.login}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Repo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Repository</SelectLabel>
                      <SelectItem value="decenterai">Decenter AI</SelectItem>
                      <SelectItem value="tonjobs">TonJobs</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* org list */}
      <JobList />

      {/* Empty org component */}
      {/* <div className='h-[90%] border-b border-border  font-semibold text-foreground px-2'>
                        <div className=' flex flex-col h-full items-center justify-center gap-4'>
                            <GrDropbox size={60} className='text-gray-400' />
                            <p className='text-gray-500'>No organization added yet</p>
                            <Button>Add Organization</Button>
                        </div>

                    </div> */}
    </div>
  );
}
