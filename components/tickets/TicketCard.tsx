"use client"

import Button from '@/components/global/Button'
import { addCommas, getFormName, renderStatus } from '@/utils/functions'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import TicketStatus from './TicketStatus'
import CarryoverTooltip from '../global/CarryoverTooltip'

export default function TicketCard({ticket, secondaryColor, luminosity}) {
    const filteredDocs = ticket?.documents && ticket?.documents?.length ? ticket?.documents?.filter(doc => !doc?.lateSubmission || (doc?.lateSubmission && doc?.adminApproval?.status === 'Approved' && doc?.firmUserApproval?.status === 'Approved')) : [];

    return (
        <Card className='p-3 shadow-2xl' key={ticket._id}>
            <CardHeader className='flex justify-between'>
                <h1 className="text-2xl font-bold">{ticket.filingFor || ticket.clientName}</h1>
                {ticket?.carryovers && ticket?.carryovers.length ? (
                    <div className='flex gap-2'>
                        <div className='font-bold text-sky-600 text-sm'>Tax attribute carryover: 
                            ${addCommas(ticket?.carryovers.reduce((acc, curr) => acc + curr?.carryforward, 0) || 0)}
                        </div>
                        <CarryoverTooltip carryovers={ticket?.carryovers}/>
                    </div>
                ) : ""}
            </CardHeader>
            <CardBody className='flex gap-6'>
                <div className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2">
                    <h1 className="uppercase font-bold">
                        {ticket?.filingType === 'Estate Planning' ? 'Ticket Progress' : 'Tax Return Progress'}
                    </h1>
                    <TicketStatus ticket={ticket} />
                </div>
                <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
                    <div className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2">
                        <div className='flex flex-col gap-4'>
                            <h1 className="uppercase font-bold">Ticket Type</h1>
                            <p>{getFormName(ticket.filingName)?.formName || ticket?.filingType} {!getFormName(ticket.filingName)?.formName ? `(${ticket?.filingName})` : ''} {getFormName(ticket.filingName)?.taxReturn ? "Tax Return" : ""}</p>
                        </div>
                        {(ticket?.year || (ticket?.specQuest && ticket?.specQuest?.dateOfGift) || (ticket?.specQuest && ticket?.specQuest?.dateOfDeath)) && (
                            <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                        )}
                        {ticket?.year && (
                            <div className='flex flex-col gap-4'>
                                <h1 className="uppercase font-bold">Tax Year</h1>
                                <p>{ticket.year ? (ticket.year === 'fiscal-year' ? ticket.fiscalYearDate : ticket.year) : "N/A"}</p>
                            </div>
                        )}
                        {ticket?.specQuest && ticket?.specQuest?.dateOfGift && (
                            <div className='flex flex-col gap-4'>
                                <h1 className="uppercase font-bold">Date of Gift</h1>
                                <p>{ticket?.specQuest?.dateOfGift ? `${ticket?.specQuest?.dateOfGift?.month}/${ticket?.specQuest?.dateOfGift?.day}/${ticket?.specQuest?.dateOfGift?.year}` : "N/A"}</p>
                            </div>
                        )}
                        {ticket?.specQuest && ticket?.specQuest?.dateOfDeath && (
                            <div className='flex flex-col gap-4'>
                                <h1 className="uppercase font-bold">Date of Death</h1>
                                <p>{ticket?.specQuest?.dateOfDeath ? `${ticket?.specQuest?.dateOfDeath?.month}/${ticket?.specQuest?.dateOfDeath?.day}/${ticket?.specQuest?.dateOfDeath?.year}` : "N/A"}</p>
                            </div>
                        )}
                        <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                        <div className='flex flex-col gap-4'>
                            <h1 className="uppercase font-bold">Status</h1>
                            <p  className="text-[#77A000]">{renderStatus(ticket)}</p>
                        </div>
                    </div>
                    <div className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2">
                        <div className='flex flex-col gap-4'>
                            <h1 className="uppercase font-bold">Documents</h1>
                            <ul className='flex flex-col gap-3'>
                                {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
                                    <a
                                        key={doc._id}
                                        href={doc.url}
                                        target="_blank"
                                        className="flex items-center justify-between rounded outline outline-2 outline-slate-300 px-2 py-1 hover:bg-white hover:outline-white hover:text-black hover:invert transition-all"
                                    >
                                        <p className='text-sm w-4/5'>{doc.docType}</p>
                                        <Image
                                            src="/images/icons/upload-icon.svg"
                                            alt="upload"
                                            className='h-auto'
                                            width={20}
                                            height={20}
                                            priority
                                        />
                                    </a>
                                )) : (
                                    <div>None Found</div>
                                )}
                            </ul>

                            {(ticket.missingInformation && ticket.missingInformation.length) ? (
                                <div className='flex flex-col gap-4'>
                                    <h1 className="uppercase font-bold">Missing Documents</h1>
                                    <div className='pl-8'>
                                        <ul className='list-disc'>
                                            {ticket.missingInformation.map((doc, idx) => (
                                                <li key={idx}>{doc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : <div></div>}
                        </div>
                    </div>
                </div>
                <div className="p-3 flex justify-center">
                    <Button text="View My Ticket" link={`/tickets/view/${ticket._id}`} secondaryColor={secondaryColor} luminosity={luminosity} />
                </div>
            </CardBody>
        </Card>
    )
}
