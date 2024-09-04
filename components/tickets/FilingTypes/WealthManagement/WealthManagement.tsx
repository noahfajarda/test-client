"use client"

import React, { useEffect, useState } from 'react'

export default function WealthManagement({ticket}) {
    const [wealthManagementQuest, setWealthManagementQuest] = useState(null)
    const [date, setDate] = useState(new Date(ticket?.finishBy))
    
    useEffect(() => {
        setWealthManagementQuest(ticket?.wealthManagementQuest)

        const dateStringPST = date.toLocaleString("en-US", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: "America/Los_Angeles"
            })
        
        const dateString = dateStringPST.split(',')[0].split('/')
        const formattedDateString = dateString[2] + '-' + dateString[0] + '-' + dateString[1]
    }, [date, ticket?.wealthManagementQuest])
    return (
        <ul className='list-disc pl-10'>
            <li>Due Date: {date?.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles"})}</li>
            {wealthManagementQuest?.ammended !== 'no' && wealthManagementQuest?.ammended || ticket?.isCustom === true && ticket?.customQuest?.selections?.includes('Ammended Return') ? <li>{wealthManagementQuest?.filingStatus}</li> : ""}
            {wealthManagementQuest?.reasonForFinancialAdvisor !== 'no' && wealthManagementQuest?.reasonForFinancialAdvisor.length > 0 && wealthManagementQuest?.reasonForFinancialAdvisor ? (
                wealthManagementQuest?.reasonForFinancialAdvisor.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                ))
            ) : ""}
            {wealthManagementQuest?.consultation !== 'no' && wealthManagementQuest?.consultation ? <li>{wealthManagementQuest?.consultation}</li> : ""}
            {wealthManagementQuest?.cashAndLiquidInvestments !== 'no' && wealthManagementQuest?.cashAndLiquidInvestments ? <li>Total Value of Cash and Liquid Investments: {wealthManagementQuest?.cashAndLiquidInvestments}</li> : ""}
            {wealthManagementQuest?.annualPreTaxEarnings !== 'no' && wealthManagementQuest?.annualPreTaxEarnings ? <li>Annual Pre-Tax Earnings: {wealthManagementQuest?.annualPreTaxEarnings}</li> : ""}
            {wealthManagementQuest?.currentAge !== 'no' && wealthManagementQuest?.currentAge ? <li>Age Range: {wealthManagementQuest?.currentAge}</li> : ""}
            {wealthManagementQuest?.primaryReasonForSaving !== 'no' && wealthManagementQuest?.primaryReasonForSaving ? <li>Reason for saving: {wealthManagementQuest?.primaryReasonForSaving}</li> : ""}
            {wealthManagementQuest?.householdDescription !== 'no' && wealthManagementQuest?.householdDescription ? <li>Household Description: {wealthManagementQuest?.householdDescription}</li> : ""}
            {wealthManagementQuest?.investingMoneyInterest !== 'no' && wealthManagementQuest?.investingMoneyInterest ? <li>Cares about: {wealthManagementQuest?.investingMoneyInterest}</li> : ""}
            {wealthManagementQuest?.marketCrashQuestion !== 'no' && wealthManagementQuest?.marketCrashQuestion ? <li>In case of market decline: {wealthManagementQuest?.marketCrashQuestion}</li> : ""}


            
        </ul>
    )
}
