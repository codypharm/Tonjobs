import React from 'react'
import { Button } from './ui/button'
import { FaPlus } from 'react-icons/fa6'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'


export default function OrganizationView() {
    return (
        <div className='h-[90%] py-2'>
            <div className='h-[10%]  flex justify-between items-center font-semibold text-foreground px-2'>
                <Link to="/"><Button variant={"secondary"}>Back  </Button></Link>
                {/* <Button variant={"secondary"} className='flex gap-2'> Add <FaPlus /></Button> */}
                {/* Dialog for adding organization */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"secondary"} className='flex gap-2'> Add <FaPlus /></Button>
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

                                <Input
                                    id="name"
                                    // defaultValue="Pedro Duarte"
                                    className=""
                                    placeholder='Enter org name'
                                    type='text'
                                />
                                <Input
                                    id="url"
                                    // defaultValue="Pedro Duarte"
                                    className=""
                                    placeholder='Enter org url'
                                    type='text'
                                />
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
            <div className='h-[90%] flex flex-col gap-2 border-b border-border  font-semibold text-foreground px-2 overflow-y-auto'>

                <div className='w-full h-auto py-2 border-b border-border hover:shadow-xl '>
                    <div className=''>Decenter AI</div>
                    <div className='flex justify-between items-center font-semibold text-gray-400'>
                        <p>20 jobs</p>
                        <p>1.20 Ton</p>
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
    )
}
