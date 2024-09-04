"use client"

import React, { useEffect, useState } from 'react'

export default function TaxPlanning({ticket}) {
    const [taxPlanningQuest, setTaxPlanningQuest] = useState(null)
    
    useEffect(() => {
        setTaxPlanningQuest(ticket?.taxPlanningQuest)
    }, [ticket?.taxPlanningQuest])
    return (
        <ul className='list-disc pl-10'>
            {(taxPlanningQuest?.ammended && taxPlanningQuest?.ammended !== 'no') || ticket?.isCustom === true && ticket?.customQuest?.selections?.includes('Amended Return') ? 
                <li>Amended Return <br/> <span className='text-red-500'>Please enter reason for amendment in notes to preparer</span></li> : ""}
            {ticket?.dateOfBirth ? <li>Taxpayer DOB: {ticket?.dateOfBirth.month}/{ticket?.dateOfBirth.day}/{ticket?.dateOfBirth.year}</li> : ""}
            {ticket?.taxPayerOccupation ? <li>Taxpayer Occupation: {ticket?.taxPayerOccupation}</li> : ""}
            {taxPlanningQuest?.filingStatus && taxPlanningQuest?.filingStatus !== 'no' ? <li>Filing Status: {taxPlanningQuest?.filingStatus}</li> : ""}
            {taxPlanningQuest?.filingStatus === "Married, Filing Jointly (MFJ)" ? (
                ticket?.spouseDateOfBirth ? <li>Spouse DOB: {ticket?.spouseDateOfBirth.month}/{ticket?.spouseDateOfBirth.day}/{ticket?.spouseDateOfBirth.year}</li> : ""
            ) : ""}
            {taxPlanningQuest?.filingStatus === "Married, Filing Jointly (MFJ)" ? (
                ticket?.spouseOccupation ? <li>Spouse Occupation: {ticket?.spouseOccupation}</li> : ""
            ) : ""}
            {ticket?.numberOfDependents ? <li>Dependents: {ticket?.numberOfDependents}</li> : ""}
            {taxPlanningQuest?.basicTaxPlanningChecklist !== 'no' && taxPlanningQuest?.basicTaxPlanningChecklist ? <li>Basic Tax Planning Checklist</li> : ""}
            {taxPlanningQuest?.findAllTaxSavingsIndividual !== 'no' && taxPlanningQuest?.findAllTaxSavingsIndividual ? <li>Find ALL Potential Tax Savings - Individual</li> : ""}
            {taxPlanningQuest?.findAllTaxSavingsBusiness !== 'no' && taxPlanningQuest?.findAllTaxSavingsBusiness ? <li>Find ALL Potential Tax Savings - Business</li> : ""}
            {taxPlanningQuest?.IRS !== 'no' && taxPlanningQuest?.IRS ? <li>IRS/State Representation</li> : ""}
            {taxPlanningQuest?.taxPlanForMyExistingCompany !== 'no' && taxPlanningQuest?.taxPlanForMyExistingCompany ? <li>Tax Plan For My Existing Company</li> : ""}
            {taxPlanningQuest?.buyOrSellPrincipalResidence !== 'no' && taxPlanningQuest?.buyOrSellPrincipalResidence ? <li>I&apos;m Buying or Selling a Principal Residence</li> : ""}
            {taxPlanningQuest?.buyOrSellRentalProperty !== 'no' && taxPlanningQuest?.buyOrSellRentalProperty ? <li>I&apos;m Buying or Selling a Rental Property</li> : ""}
            {taxPlanningQuest?.newBusiness !== 'no' && taxPlanningQuest?.newBusiness ? <li>I want to Acquire a New Business</li> : ""}
            {taxPlanningQuest?.soldBusinessOrCloselyHeldStock !== 'no' && taxPlanningQuest?.soldBusinessOrCloselyHeldStock ? <li>I Sold My Business or Closely Held Stock</li> : ""}
            {taxPlanningQuest?.taxFreeExchange !== 'no' && taxPlanningQuest?.taxFreeExchange ? <li>I Want to Do a Tax Free Exchange</li> : ""}
            {taxPlanningQuest?.needHelpWithIRA !== 'no' && taxPlanningQuest?.needHelpWithIRA ? <li>I Need Help With IRA&apos;s, Roths, Pensions and Defined Benefit Plans</li> : ""}
            {taxPlanningQuest?.needHelpWithESOP !== 'no' && taxPlanningQuest?.needHelpWithESOP ? <li>I Need Help With ESOP&apos;s (Employee Stock Options) and RSU&apos;s (Restricted Stock Units)</li> : ""}
            {taxPlanningQuest?.otherAssistance !== 'no' && taxPlanningQuest?.otherAssistance ? <li>Other Tax Planning</li> : ""}
            {taxPlanningQuest?.forensicAccounting !== 'no' && taxPlanningQuest?.forensicAccounting ? <li>Forensic Accounting</li> : ""}
            {taxPlanningQuest?.internetSales !== 'no' && taxPlanningQuest?.internetSales ? <li>Internet Sales/International Tax</li> : ""}
            {taxPlanningQuest?.estateTax !== 'no' && taxPlanningQuest?.estateTax ? <li>Estate Tax</li> : ""}
            {taxPlanningQuest?.exemptOrganization !== 'no' && taxPlanningQuest?.exemptOrganization ? <li>Exempt Organization</li> : ""}
            {taxPlanningQuest?.socialSecurityBenefits !== 'no' && taxPlanningQuest?.socialSecurityBenefits ? <li>Social Security Benefits</li> : ""}
            {taxPlanningQuest?.specialProjects !== 'no' && taxPlanningQuest?.specialProjects ? <li>Special Projects</li> : ""}
            {taxPlanningQuest?.lifeInsurance !== 'no' && taxPlanningQuest?.lifeInsurance ? <li>Life Insurance</li> : ""}
            {taxPlanningQuest?.charitable !== 'no' && taxPlanningQuest?.charitable ? <li>Charitable</li> : ""}
            
        </ul>
    )
}
