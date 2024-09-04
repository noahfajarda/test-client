"use client"

import React, { useEffect, useState } from 'react'

export default function Bookkeeping({ticket}) {
    const [bookkeepingQuest, setBookkeepingQuest] = useState(null)
    
    useEffect(() => {
        setBookkeepingQuest(ticket?.bookkeepingQuest)
    }, [ticket?.bookkeepingQuest])
    return (
        <ul className='list-disc pl-10'>
            {bookkeepingQuest?.monthlyTransactions && bookkeepingQuest?.monthlyTransactions !== 'no' ? <li>Number of Monthly Transactions: {bookkeepingQuest?.monthlyTransactions}</li> : ""}
            {bookkeepingQuest?.monthlyIntercompanyTransactions && bookkeepingQuest?.monthlyIntercompanyTransactions !== 'no' ? <li>Number of Monthly Intercompany Transactions: {bookkeepingQuest?.monthlyIntercompanyTransactions}</li> : ""}
            {bookkeepingQuest?.monthlyAccountsPayable && bookkeepingQuest?.monthlyAccountsPayable !== 'no' ? <li>Monthly Accounts Payable: {bookkeepingQuest?.monthlyAccountsPayable}</li> : ""}
            {bookkeepingQuest?.monthlyAccountsReceivable && bookkeepingQuest?.monthlyAccountsReceivable !== 'no' ? <li>Monthly Accounts Receivable: {bookkeepingQuest?.monthlyAccountsReceivable}</li> : ""}
            {bookkeepingQuest?.quickbooksReconciliation && bookkeepingQuest?.quickbooksReconciliation !== 'no' ? <li>Quickbooks Reconciliation: {bookkeepingQuest?.quickbooksReconciliation}</li> : ""}
            {bookkeepingQuest?.booksStatus && bookkeepingQuest?.booksStatus !== 'no' ? <li>Books Status: {bookkeepingQuest?.booksStatus}</li> : ""}
            {bookkeepingQuest?.file1099 && bookkeepingQuest?.file1099 !== 'no' ? <li>Number of Contractors for filing 1099&apos;s: {bookkeepingQuest?.file1099}</li> : ""}
            {bookkeepingQuest?.numberOfEmployees && bookkeepingQuest?.numberOfEmployees !== 'no' ? <li>Number of Employees: {bookkeepingQuest?.numberOfEmployees}</li> : ""}
            {bookkeepingQuest?.additionalProcess && bookkeepingQuest?.additionalProcess !== 'no' ? <li>Additional Process: {bookkeepingQuest?.additionalProcess === 'All Four' ? 
                "All Four (W2's, PTO, Quarterly Tax Filings, Direct Deposit Payments)" : 
                ticket.bookkeepingQuest.additionalProcess
                }</li> : ""}
            {bookkeepingQuest?.salesTaxPreparationAndReports && bookkeepingQuest?.salesTaxPreparationAndReports !== 'no' ? <li>Has Sales Tax Preparation And Reports</li> : ""}
            {bookkeepingQuest?.quickbooksSetup && bookkeepingQuest?.quickbooksSetup !== 'no' ? <li>Has Quickbooks Setup</li> : ""}
        </ul>
    )
}
