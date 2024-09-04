"use client"

import Button from '@/components/global/Button'
import ModalComponent from '@/components/global/Modal'
import { Input, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { PatternFormat } from 'react-number-format'
import ConfirmPopupContent from '../../ConfirmPopupContent'

export default function SelectPayment({user, authDotNet, ticket, session, localVars, selectedPaymentMethod, setSelectedPaymentMethod, newCardInfo, setNewCardInfo}) {
    const formatExp = (exp: string) => `${exp.slice(0, 2)}/${exp.slice(2)}`

    useEffect(() => {
        const defaultCard = user?.savedCards?.find(card => card.default === true);
        setSelectedPaymentMethod(defaultCard?._id)
    }, [setSelectedPaymentMethod, user?.savedCards])


  
    return (
    <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-5'>
            <h1 className='font-bold text-xl'>Select Payment Method</h1>
            <Select
                selectionMode='single'
                label="Payment Type"
                variant="bordered"
                placeholder="Select a Payment Method"
                selectedKeys={[selectedPaymentMethod]}
                className="max-w-xs"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
                {authDotNet?.savedCards?.savedCards && authDotNet?.savedCards?.savedCards?.map((paymentOption) => (
                    <SelectItem key={paymentOption?.cardId} textValue={`${paymentOption?.cardType} ending in ${paymentOption?.lastFourDigits} (Exp: ${formatExp(paymentOption?.expirationDate)})`}>
                        {paymentOption?.cardType} ending in {paymentOption?.lastFourDigits} (Exp: {formatExp(paymentOption?.expirationDate)})
                    </SelectItem>
                ))}
                <SelectItem key="new-card">
                    Add New Card
                </SelectItem>
            </Select>
            <div className='flex flex-col gap-3'>
                <Input label="First Name" value={newCardInfo?.firstName} onChange={(e) => setNewCardInfo({ firstName: e.target.value })} />
                <Input label="Last Name" value={newCardInfo?.lastName} onChange={(e) => setNewCardInfo({ lastName: e.target.value })} />
                <Input label="Address" value={newCardInfo?.address} onChange={(e) => setNewCardInfo({ address: e.target.value })} />
                <Input label="City" value={newCardInfo?.city} onChange={(e) => setNewCardInfo({ city: e.target.value })} />
                <Input label="State" value={newCardInfo?.state} onChange={(e) => setNewCardInfo({ state: e.target.value })} />
                <Input label="Zip Code" value={newCardInfo?.zipCode} onChange={(e) => setNewCardInfo({ zipCode: e.target.value })} />
            </div>
            {selectedPaymentMethod === "new-card" && (
                <div className='flex flex-col gap-3'>
                    <PatternFormat label="Card Number" value={newCardInfo?.cardNumber} onChange={(e) => setNewCardInfo({ cardNumber: e.target.value })} format="####-####-####-####" allowEmptyFormatting mask="_" customInput={Input} />
                    <PatternFormat label="Expiry Date (MM/YY)" value={newCardInfo?.expiryDate} onChange={(e) => setNewCardInfo({ expiryDate: e.target.value })} format="##/##" allowEmptyFormatting mask="_" customInput={Input} />
                    <Input label="CVV" value={newCardInfo?.cvv} onChange={(e) => {if (e.target.value.length <= 4) setNewCardInfo({ cvv: e.target.value })}} />
                    {/* <PatternFormat label="CVV" value={newCardInfo?.cvv} onChange={(e) => setNewCardInfo({ cvv: e.target.value })} format="###" allowEmptyFormatting mask="_" customInput={Input} /> */}
                </div>
            )}
        </div>
        <div className='w-full'>
            {/* <ModalComponent 
                isIconOnly={false}
                button={<Button text="Confirm" className='w-full' secondaryColor={session?.whiteLabel?.secondaryColor} />}
                header={ticket?.missingInformation && ticket?.missingInformation.length ? "Warning" : "Please Confirm"}
                body={<ConfirmPopupContent user={user} ticket={ticket} needsPayment={localVars?.needsPayment} selectedPaymentMethod={selectedPaymentMethod} newCardInfo={newCardInfo} authDotNet={authDotNet} session={session} />}
            /> */}
        </div>
    </div>
)
}
