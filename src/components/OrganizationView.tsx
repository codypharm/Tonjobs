"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, JobContext } from "@/App";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import JobList from "./JobList";
import { getOrgs, getRepos } from "@/lib/github.utils";
import { useOrganisationContract } from "@/hooks/useOrgContract";
import { jobSchema } from "@/validators/GitFormValidators";
import { createJob } from "@/lib/backendUtils";

export interface IOrgs {
  login: string;
  id: number;
}
export interface IRepos {
  name: string;
  url: string;
  owner: {
    login: string;
  };
  id: number;
}

export default function OrganizationView() {
  const { state, dispatch } = useContext(AuthContext);
  const [repos, setRepos] = useState<IRepos[] | null>(null);
  const [orgs, setOrgs] = useState<IOrgs[] | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { getBalance } = useOrganisationContract();
  const { jobState, dispatchJob } = useContext(JobContext);
  //define form
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      orgName: "",
      repoName: "",
    },
  });

  const getUsersOrgs = async () => {
    //.log(state.user.access_token);
    const orgs = await getOrgs(state.user.access_token);
    //console.log(orgs);
    setOrgs(orgs);
  };

  const getGitRepos = async (org: string) => {
    const repos = await getRepos(org, state.user.access_token);
    setRepos(repos);
  };

  useEffect(() => {
    getUsersOrgs();
  }, [state]);

  useEffect(() => {
    const orgName = form.getValues("orgName");
    const repoName = form.getValues("repoName");
    if (!orgName) return;
    getGitRepos(orgName);
    if (orgName && repoName) setDisabled(false);
  }, [form.watch("orgName"), form.watch("repoName")]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    const data = {
      owner: state.user.email,
      org: values.orgName,
      repo: values.repoName,
    };

    const job = await createJob(state.user.access_token, data);

    dispatchJob({
      type: "ADD_JOB",
      payload: job.job,
    });
  };

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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 items-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name="orgName"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        {/* <FormLabel>Token</FormLabel> */}
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Organization" />
                            </SelectTrigger>
                          </FormControl>
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
                        {/* <FormDescription>
                                        Gas fee will be charged on the selected token

                                    </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="repoName"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        {/* <FormLabel>Token</FormLabel> */}
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Repo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Repos</SelectLabel>
                              {repos?.map((repo, idx) => (
                                <SelectItem key={idx} value={repo.name}>
                                  {repo.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                                        Gas fee will be charged on the selected token

                                    </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button disabled={disabled} type="submit">
                        Save
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </div>
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
