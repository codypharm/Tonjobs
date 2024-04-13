import React from 'react'
import { Link } from 'react-router-dom'

export default function LeaderBoard() {
    return (
        <div className='h-full flex flex-col gap-2 border-b border-border  font-semibold text-foreground px-2 overflow-y-auto'>

            <div className='w-full h-auto py-2 border-b border-border '>
                <Link to={`/profile/${"techynonso"}`} className=" font-semibold text-lg">@techynonso</Link>
                <div className='flex justify-between items-center font-semibold text-gray-400'>
                    <p>20 jobs</p>
                    <p>1.20 Ton</p>
                </div>
            </div>
            <div className='w-full h-auto py-2 border-b border-border '>
                <Link to={`/profile/${"techynonso"}`} className=" font-semibold text-lg">@techynonso</Link>
                <div className='flex justify-between items-center font-semibold text-gray-400'>
                    <p>20 jobs</p>
                    <p>1.20 Ton</p>
                </div>
            </div>
            <div className='w-full h-auto py-2 border-b border-border '>
                <Link to={`/profile/${"techynonso"}`} className=" font-semibold text-lg">@techynonso</Link>
                <div className='flex justify-between items-center font-semibold text-gray-400'>
                    <p>20 jobs</p>
                    <p>1.20 Ton</p>
                </div>
            </div>
            <div className='w-full h-auto py-2 border-b border-border '>
                <Link to={`/profile/${"techynonso"}`} className=" font-semibold text-lg">@techynonso</Link>
                <div className='flex justify-between items-center font-semibold text-gray-400'>
                    <p>20 jobs</p>
                    <p>1.20 Ton</p>
                </div>
            </div>
            <div className='w-full h-auto py-2 border-b border-border '>
                <Link to={`/profile/${"techynonso"}`} className=" font-semibold text-lg">@techynonso</Link>
                <div className='flex justify-between items-center font-semibold text-gray-400'>
                    <p>20 jobs</p>
                    <p>1.20 Ton</p>
                </div>
            </div>
        </div>
    )
}
