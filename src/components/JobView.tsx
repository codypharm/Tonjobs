import React from 'react'
import { Button } from './ui/button'
import { FaPlus } from 'react-icons/fa6'

export default function JobView() {
    return (
        <div className='h-[90%] py-2'>

            <div className='h-[10%] border-b border-border flex gap-3 justify-center items-center font-semibold text-foreground '>
                <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center'>Pending</h2>
                <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center text-gray-400'>Active</h2>
                <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center text-gray-400'>Completed</h2>
            </div>

            <div className='h-[90%] flex flex-col gap-2 border-b border-border  font-semibold text-foreground px-2 overflow-y-auto'>

                <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                    <div className=' flex justify-between items-center'><span>Issue #201</span> <Button variant={"secondary"}>Activate</Button></div>
                    <p className='font-semibold text-md'>
                        Landing Page of Decenter Ai
                    </p>
                </div>
                <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                    <div className=' flex justify-between items-center'><span>Issue #201</span> <Button variant={"secondary"}>Activate</Button></div>
                    <p className='font-semibold text-md'>
                        Landing Page of Decenter Ai
                    </p>
                </div>
                <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                    <div className=' flex justify-between items-center'><span>Issue #201</span> <Button variant={"secondary"}>Activate</Button></div>
                    <p className='font-semibold text-md'>
                        Landing Page of Decenter Ai
                    </p>
                </div>
                <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                    <div className=' flex justify-between items-center'><span>Issue #201</span> <Button variant={"secondary"}>Activate</Button></div>
                    <p className='font-semibold text-md'>
                        Landing Page of Decenter Ai
                    </p>
                </div>
            </div>
        </div>
    )
}
