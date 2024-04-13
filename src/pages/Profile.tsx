
import CompletedList from '@/components/CompletedList'
import UserCompletedJobList from '@/components/UserCompletedJobList'
import { FaArrowLeft, FaGithub, FaRegCopy } from 'react-icons/fa'
import { Link } from 'react-router-dom'


export default function Profile() {
    return (
        <div className='h-full flex flex-col gap-4 py-4  px-2'>

            <div className='h-[10%]  flex  items-center'>

                <div className="h-full w-[90%] flex gap-2 items-center">
                    <img src="/logo.png" className="w-12 h-12 rounded-full" />
                    <div className=" flex flex-col h-full justify-center ">
                        <p className="text-green-400 font-semibold text-lg">@techynonso</p>
                        <p className="flex gap-2">
                            <span className="text-gray-400 text-sm font-semibold">Jobs:</span>
                            <span className="text-sm font-semibold">10</span>
                            <span className="text-gray-400 text-sm font-semibold">Claims:</span>
                            <span className="text-sm font-semibold">10 Tons</span>
                        </p>
                    </div>
                </div>

                <div className="w-fit h-fit p-3 border rounded-md">
                    <Link to="/" className="">
                        <FaArrowLeft />
                    </Link>
                </div>



            </div>


            {/* org list */}
            <div className='h-[85%]   font-semibold text-foreground  pt-10 '>
                <div className='flex justify-between items-center border-b border-border h-[10%]'>
                    <div>
                        <h3 className='font-semibold text-md'>Completed Jobs</h3>
                    </div>
                    <div className='flex justify-end items-center space-x-5'>
                        <div className='w-fit p-2 border rounded-md'>
                            <FaRegCopy />
                        </div>
                        <div className='w-fit p-2 border rounded-md'>
                            <FaGithub />
                        </div>
                    </div>
                </div>
                <div className='h-[90%] overflow-y-auto py-3'>
                    <UserCompletedJobList />
                </div>

            </div>

        </div>
    )
}
