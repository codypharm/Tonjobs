import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompletedList from './CompletedList'
import ActiveList from './ActiveList'
import PendingList from './PendingList'

export default function JobView() {
    return (

        <div className='h-full '>
            <Tabs defaultValue="pending" className="h-full ">
                <TabsList className='h-[10%] w-full bg-background'>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className='h-[90%] '><PendingList /> </TabsContent>
                <TabsContent value="active" className='h-[90%]'><ActiveList /></TabsContent>
                <TabsContent value="completed" className='h-[90%]'><CompletedList /></TabsContent>
            </Tabs>

        </div>

    )
}
