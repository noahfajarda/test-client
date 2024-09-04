"use client"

import React, { useEffect, useState } from 'react'

export default function Audited({ticket}) {
    const [auditedQuest, setAuditedQuest] = useState(null)
    
    useEffect(() => {
        setAuditedQuest(ticket?.auditedQuest)
    }, [ticket?.auditedQuest])
    return (
        <ul className='list-disc pl-10'>
            {auditedQuest?.compilation && auditedQuest?.compilation !== 'no' ? <li>Compilation (No assurance)</li> : ""}
            {auditedQuest?.review && auditedQuest?.review !== 'no' ? <li>Review (Limited level of assurance)</li> : ""}
            {auditedQuest?.audit && auditedQuest?.audit !== 'no' ? <li>Audit (Highest level of assurance, usually required by large banks)</li> : ""}
            {auditedQuest?.previouslyAudited && auditedQuest?.previouslyAudited !== 'no' ? <li>Previously Audited or Reviewed? {auditedQuest?.previouslyAudited}</li> : ""}
            {auditedQuest?.qualityOfFinancialRecords && auditedQuest?.qualityOfFinancialRecords !== 'no' ? <li>Quality of Financial Records: {auditedQuest?.qualityOfFinancialRecords}</li> : ""}
            {auditedQuest?.capitolStructure && auditedQuest?.capitolStructure !== 'no' ? ((auditedQuest?.capitolStructure === 'Parent-Subsidiary') ? 
                <li>Capitol Structure: {auditedQuest?.qualityOfFinancialRecords}</li> :
                <li>Capitol Structure: {auditedQuest?.qualityOfFinancialRecords}</li>
            ) : ""}
            {auditedQuest?.assetAccounts && auditedQuest?.assetAccounts !== 'no' ? <li>Have Asset Accounts: {auditedQuest?.assetAccounts.join(', ')}</li> : ""}
            {auditedQuest?.liabilityAccounts && auditedQuest?.liabilityAccounts !== 'no' ? <li>Have Liability Accounts: {auditedQuest?.liabilityAccounts.join(', ')}</li> : ""}
            {auditedQuest?.contributionsOrDistributions && auditedQuest?.contributionsOrDistributions !== 'no' ? <li>Contribution or Distribution to the business: {auditedQuest?.contributionsOrDistributions}</li> : ""}
            {auditedQuest?.annualRevenue && auditedQuest?.annualRevenue !== 'no' ? <li>Business Annual Revenue: {auditedQuest?.annualRevenue}</li> : ""}
            {auditedQuest?.revenueTransactions && auditedQuest?.revenueTransactions !== 'no' ? <li>Number of Monthly Revenue Transactions: {auditedQuest?.revenueTransactions}</li> : ""}
            {auditedQuest?.revenuePayments && auditedQuest?.revenuePayments !== 'no' ? <li>Revenue payments made by: {auditedQuest?.revenuePayments}</li> : ""}
            {auditedQuest?.expenseTransactions && auditedQuest?.expenseTransactions !== 'no' ? <li>Number of Monthly Expense Transactions: {auditedQuest?.expenseTransactions}</li> : ""}
            {auditedQuest?.financialReportDueDate && auditedQuest?.financialReportDueDate !== 'no' ? <li>Due Date of Financial Report: {auditedQuest?.financialReportDueDate}</li> : ""}
        </ul>
    )
}
