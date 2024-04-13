import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function Claim() {
    return (
        <div className=" ">
            <h3 className='text-sm font-semibold text-center py-4'>Claim Completed Jobs</h3>
            <div className="grid grid-cols-1 items-center gap-4">

                <Input
                    id="name"

                    className=""
                    placeholder='Enter PR url'
                    type='text'
                />

                <Button>Claim</Button>

            </div>


        </div>
    )
}
