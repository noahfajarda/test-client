"use client"

import React, { useEffect, useState } from 'react'

export default function Business({ticket}) {
    const [businessQuest, setBusinessQuest] = useState(null)
    
    useEffect(() => {
        setBusinessQuest(ticket?.busQuest)
    }, [ticket?.busQuest])
    
    return (
        <ul className='list-disc pl-10'>
            {ticket?.noTaxFile ? <li>New Client (No Tax File)</li> : ""}
            {(businessQuest?.ammended !== 'no' && businessQuest?.ammended) || (ticket?.isCustom === true && ticket?.customQuest?.selections?.includes("Amended Return")) ? <li>Amended Return <br/> <span className='text-red-500'>Please enter reason for amendment in notes to preparer</span></li> : ""}
            {businessQuest?.partners ? <li>{businessQuest?.partners} Partners</li> : ""}
            {businessQuest?.shareholders ? <li>{businessQuest?.shareholders} Shareholders</li> : ""}
            <li>{businessQuest?.grossIncome} Gross Income</li>
            {businessQuest?.firstYear ? <li>First Year Tax Return</li> : ""}
            {businessQuest?.taxBasis ? <li>Books Not A Tax Basis</li> : ""}
            {businessQuest?.notReconciled ? <li>Books Not Reconciled or Needs AJE&apos;s</li> : ""}
            {businessQuest?.assets ? <li>Sold/Purchased Assets</li> : ""}
            {businessQuest?.assetsDeprec ? <li>Has assets that require a depreciation deduction</li> : ""}
            {businessQuest?.k1s ? <li>{businessQuest?.k1s} Schedule K1&apos;s</li> : ""}
            {businessQuest?.rentalProperties ? <li>Owns {businessQuest?.rentalProperties} Rental Properties</li> : ""}
            {businessQuest?.buySellRental ? <li>Bought/Sold {businessQuest?.buySellRental} Rental(s)</li> : ""}
            {businessQuest?.saleOfBusinessAssets ? <li>Sale Of Business Assets: {businessQuest?.saleOfBusinessAssets}</li> : ""}
            {businessQuest?.cancellationOfDebt ? <li>Cancellation Of Debt</li> : ""}
            {businessQuest?.cannabis ? <li>Cannabis</li> : ""}
            {businessQuest?.publiclyTradedPartnerships ? <li>Publicly Traded Partnerships</li> : ""}
            {businessQuest?.builtInGainsTax ? <li>Built-in Gains Tax</li> : ""}
            {businessQuest?.section473StepUpBasis ? <li>Section 473/Step Up Basis</li> : ""}
            {(businessQuest?.fbar && businessQuest?.fbar !== 'no') ? <li>FBAR Form 114</li> : ""}
            
        </ul>
    )
}
