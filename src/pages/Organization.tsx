import { Button } from '@/components/ui/button'
import { GrDropbox } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import OrganizationView from '@/components/OrganizationView';
import JobView from '@/components/JobView';
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
import { Label } from "@/components/ui/label"



export default function Organization() {
    return (
        <div className=" h-full  flex flex-col  bg-baseGround">

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
                <div className='text-center'></div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size={'sm'}>Deposit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Deposit Ton</DialogTitle>
                            <DialogDescription>
                                Add to your Ton account balance
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 items-center gap-4">

                                <Input
                                    id="name"
                                    // defaultValue="Pedro Duarte"
                                    className=""
                                    placeholder='Enter amount'
                                    type='number'
                                />
                            </div>


                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit">Deposit</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
            <div className='h-[65%] bg-background rounded-tr-2xl rounded-tl-2xl'>
                <div className='h-[10%] border-b border-border flex gap-3 justify-center items-center font-semibold text-foreground '>
                    <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center'>Organizations</h2>
                    <h2 className=' h-full w-[50%] cursor-pointer   flex justify-center items-center text-gray-400'>Jobs</h2>
                </div>
                <OrganizationView />
                {/* <JobView /> */}

            </div>

        </div>
    )
}
