"use client"

import Button from '@/components/global/Button'
import { Card } from '@nextui-org/react'
import React, { useReducer, useState } from 'react'
import EngagementLetter from './RightSection/EngagementLetter/EngagementLetter'
import SelectPayment from './RightSection/SelectPayment/SelectPayment'
import ModalComponent from '@/components/global/Modal'
import ConfirmPopupContent from './ConfirmPopupContent'
import RequestRevision from '../RequestRevision'
import { addCommas } from '@/utils/functions'

export default function RightColumnTicketCard({ticket, localVars, authDotNet, session, user}) {
    const [engagementLetterChecked, setEngagementLetterChecked] = useState(false)
    const [engagementLetterError, setEngagementLetterError] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
    const [newCardInfo, setNewCardInfo] = useReducer(
        (state, action) => ({
            ...state,
            ...action,
            }),
            {
                cardNumber: "",
                expiryDate: "",
                cvv: "",
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                state: "",
                zipCode: ""
            }
        );

  return (
    <Card className='shadow-2xl lg:col-span-2 col-span-1'>
        <div className="bg-[#F0F0F0] h-24 p-3">
            <table className='w-full h-full'>
                <tbody>
                    <tr className='text-left'>
                        <th>Ticket Fee</th>
                        {localVars?.needsPayment ? <th>Amount Due</th> : <th>Amount Paid</th>}
                    </tr>
                    <tr>
                        <td>{ticket?.price ? `$${addCommas(ticket?.price)}` : 'In Progress'}</td>
                        {localVars?.needsPayment && localVars?.paymentAmount ? <td>${addCommas(localVars?.paymentAmount) || 0}</td> : <td>${ticket?.pricePaid ? addCommas(ticket?.pricePaid) : 0}</td>}
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="p-5 flex flex-col gap-10">
            {localVars?.returnSubmitted ? (
                <div className='flex flex-col gap-3'>
                    <h2 className='font-bold'>Your tax return is ready</h2>
                    <div>
                        <a target="_blank" style={{color: session?.whiteLabel?.secondaryColor ? session?.whiteLabel?.secondaryColor : ''}} href={ticket?.finalTaxReturn?.file?.url} className='font-bold text-sm underline inline-block'>Download your {ticket?.filingType === "Tax Planning" ? "tax plan" : "tax return"}</a>
                    </div>

                    {localVars?.needsFinalPayment ? (
                        <div>
                            <p className='text-sm'>If you notice any issues with the return, please send it back for a revision. Otherwise, submit any remaining payments.</p>
                            <div className="py-3">

                            <ModalComponent 
                                isIconOnly={false}
                                button={<Button text="Request Changes" className='text-sm' style="light" />}
                                header="Please Confirm This Action"
                                body={<RequestRevision session={session} ticket={ticket} user={user} />}
                            />
                            </div>
                        </div>
                    ) : ""}
                </div>
            ) : ""}

            {(ticket?.readyForCpaReview && ticket?.status === 'New') ? (
                <p className='text-sm'>This file is being examined by the firm. You will be notified if you need to take any further action.</p>
            ) : ((localVars?.returnSubmitted && !localVars?.needsPayment) ? (
                <div className='flex flex-col gap-3'>
                    <h2 className='font-bold'>
                        {ticket?.agreement8879?.link === 'No e-file' ? "Your return will be paper filed" : (
                            (!ticket?.agreement8879?.agreed ? `E-file authorization ${localVars?.needs8879Sign ? 'needed' : 'pending'}` : "")
                        )}
                    </h2>
                    {localVars?.needs8879Sign ? (
                        <div>
                            {ticket?.agreement8879?.revisionRequested ? (
                                <p>You have requested a revision on your return. You will be notified when the firm sends you an updated agreement.</p>
                            ) : (
                                <div className='flex flex-col gap-3'>
                                    <p className='text-sm'>Please take a moment to review your return. This return also requires that you sign an e-file authorization form so that the firm can file the return on your behalf.</p>
                                    <p className='text-sm'>Once you sign the form, there is no more action needed on your end. The firm will notify you once your return has been e-filed.</p>
                                    <Button text="Sign E-File Authorization" className='text-lg w-full' link={ticket?.agreement8879?.link} targetBlank={true} secondaryColor={session?.whiteLabel?.secondaryColor} />

                                    {/* <a>Send return back for revision</a> */}
                                </div>
                            )}
                        </div>
                    ) : (!ticket?.agreement8879?.agreed ? (
                        <p className='text-sm'>We are waiting on the firm to send the E-File Authorization agreement. You will be notified when you need to take any further action.</p>
                    ) : (ticket?.status === "Complete" ? (
                        <p className='text-sm'>Your tax return has been {(ticket?.agreement8879?.link === 'No e-file') ? "paper filed" : "E-Filed"}. Your return is now complete.</p>
                    ) : (
                        <p className='text-sm'>Your tax return will be {(ticket?.agreement8879?.link === 'No e-file') ? "paper filed" : "E-Filed"}. You will be notified when the firm has filed your return.</p>
                    )))}
                </div>
            ) : ((!['Complete', 'New', 'Post Prep Review', 'In Review'].includes(ticket?.status)) ? (
                <p className='text-sm'>This file is currently being prepared. You will be notified if you need to take any further action.</p>
            ) : ((['Post Prep Review', 'In Review'].includes(ticket?.status) && (!ticket?.finalTaxReturn)) ? (
                <p className='text-sm'>This file is currently being reviewed. You will be notified if you need to take any further action.</p>
            ) : "")))}

            <div className='flex flex-col gap-3'>
                <input type="hidden" value="false" name="isNewCard" id="isNewCard" />

                {ticket?.engagementLetter && ticket?.engagementLetter?.agreement && ticket?.price && !ticket?.engagementLetter?.agreed ? (
                    <EngagementLetter 
                        ticket={ticket} 
                        engagementLetterChecked={engagementLetterChecked} 
                        setEngagementLetterChecked={setEngagementLetterChecked} 
                        engagementLetterError={engagementLetterError}
                        setEngagementLetterError={setEngagementLetterError}
                    />
                ) : ""}

                {(ticket?.finalTaxReturn && ticket?.finalTaxReturn?.status !== 'Sent to Client') ? 
                    <p className='text-sm'>Your return is being reviewed by the firm. Please check back again soon to view your return.</p>
                : ""}

                {(!(localVars?.needsPayment && localVars?.needsFinalPayment)) ? (
                    <div>
                        {(ticket?.pricePaid != ticket?.price && ticket?.whiteLabelDepositPercentage === 0) ? (
                            <div>
                                <h2>Status</h2>
                                <p>A deposit is not required for this return.</p>
                            </div>
                        ) : ""}
                    </div>
                ) : (ticket?.depositPaid ? (
                    <div className='flex flex-col gap-3'>
                        <h2 className='font-bold'>Payment Status</h2>
                        {(ticket?.whiteLabelDepositPercentage !== 0) ? (
                            <div>
                                <div className='flex flex-col gap-2 py-2'>
                                    <div className='flex justify-between'>
                                        <p>Ticket Fee</p>
                                        <p>{ticket?.price ? `$${addCommas(ticket?.price)}` : 'In Progress'}</p>
                                    </div>
                                    <div className='flex justify-between text-slate-400'>
                                        <p>Amount Paid</p>
                                        <p>-${ticket?.pricePaid ? addCommas(ticket?.pricePaid) : 0}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='py-2'>
                                    <div className='flex justify-between font-bold'>
                                        <p>Amount Due</p>
                                        <p className='text-2xl'>${localVars?.paymentAmount ? addCommas(localVars?.paymentAmount) : 0}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>A deposit is not required for this return.</p>
                        )}
                        {ticket?.pricePaid >= ticket?.price ? <p>This return is paid in full!</p> : ""}
                    </div>
                ) : "")}
                {(localVars?.needsPayment && ticket?.price) ? (
                    <div>
                        <div>
                            {/* payment method dropdown partial */}
                            <SelectPayment 
                                user={user}
                                authDotNet={authDotNet}
                                ticket={ticket} 
                                session={session} 
                                localVars={localVars}
                                selectedPaymentMethod={selectedPaymentMethod}
                                setSelectedPaymentMethod={setSelectedPaymentMethod}
                                newCardInfo={newCardInfo}
                                setNewCardInfo={setNewCardInfo}
                            />
                        </div>
                        <div className={`${authDotNet?.savedCards && authDotNet?.savedCards.length > 0 ? 'hidden' : 'block'}`}>
                            <div id="card-element"></div>
                        </div>
                    </div>
                ) : ""}
                {(!ticket?.readyForCpaReview && ticket?.price) ? (
                    <div className='flex flex-col gap-3'>
                        <p className='text-sm'>Your file is awaiting confirmation that the information is correct, and the missing documents are uploaded.</p>
                        <ModalComponent 
                            isIconOnly={false}
                            button={<Button text="Confirm" className='w-full' secondaryColor={session?.whiteLabel?.secondaryColor} />}
                            header={ticket?.missingInformation && ticket?.missingInformation.length ? "WARNING" : "Please Confirm"}
                            body={
                                <ConfirmPopupContent
                                    user={user}
                                    ticket={ticket}
                                    needsPayment={localVars?.needsPayment}
                                    authDotNet={authDotNet}
                                    session={session}
                                    newCardInfo={newCardInfo}
                                    selectedPaymentMethod={selectedPaymentMethod}
                                    engagementLetterChecked={engagementLetterChecked}
                                    engagementLetterError={engagementLetterError}
                                    setEngagementLetterError={setEngagementLetterError}
                                />
                            }
                        />
                    </div>
                ) : ((localVars?.needsFinalPayment && localVars?.returnSubmitted) ? (
                    <div className="w-full">
                        <ModalComponent 
                            isIconOnly={false}
                            button={<Button text="Confirm Return and Pay" className='w-full' secondaryColor={session?.whiteLabel?.secondaryColor} />}
                            header={ticket?.missingInformation && ticket?.missingInformation.length ? "WARNING" : "Please Confirm"}
                            body={
                                <div>
                                    <ConfirmPopupContent
                                        user={user}
                                        ticket={ticket}
                                        needsPayment={localVars?.needsPayment}
                                        selectedPaymentMethod={selectedPaymentMethod}
                                        newCardInfo={newCardInfo}
                                        authDotNet={authDotNet}
                                        session={session}
                                        setEngagementLetterError={setEngagementLetterError}
                                    />
                                    {/* need to do <ConfirmPopupContent> */}
                                    {/* need to get payment method */}
                                </div>
                            }
                        />
                    </div>
                ) : ((localVars?.needsPayment && ticket?.price) ? (
                    <a href="">Confirm</a>
                ) : ""))}

                {(localVars?.needsPayment && !ticket?.price) ? (
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold'>Next Steps:</h3>
                        <p className='text-sm'>Your tax file is under review. You will receive an email when it is ready for uploading necessary documents and payments.</p>
                    </div>
                ) : ""}
                {/* popup */}
            </div>
        </div>
    </Card>
  )
}
