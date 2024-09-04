"use client"

import React, { useEffect, useState } from 'react'

const getEstimatedHour = (ticket, taxOption) => {
    switch (taxOption) {
        case 'Google Search':
            return ticket.googleEstimate;
        case 'Internal Revenue Code':
            return ticket.internalRevenueCodeEstimate;
        case 'Internal Revenue Code':
            return ticket.internalRevenueCodeEstimate
        case 'Treasury Regulations':
            return ticket.treasuryRegulationsEstimate
        case 'Case Law':
            return ticket.caseLawEstimate
        case 'Revenue Ruling':
            return ticket.revenueRulingEstimate
        case 'Revenue Procedure':
            return ticket.revenueProcedureEstimate
        case 'Notices':
            return ticket.noticesEstimate
        case 'Internal Revenue Bulletin':
            return ticket.internalRevenueBulletinEstimate
        case 'Tax Articles Or Publications':
            return ticket.taxArticlesOrPublicationsEstimate
        case 'Announcements':
            return ticket.announcementsEstimate
        case 'Tax Opinion':
            return ticket.taxOpinionEstimate
        default:
            break;
    }
}

export default function TaxResearch({ticket}) {
    const [taxResearch, setTaxResearch] = useState(null)
    
    useEffect(() => {
        setTaxResearch(ticket?.taxResearch)

        const minDate = new Date(ticket?.taxResearch?.createdAt); 
        minDate.setDate(minDate.getDate() + 2);
        const date = new Date(ticket?.taxResearch?.dueDate);
        const dateString = date.toLocaleString("en-US", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: "America/Los_Angeles"
        }).split(',')[0].split('/')
        const formattedDateString = dateString[2] + '-' + dateString[0] + '-' + dateString[1];
    }, [ticket?.taxResearch])
    return (
        <ul className='list-disc pl-10'>
            <li>Tax Topic {ticket?.taxResearch?.taxTopic}</li>
            <li>Due Date {(new Date(ticket?.taxResearch?.dueDate)).toLocaleDateString("en-US", {timeZone: "America/Los_Angeles"})}</li>
            {taxResearch?.taxAuthority?.forEach((auth, i) => (
                <li>{auth}{getEstimatedHour(taxResearch, auth) == 1 ? ', estimated hour: ' : ', estimated hours: '} {getEstimatedHour(taxResearch, auth)}</li>
            ))}
        </ul>
    )
}