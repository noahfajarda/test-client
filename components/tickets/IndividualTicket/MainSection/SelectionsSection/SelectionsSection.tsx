import React from 'react'
import FilingType from '../../../FilingTypes/FilingType'
import { addCommas } from '@/utils/functions'

export default function SelectionsSection({ticket}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2 sm:w-1/2 w-full min-h-48">
        <div>
            <h1 className="font-bold">My Selections</h1>
            <div className='text-sm'>
            {ticket?.filingType ? (<FilingType type={ticket?.filingType?.toLowerCase().replace(' ', '_')} ticket={ticket} />) : ""}
            </div>
        </div>
        {(ticket?.grossIncome || ticket?.taxableIncome || ticket?.taxLiability) ? (
            <div>
            <h1 className="font-bold">Tax Return Fields</h1>
            <div className='text-sm'>
                <ul className='list-disc pl-10'>
                {ticket?.grossIncome ? (<li>Gross Income: ${ticket?.grossIncome ? addCommas(ticket?.grossIncome.toFixed(2)) : 0}</li>) : ""}
                {ticket?.taxableIncome ? (<li>Taxable Income: ${ticket?.taxableIncome ? addCommas(ticket?.taxableIncome.toFixed(2)) : 0}</li>) : ""}
                {(ticket?.filingName === "1040" && ticket?.taxLiability) ? (<li>Taxable Liability: ${ticket?.taxLiability ? addCommas(ticket?.taxLiability.toFixed(2)) : 0}</li>) : ""}
                {(ticket?.taxSavingsTotal && !ticket?.isEcommerce) ? (<li>Tax Savings Total: ${ticket?.taxSavingsTotal ? addCommas(ticket?.taxSavingsTotal.toFixed(2)) : 0}</li>) : ""}
                </ul>
            </div>
            </div>
        ) : ""}
        </div>
  )
}
