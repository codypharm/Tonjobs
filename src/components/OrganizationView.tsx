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

export default function OrganizationView() {
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
              <DialogTitle>Organizations</DialogTitle>
              <DialogDescription>
                Add an organization to your list.
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
                      <SelectItem value="decenterai">Decenter AI</SelectItem>
                      <SelectItem value="tonjobs">TonJobs</SelectItem>
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
      </div>

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
