"use client"

import React, { useEffect, useState } from 'react'

export default function Specialty({ticket}) {
    const [specialtyQuest, setSpecialtyQuest] = useState(null)
    
    useEffect(() => {
        setSpecialtyQuest(ticket?.specQuest)
    }, [ticket?.specQuest])
    return (
        <ul className='list-disc pl-10'>
            {ticket?.noTaxFile ? <li>New Client (No Tax File)</li> : ""}
            {(specialtyQuest?.ammended && specialtyQuest?.ammended !== 'no') || ticket?.customQuest?.selections?.includes('Amended Return') ? <li>Amended Return <br/> <span className='text-red-500'>Please enter reason for amendment in notes to preparer</span></li> : ""}
            {specialtyQuest?.rentalProperties && specialtyQuest?.rentalProperties !== 'no' ? <li>Owns {specialtyQuest?.rentalProperties} Rental Properties</li> : ""}
            {specialtyQuest?.buySellRental && specialtyQuest?.buySellRental !== 'no' ? <li>Bought/Sold {specialtyQuest?.buySellRental} Rental(s)</li> : ""}
            {specialtyQuest?.saleOfBusinessAssets ? <li>Sale Of Business Assets: {specialtyQuest?.saleOfBusinessAssets}</li> : ""}
            {specialtyQuest?.bankruptcyEstate ? <li>Bankruptcy Estate</li> : ""}
            {specialtyQuest?.pooledIncomeFund ? <li>Pooled Income Fund</li> : ""}
            {specialtyQuest?.fbar ? <li>FBAR Form 114</li> : ""}
            {specialtyQuest?.nonExemptCharitableTrust ? <li>Non-Exempt Charitable Trust</li> : ""}
            {specialtyQuest?.nolCarryback ? <li>NOL Carryback</li> : ""}
            {specialtyQuest?.firstYear ? <li>First Year Tax Return</li> : ""}
            {specialtyQuest?.notATaxBasis ? <li>Books Not A Tax Basis</li> : ""}
            {specialtyQuest?.notReconciled ? <li>Books Not Reconciled or Needs AJE&apos;s</li> : ""}
            {specialtyQuest?.trustDistributions && specialtyQuest?.trustDistributions !== 'no' ? <li>{specialtyQuest?.trustDistributions}</li> : ""}
            {specialtyQuest?.grossIncome && specialtyQuest?.grossIncome !== 'no' ? <li>Gross Income: {specialtyQuest?.grossIncome}</li> : ""}
            {specialtyQuest?.grossAssets && specialtyQuest?.grossAssets !== 'no' ? <li>Gross Assets: {specialtyQuest?.grossAssets}</li> : ""}
            {specialtyQuest?.stocksAndBonds && specialtyQuest?.stocksAndBonds !== 'no' ? <li>Stocks And Bonds</li> : ""}
            {specialtyQuest?.realEstate && specialtyQuest?.realEstate !== 'no' ? <li>Real Estate</li> : ""}
            {specialtyQuest?.closelyHeldBusiness && specialtyQuest?.closelyHeldBusiness !== 'no' ? <li>Closely Held Business</li> : ""}
            {specialtyQuest?.jointlyOwnedProperty && specialtyQuest?.jointlyOwnedProperty !== 'no' ? <li>Jointly Owned Property</li> : ""}
            {specialtyQuest?.lifeInsuranceOnDecedent && specialtyQuest?.lifeInsuranceOnDecedent !== 'no' ? <li>Life Insurance On Decedent</li> : ""}
            {specialtyQuest?.mortgagesAndDebt && specialtyQuest?.mortgagesAndDebt !== 'no' ? <li>Mortgages And Debt</li> : ""}
            {specialtyQuest?.transfersInDecedentsLife && specialtyQuest?.transfersInDecedentsLife !== 'no' ? <li>Transfers In Decedents Life</li> : ""}
            {specialtyQuest?.bequestToSurvivingSpouse && specialtyQuest?.bequestToSurvivingSpouse !== 'no' ? <li>Bequest To Surviving Spouse</li> : ""}
            {specialtyQuest?.haveGST && specialtyQuest?.haveGST !== 'no' ? <li>Have A GST</li> : ""}
            {specialtyQuest?.assets && specialtyQuest?.assets !== 'no' ? <li>Sold or Purchased Assets</li> : ""}
            {specialtyQuest?.assetsDeprec && specialtyQuest?.assetsDeprec !== 'no' ? <li>Has Assets that require a depreciation deduction</li> : ""}
            {specialtyQuest?.numOfBeneficieries && specialtyQuest?.numOfBeneficieries !== 'no' ? <li>Number of Beneficiaries: {specialtyQuest?.numOfBeneficieries}</li> : ""}
            {specialtyQuest?.priorGiftsMade && specialtyQuest?.priorGiftsMade !== 'no' ? <li>Prior Gifts Made</li> : ""}
            {specialtyQuest?.giftSplitWithSpouse && specialtyQuest?.giftSplitWithSpouse !== 'no' ? <li>Gift Split With Spouse</li> : ""}
            {specialtyQuest?.giftedCloselyHeldBusiness && specialtyQuest?.giftedCloselyHeldBusiness !== 'no' ? <li>Gifted Closely Held Business</li> : ""}
            {specialtyQuest?.giftedRealEstate && specialtyQuest?.giftedRealEstate !== 'no' ? <li>Gifted Real Estate</li> : ""}
            {specialtyQuest?.grossGiftAmount && specialtyQuest?.grossGiftAmount !== 'no' ? <li>Gross Gift Amount: {specialtyQuest?.grossGiftAmount}</li> : ""}
            {specialtyQuest?.numOfDonees && specialtyQuest?.numOfDonees !== 'no' ? <li>Number Of Drones: {specialtyQuest?.numOfDonees}</li> : ""}
            {specialtyQuest?.privateFoundation && specialtyQuest?.privateFoundation !== 'no' ? <li>Private Foundation</li> : ""}
            {specialtyQuest?.politicalOrganization && specialtyQuest?.politicalOrganization !== 'no' ? <li>Political Organization</li> : ""}
            {specialtyQuest?.privateCharity && specialtyQuest?.privateCharity !== 'no' ? <li>Private Charity</li> : ""}
            {specialtyQuest?.churches && specialtyQuest?.churches !== 'no' ? <li>Churches</li> : ""}
            {specialtyQuest?.grossReceipts && specialtyQuest?.grossReceipts !== 'no' ? <li>Gross Receipts: {specialtyQuest?.grossReceipts}</li> : ""}
        </ul>
    )
}
