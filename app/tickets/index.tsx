"use client"

import Button from '@/components/global/Button'
import CarryoverTooltip from '@/components/global/CarryoverTooltip'
import Loading from '@/components/global/Loading'
import NextUITabsStyling from '@/components/global/Next-UI-Tabs-Styling'
import TicketCard from '@/components/tickets/TicketCard'
import { getRecentTicketType, getUserTickets } from '@/utils/APIRoutes'
import { features } from '@/utils/constants'
import { addCommas } from '@/utils/functions'
import { Card, Tab, Tabs } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'


export default function Tickets({session, data}: {session: Object; data: {tickets: Array<Object>; mostRecent1040?: Object; mostRecentEstatePlan?: Object; mostRecentTaxPlan?: Object;};}) {
    const searchParams = useSearchParams()

    const [activeTickets, setActiveTickets] = useState([])
    const [inactiveTickets, setInactiveTickets] = useState([])
    const [hasActiveTickets, setHasActiveTickets] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    const [ticketTypes, setTicketTypes] = useReducer(
        (state, action) => ({
            ...state,
            ...action,
            }),
            {
                mostRecent1040: {},
                mostRecentEstatePlan: {},
                mostRecentTaxPlan: {},
            }
        );

    const [tabView, setTabView] = useState("my-tickets")

    useEffect(() => {
        const setTickets = async () => {
            const {tickets, mostRecent1040, mostRecentEstatePlan, mostRecentTaxPlan} = data;
            if (tickets.length <= 0) {
                setIsLoading(false)
                return
            }

            // filter tickets based on incomplete and complete
            const activeTickets = tickets.filter((ticket) => ticket?.status !== "Complete");
            if (activeTickets.length > 0) setHasActiveTickets(true)
            setActiveTickets(activeTickets)

            const inactiveTickets = tickets.filter((ticket) => ticket?.status === "Complete");
            setInactiveTickets(inactiveTickets)

            setTicketTypes({
                mostRecent1040: mostRecent1040?.tickets ? mostRecent1040?.tickets[0] : {},
                mostRecentEstatePlan: mostRecentEstatePlan?.tickets ? mostRecentEstatePlan?.tickets[0] : {},
                mostRecentTaxPlan: mostRecentTaxPlan?.tickets ? mostRecentTaxPlan?.tickets[0] : {},
            })

            setIsLoading(false)
        }
        setTickets().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) return <Loading logo={session?.whiteLabel?.logo} />

    if (searchParams.get('dashboard') || hasActiveTickets) return (
        <div className='flex flex-col gap-10 w-full'>
            <div className="flex justify-end">
                <div className='flex gap-10'>
                    {(ticketTypes?.mostRecent1040 && ticketTypes?.mostRecent1040?.year && ticketTypes?.mostRecent1040?.carryovers?.length) ? (
                        <div className='flex gap-2'>
                            <strong>
                                Tax attribute carryover: <span className='text-[#568DC8]'>${addCommas(ticketTypes?.mostRecent1040?.carryovers.reduce((total, {carryforward}) => total+= (carryforward || 0), 0))}</span>
                            </strong>
                            <CarryoverTooltip carryovers={ticketTypes?.mostRecent1040?.carryovers}/>
                        </div>
                    ) : ""}
                    <div>
                        <strong>Estate Plan - {ticketTypes?.mostRecentEstatePlan ? (
                            <Link className="underline text-[#568DC8] hover:text-blue-600 transition-all" href={`/tickets/view/${ticketTypes?.mostRecentEstatePlan?._id}`}>
                                {new Date(ticketTypes?.mostRecentEstatePlan.createdAt).getFullYear()}
                            </Link>
                        ) : (
                            <Link className="underline text-[#568DC8] hover:text-blue-600 transition-all" href={`/tickets/newReturn?category=${encodeURIComponent("Estate Planning")}&title=${encodeURIComponent("Estate Plan")}`}>
                                None Found
                            </Link>
                        )}</strong>
                    </div>
                    <div>
                        <strong>Tax Plan - {ticketTypes?.mostRecentTaxPlan ? (
                            <Link className="underline text-[#568DC8] hover:text-blue-600 transition-all" href={`/tickets/view/${ticketTypes?.mostRecentTaxPlan?._id}`}>
                                {ticketTypes?.mostRecentTaxPlan?.year}
                            </Link>
                        ) : (
                            <Link className="underline text-[#568DC8] hover:text-blue-600 transition-all" href={`/tickets/newReturn?category=${encodeURIComponent("Advisory Service")}&title=${encodeURIComponent("Tax Planning")}`}>
                                None Found
                            </Link>
                        )}</strong>
                    </div>
                </div>
            </div>

            <NextUITabsStyling session={session} />

            <div className='flex w-full md:justify-between items-center md:flex-row flex-col-reverse gap-5'>
                <Tabs aria-label="Options" className='flex' size="lg" variant='bordered'
                    classNames={{
                        tabList: "gap-3 relative rounded-none p-0 border-b border-divider rounded-xl shadow-black shadow-lg shadow-gray-300",
                        cursor: "bg-[#5C94CA]",
                        tab: "max-w-fit px-0 h-12 px-10",
                        tabContent: "group-data-[selected=true]:text-white font-bold"
                    }}
                    selectedKey={tabView}
                    onSelectionChange={setTabView}
                >
                    <Tab key="my-tickets" title="MY TICKETS">
                    </Tab>
                    <Tab key="prev-tickets" title="PREVIOUS TICKETS">
                    </Tab>
                </Tabs>
                <div className='flex justify-center items-center'>
                    <Button text="Start My Return" link={`/tickets/newReturn`} secondaryColor={session?.whiteLabel?.secondaryColor} luminosity={session?.whiteLabel?.secondaryLuminosity} />
                </div>
            </div>
            {tabView === "my-tickets" && (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 py-10">
                    {activeTickets.map((ticket, idx) => <TicketCard ticket={ticket} secondaryColor={session?.whiteLabel?.secondaryColor} key={idx} luminosity={session?.whiteLabel?.secondaryLuminosity} />)}
                </div>
            )}
            {tabView === "prev-tickets" && (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 py-10">
                    {inactiveTickets.map((ticket, idx) => <TicketCard ticket={ticket} secondaryColor={session?.whiteLabel?.secondaryColor} key={idx} luminosity={session?.whiteLabel?.secondaryLuminosity} />)}
                </div>
            )}
        </div>
    )

    return (
        <Card className='shadow-2xl h-fit w-full p-3'>
            <div className="flex flex-col gap-8 p-8 items-center">
                <h1 className="font-bold text-2xl text-center">Thank you for registering on the {session?.whiteLabel?.firmName} client portal. We created a new Client Portal using our advanced software that will allow you to virtually process your entire tax return (and other services) efficiently, saving valuable time.</h1>
                <div className="w-44">
                    <Button text="My Dashboard" link='/tickets?dashboard=true' secondaryColor={session?.whiteLabel?.secondaryColor} luminosity={session?.whiteLabel?.secondaryLuminosity} />
                </div>
            </div>
            <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
            <div className="flex flex-col gap-8 p-8 items-center">
                <h1 className="font-bold text-2xl text-center">Our other advanced features also include</h1>
                <div className="md:grid md:grid-cols-2 flex flex-col gap-6 w-full">
                    {features.map(({title, description, features}, idx) => (
                        <div key={idx} className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-8">
                            <div className='flex flex-col gap-4'>
                                <h1 className="font-bold">{title}</h1>
                                <p className='text-sm'>{description}</p>
                                <ul className='flex flex-col gap-2'>
                                    {features.map((feature, idx) => (
                                        <li key={idx} className='flex gap-2'>
                                            <div className="flex justify-center items-center w-5">
                                                <Image
                                                    src="/images/icons/check-icon.svg"
                                                    alt="hide password"
                                                    className='h-auto'
                                                    width={15}
                                                    height={15}
                                                    priority
                                                />
                                            </div>
                                            <p className='w-96 text-sm'>
                                                {feature}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
