import React from 'react'
import { Button } from './ui/button'
import { FaPlus } from 'react-icons/fa6'
import PendingList from './PendingList'
import ActiveList from './ActiveList'
import CompletedList from './CompletedList'

export default function JobView() {
    return (
        <div className='h-[90%] py-2'>

            <div className='h-[10%] border-b border-border flex gap-3 justify-center items-center font-semibold text-foreground '>
                <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center'>Pending</h2>
                <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center text-gray-400'>Active</h2>
                <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center text-gray-400'>Completed</h2>
            </div>

            {/* <PendingList /> */}
            {/* <ActiveList /> */}
            <CompletedList />
        </div>
    )
}
