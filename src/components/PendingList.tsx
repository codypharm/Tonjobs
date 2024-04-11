import React from 'react'
import { Button } from './ui/button'
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

export default function PendingList() {
    return (
        <div className='h-[90%] flex flex-col gap-2 border-b border-border  font-semibold text-foreground px-2 overflow-y-auto'>

            <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                <div className=' flex justify-between items-center'><span>Issue #201</span>

                    <Dialog >
                        <DialogTrigger asChild>
                            <Button variant={"secondary"} className='hover:bg-primary hover:text-white'>Activate</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Activate Job #201</DialogTitle>
                                <DialogDescription>
                                    Allocate funds to activate this job.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-1 items-center gap-4">

                                    <Input
                                        id="name"

                                        className=""
                                        placeholder='Enter amount'
                                        type='number'
                                    />
                                </div>


                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Activate</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <p className='font-semibold text-md'>
                    Landing Page of Decenter Ai
                </p>
            </div>


        </div>
    )
}
