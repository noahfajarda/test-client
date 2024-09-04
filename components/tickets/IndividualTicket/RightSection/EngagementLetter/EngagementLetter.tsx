import ModalComponent from '@/components/global/Modal'
import { Checkbox } from '@nextui-org/react'
import React from 'react'

export default function EngagementLetter({ticket, engagementLetterChecked, setEngagementLetterChecked, engagementLetterError, setEngagementLetterError}) {
  return (
    <div className='flex flex-col gap-2'>
        <p className='text-sm'>Please agree to the engagement letter, upload all the documents,
        add your credit card information before confirming. This ensures
        that your CPA/EA gets all information to work on your tax return.</p>
        <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-bold'>Engagement Letter</h3>
            <div className="flex">
                <Checkbox id="engagement-letter-checkbox" className='text-black' color='success' isSelected={engagementLetterChecked} onValueChange={() => {
                    setEngagementLetterChecked(!engagementLetterChecked)
                    setEngagementLetterError(false)
                }}>
                </Checkbox>
                
                <label htmlFor="engagement-letter-checkbox">
                    <div className='inline cursor-pointer' onClick={() => setEngagementLetterChecked(!engagementLetterChecked)}>I have </div>
                    <ModalComponent
                        isIconOnly={false}
                        button={<div className='inline underline font-bold cursor-pointer'>read the engagement letter</div>}
                        header={`${`${ticket?.filingName} ${ticket?.filingName !== ticket?.filingType ? `(${ticket?.filingType})` : ''}` || ticket?.filingName || ticket?.filingType} Engagement Letter`}
                        body={
                            <span>{ticket?.engagementLetter?.agreement}</span>
                        }
                /> <div className='inline cursor-pointer' onClick={() => setEngagementLetterChecked(!engagementLetterChecked)}>and agree to the terms outlined.</div></label>
            </div>
            {engagementLetterError && <div className="text-red-400">This field is required.</div>}
        </div>
    </div>
  )
}
