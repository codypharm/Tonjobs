import { Button } from '@/components/ui/button'
import { GrDropbox } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";


export default function Organization() {
    return (
        <div className=" h-full  flex flex-col  bg-neutral-700">

            <div className='h-[35%] w-full  flex flex-col gap-10 justify-center items-center '>
                <div className=' flex w-fit gap-4'>
                    <div className='flex flex-col gap-6 justify-between text-sm font-semibold text-white'>
                        <p className='text-neutral-400'>Balance:</p>
                        <p>1.25 TON</p>
                    </div>
                    <div className='flex flex-col gap-6 justify-between text-sm font-semibold text-white'>
                        <p className='text-neutral-400'>Allocated:</p>
                        <p>1.25 TON</p>
                    </div>

                </div>
                <div className='text-center'><Button size={'sm'}>Deposit</Button></div>

            </div>
            <div className='h-[65%] bg-background rounded-tr-2xl rounded-tl-2xl'>
                <div className='h-[10%] border-b border-border flex gap-3 justify-center items-center font-semibold text-foreground '>
                    <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center'>Organizations</h2>
                    <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center text-gray-400'>Jobs</h2>
                </div>
                <div className='h-[90%]'>
                    <div className='h-[10%] border-t border-border flex justify-end items-center font-semibold text-foreground px-2'>
                        {/* <Button variant={"secondary"}> <FiMenu /></Button> */}
                        <Button variant={"secondary"}> <FaPlus /></Button>
                    </div>
                    <div className='h-[90%] flex flex-col gap-2 border-b border-border  font-semibold text-foreground px-2 overflow-y-auto'>

                        <div className='w-full h-auto py-2 border-b border-border hover:shadow-xl '>
                            <div className=''>Decenter AI</div>
                            <div className='flex justify-between items-center font-semibold text-gray-400'>
                                <p>20 jobs</p>
                                <p>1.20 Ton</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='h-[90%]'> */}
                <div className='h-[10%] border-t border-border flex justify-end items-center font-semibold text-foreground px-2'>
                    {/* <Button variant={"secondary"}> <FiMenu /></Button> */}
                    <Button variant={"secondary"}> <FaPlus /></Button>
                </div>
                <div className='h-[90%] border-b border-border  font-semibold text-foreground px-2'>
                    <div className=' flex flex-col h-full items-center justify-center gap-4'>
                        <GrDropbox size={60} className='text-gray-400' />
                        <p className='text-gray-500'>No organization added yet</p>
                        <Button>Add Organization</Button>
                    </div>

                </div>
                {/* </div> */}
            </div>

        </div>
    )
}
