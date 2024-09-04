"use client"

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { formatDateTime, ticketStatusBarInfo } from '@/utils/functions';
import { Progress } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'

export default function TicketStatus({ticket}) {
    const mediaQuery = useMediaQuery(768)
    const ticketStatusBar = ticketStatusBarInfo(ticket)
    // refer to ticketColumns.ejs
    const [statusValue, setStatusValue] = useState(0)

    useEffect(() => {
        const currentStatus = ticketStatusBar.find(({statusActive}) => statusActive === true);
        if (currentStatus?.percentage) setStatusValue(currentStatus?.percentage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className="flex flex-col justify-center">
        <div className="flex justify-between text-xs p-3 font-bold items-center">
            {ticketStatusBar.map(({label, statusPassed, statusActive, timestamp, percentage}, idx) => 
                <p className={`w-20 text-center ${statusActive || statusPassed ? `text-[#77A000]` : 'text-[#6E6E73]'}`} key={idx}>{label}</p>
            )}
        </div>
        <div className="flex justify-center px-10">
            <Progress classNames={{indicator: `bg-[#77A000]`}} aria-label="Ticket Progress" value={mediaQuery && statusValue === 3 ? 8 : statusValue} className="lg:w-full"/>
        </div>
        <div className="flex justify-between text-xs p-3">
            {ticketStatusBar.map(({timestamp}, idx) => {
                let formattedDate;
                let formattedTime;
                if (timestamp) {
                    formattedDate = formatDateTime(timestamp).formattedDate
                    formattedTime = formatDateTime(timestamp).formattedTime
                }
            return (
                <div key={idx} className='flex flex-col items-center w-20 text-center text-[#6E6E73]'>
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                </div>)
            })}
        </div>
    </div>
  )
}
