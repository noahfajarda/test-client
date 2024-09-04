"use client"

import React, { useEffect, useState } from 'react'

export default function EstatePlanning({ticket}) {
    const [estatePlanningQuest, setEstatePlanningQuest] = useState(null)
    
    useEffect(() => {
        setEstatePlanningQuest(ticket?.estatePlanningQuest)
    }, [ticket?.estatePlanningQuest])
    return (
        <ul className='list-disc pl-10'>
            {ticket?.noTaxFile ? <li>New Client (No Tax File)</li> : ""}
            {estatePlanningQuest?.reviewWillsOrTrusts && estatePlanningQuest?.reviewWillsOrTrusts !== 'no' ? <li>Review my existing wills and/or trusts</li> : ""}
            {estatePlanningQuest?.considerForTrustOrWill && estatePlanningQuest?.considerForTrustOrWill !== 'no' ? <li>Consider me for a trust and/or will</li> : ""}
            {estatePlanningQuest?.childEducationTrust && estatePlanningQuest?.childEducationTrust !== 'no' ? <li>Consider a child&apos;s or grandchild&apos;s irrevocable education trust</li> : ""}
            {estatePlanningQuest?.charitableTrustForGifts && estatePlanningQuest?.charitableTrustForGifts !== 'no' ? <li>Consider a charitable reminder interest trust for my gifts</li> : ""}
            {estatePlanningQuest?.privateFoundationForGifts && estatePlanningQuest?.privateFoundationForGifts !== 'no' ? <li>Consider using a private foundation for my gifts</li> : ""}
            {estatePlanningQuest?.preparePropertyPowerOfAttorney && estatePlanningQuest?.preparePropertyPowerOfAttorney !== 'no' ? <li>Prepare a property power of attorney</li> : ""}
            {estatePlanningQuest?.prepareFinancialPowerOfAttorney && estatePlanningQuest?.prepareFinancialPowerOfAttorney !== 'no' ? <li>Prepare a financial power of attorney</li> : ""}
            {estatePlanningQuest?.prepareHealthcarePowerOfAttorney && estatePlanningQuest?.prepareHealthcarePowerOfAttorney !== 'no' ? <li>Prepare a healthcare power of attorney</li> : ""}
            {estatePlanningQuest?.prepareStatementOfDesires && estatePlanningQuest?.prepareStatementOfDesires !== 'no' ? <li>Prepare my statement of desires for a designated person</li> : ""}
            {estatePlanningQuest?.guardianAppointmentForPet && estatePlanningQuest?.guardianAppointmentForPet !== 'no' ? <li>Prepare a guardian appointment for my pet</li> : ""}
            {estatePlanningQuest?.reviewAssetsForTaxImplications && estatePlanningQuest?.reviewAssetsForTaxImplications !== 'no' ? <li>Review my assets for estate tax implications</li> : ""}
            {estatePlanningQuest?.reviewWillsOrTrustsRET && estatePlanningQuest?.reviewWillsOrTrustsRET !== 'no' ? <li>Review my existing wills and/or trusts</li> : ""}
            {estatePlanningQuest?.QTIPTrust && estatePlanningQuest?.QTIPTrust !== 'no' ? <li>Consider a QTIP Trust</li> : ""}
            {estatePlanningQuest?.usingLifeInsurance && estatePlanningQuest?.usingLifeInsurance !== 'no' ? <li>Consider using life insurance to pay estate taxes and business debt</li> : ""}
            {estatePlanningQuest?.fractionalInterestTrust && estatePlanningQuest?.fractionalInterestTrust !== 'no' ? <li>Consider a Fractional Interest Trust</li> : ""}
            {estatePlanningQuest?.reviewTraditionalIRA && estatePlanningQuest?.reviewTraditionalIRA !== 'no' ? <li>Review of Traditional IRA, Retirement Accounts</li> : ""}
            {estatePlanningQuest?.reviewQualifiedRetirementPlans && estatePlanningQuest?.reviewQualifiedRetirementPlans !== 'no' ? <li>Review of Qualified Retirement Plans (SEP, Defined Benefit Plans, Etc.)</li> : ""}
            {estatePlanningQuest?.reviewAnnuitiesAndLifeInsurance && estatePlanningQuest?.reviewAnnuitiesAndLifeInsurance !== 'no' ? <li>Review of Annuities and Life Insurance</li> : ""}
            {estatePlanningQuest?.filingHomestead && estatePlanningQuest?.filingHomestead !== 'no' ? <li>Consider Filing a Homestead</li> : ""}
            {estatePlanningQuest?.assetsWithSpouse && estatePlanningQuest?.assetsWithSpouse !== 'no' ? <li>Consider Placing Assets with Spouse</li> : ""}
            {estatePlanningQuest?.tenantsByEntirety && estatePlanningQuest?.tenantsByEntirety !== 'no' ? <li>Consider a Tenants by Entirety</li> : ""}
            {estatePlanningQuest?.assetProtectionTrust && estatePlanningQuest?.assetProtectionTrust !== 'no' ? <li>Creation of an Asset Protection Trust</li> : ""}
            {estatePlanningQuest?.assetFamilyLimitedPartnership && estatePlanningQuest?.assetFamilyLimitedPartnership !== 'no' ? <li>Creation of a Family Limited Partnership</li> : ""}
            {estatePlanningQuest?.landTrust && estatePlanningQuest?.landTrust !== 'no' ? <li>Creation of a Land Trust (Privacy of Ownership)</li> : ""}
            {estatePlanningQuest?.equityStrippingAndQPRT && estatePlanningQuest?.equityStrippingAndQPRT !== 'no' ? 
                (estatePlanningQuest?.equityStrippingAndQPRT === "Equity Stripping From my Assets" ? <li>Consider Equity Stripping from my Assets</li> : 
                (estatePlanningQuest?.equityStrippingAndQPRT === 'QPRT' ? <li>Consider a QPRT Trust for my Home</li> : 
                (estatePlanningQuest?.equityStrippingAndQPRT === 'Both' ? <li>Consider Equity Stripping from my Assets & a QPRT Trust for my Home</li> : ""))) : 
            ""}
            {estatePlanningQuest?.chooseTheRightBusinessEntity && estatePlanningQuest?.chooseTheRightBusinessEntity !== 'no' ? <li>Choose the Right Business Entity</li> : ""}
            {estatePlanningQuest?.reviewBusinessContractsAndProcedures && estatePlanningQuest?.reviewBusinessContractsAndProcedures !== 'no' ? <li>Review of Business Contracts and Procedures</li> : ""}
            {estatePlanningQuest?.reviewProperBusinessInsurance && estatePlanningQuest?.reviewProperBusinessInsurance !== 'no' ? <li>Review of Proper Business Insurance</li> : ""}
            
        </ul>
    )
}
