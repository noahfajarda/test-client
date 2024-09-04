"use client"

import React, { useEffect, useState } from 'react'

export default function Individual({ticket}) {
    const [indivQuest, setIndivQuest] = useState(null)
    
    useEffect(() => {
        setIndivQuest(ticket?.indivQuest)
    }, [ticket?.indivQuest])
    return (
        <ul className='list-disc pl-10'>
            {ticket?.noTaxFile ? <li>New Client (No Tax File) </li> : ""}
            {indivQuest?.filingStatus ? <li>{indivQuest?.filingStatus}</li> : ""}
            {indivQuest?.interestsDividends && indivQuest?.interestsDividends !== 'no' ? <li>Has Interests/Dividends</li> : ""}
            {indivQuest?.selfEmployment && indivQuest?.selfEmployment !== 'no' ? <li>Self Employed</li> : ""}
            {indivQuest?.ownHome && indivQuest?.ownHome !== 'no' ? <li>Owns a Home</li> : ""}
            {indivQuest?.hasW2s && indivQuest?.hasW2s !== 'no' ? <li>Has {indivQuest?.hasW2s} W2(s)</li> : ""}
            {indivQuest?.ownBusiness && indivQuest?.ownBusiness !== 'no' ? <li>Owns {indivQuest?.ownBusiness} Businesses</li> : ""}
            {indivQuest?.sellStock && indivQuest?.sellStock !== 'no' ? <li>Sold Stock</li> : ""}
            {indivQuest?.rentalProperties && indivQuest?.rentalProperties !== 'no' ? <li>Owns {indivQuest?.rentalProperties} Rental Properties</li> : ""}
            {indivQuest?.buySellHome && indivQuest?.buySellHome !== 'no' ? <li>Bought/Sold {indivQuest?.buySellHome} Home(s)</li> : ""}
            {indivQuest?.buySellRental && indivQuest?.buySellRental !== 'no' ? <li>Bought/Sold {indivQuest?.buySellRental} Rental(s)</li> : ""}
            {indivQuest?.scheduleK1 && indivQuest?.scheduleK1 !== 'no' ? <li>{indivQuest?.scheduleK1} Schedule K1&apos;s</li> : ""}
            {indivQuest?.retirementSocialSecurity && indivQuest?.retirementSocialSecurity !== 'no' ? <li>Received Retirement Income/Social Security (# of statements: {indivQuest?.retirementSocialSecurity})</li> : ""}
            {indivQuest?.separateChild && indivQuest?.separateChild !== 'no' ? <li>{indivQuest?.separateChild} Separate Child&apos;s Return(s)</li> : ""}
            {indivQuest?.workAbroad && indivQuest?.separateChild !== 'no' ? <li>Worked Abroad</li> : ""}
            {indivQuest?.stateReturns && indivQuest?.stateReturns !== 'no' ? <li>Has 2+ State Returns</li> : ""}
            {indivQuest?.ammended && indivQuest?.ammended !== 'no' ? <li>Amended Return</li> : ""}
            {indivQuest?.cancellationOfDebt && indivQuest?.cancellationOfDebt !== 'no' ? <li>Cancellation Of Debt</li> : ""}
            {indivQuest?.cannabis && indivQuest?.cannabis !== 'no' ? <li>Cannabis</li> : ""}
            {indivQuest?.capitalGainsLosses && indivQuest?.capitalGainsLosses !== 'no' ? <li>Capital Gains & Losses</li> : ""}
            {indivQuest?.depreciation && indivQuest?.depreciation !== 'no' ? <li>Depreciation</li> : ""}
            {indivQuest?.divorce && indivQuest?.divorce !== 'no' ? <li>Divorce</li> : ""}
            {indivQuest?.ESOPStockOptions && indivQuest?.ESOPStockOptions !== 'no' ? <li>ESOP/Stock Options</li> : ""}
            {indivQuest?.EXPATTaxReturns && indivQuest?.EXPATTaxReturns !== 'no' ? <li>EXPAT Tax Returns</li> : ""}
            {indivQuest?.nolCarryback && indivQuest?.nolCarryback !== 'no' ? <li>NOL Carryback</li> : ""}
            {indivQuest?.IRC1031Exchanges && indivQuest?.IRC1031Exchanges !== 'no' ? <li>IRC 1031 Exchanges</li> : ""}
            {indivQuest?.ministriesPriests && indivQuest?.ministriesPriests !== 'no' ? <li>Ministries/Priests</li> : ""}
            {indivQuest?.netOperatingLosses && indivQuest?.netOperatingLosses !== 'no' ? <li>Net Operating Losses</li> : ""}
            {indivQuest?.NFT && indivQuest?.NFT !== 'no' ? <li>Non Fungible Tocken (NFT)</li> : ""}
            {indivQuest?.passiveActivityLosses && indivQuest?.passiveActivityLosses !== 'no' ? <li>Passive Activity Losses</li> : ""}
            {indivQuest?.pensionsIRADefinedBenefit && indivQuest?.pensionsIRADefinedBenefit !== 'no' ? <li>Pensions/IRA Defined Benefit</li> : ""}
            {indivQuest?.section473StepUpBasis && indivQuest?.section473StepUpBasis !== 'no' ? <li>Section 473/Step Up Basis</li> : ""}
            {indivQuest?.fbar && indivQuest?.fbar !== 'no' ? <li>FBAR Form 114</li> : ""}
            {indivQuest?.USpersons && indivQuest?.USpersons !== 'no' ? <li>U.S. Persons with respect to certain foreign corp (Form 5471)</li> : ""}
            {indivQuest?.student && indivQuest?.student !== 'no' ? <li>Student Loans</li> : ""}
        </ul>
    )
}
