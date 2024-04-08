import React from 'react'
import { Button } from './ui/button'

export default function PendingList() {
    return (
        <div className='h-[90%] flex flex-col gap-2 border-b border-border  font-semibold text-foreground px-2 overflow-y-auto'>

            <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                <div className=' flex justify-between items-center'><span>Issue #201</span> <Button variant={"secondary"} className='hover:bg-primary hover:text-white'>Activate</Button></div>
                <p className='font-semibold text-md'>
                    Landing Page of Decenter Ai
                </p>
            </div>
            <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                <div className=' flex justify-between items-center'><span>Issue #201</span> <Button variant={"secondary"} className='hover:bg-primary hover:text-white'>Activate</Button></div>
                <p className='font-semibold text-md'>
                    Landing Page of Decenter Ai
                </p>
            </div>
            <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                <div className=' flex justify-between items-center'><span>Issue #201</span> <Button variant={"secondary"} className='hover:bg-primary hover:text-white'>Activate</Button></div>
                <p className='font-semibold text-md'>
                    Landing Page of Decenter Ai
                </p>
            </div>
            <div className='w-full flex flex-col gap-3 h-auto py-2 rounded-md mt-4 px-2 border border-border '>
                <div className=' flex justify-between items-center'><span>Issue #201</span> <Button variant={"secondary"} className='hover:bg-primary hover:text-white'>Activate</Button></div>
                <p className='font-semibold text-md'>
                    Landing Page of Decenter Ai
                </p>
            </div>

        </div>
    )
}
