"use client"

import { Input, Select, SelectItem, Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import { PatternFormat } from 'react-number-format'
import Button from '../global/Button'
import { addNewCard, changeDefaultPayment } from '@/utils/APIRoutes'

export default function PaymentMethods({selectedPaymentMethod, setSelectedPaymentMethod, savedCards, newCardInfo, setNewCardInfo, session}) {
    // error states
    const [newCardError, setNewCardError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleNewCardSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setNewCardError("")

        // check if new payment method,
        try {
            let isNewCard = false;

            let cardNumber;
            let expiryDate;
            let cvv;

            // add a new card
            if (selectedPaymentMethod === "new-card") {
                ({cardNumber, cvv, expiryDate} = newCardInfo)

                if (!cardNumber || !expiryDate || !cvv) {
                    setIsLoading(false)
                    return setNewCardError("Not All Card Details Were Entered. Please Try Again.")
                }
                isNewCard = true
                
                const attemptAddCard = await addNewCard({
                    clientId: session?.id,
                    cardNumber,
                    expiry: expiryDate,
                    cardCode: cvv,
                    isNewCard
                })
                if (attemptAddCard?.errorMessage) {
                    setIsLoading(false)
                    return setNewCardError(attemptAddCard?.errorMessage)
                }
                
                window.location.href = "/profile?paymentMethodAdded=true"
            } else {
                // change default payment method
                const newDefaultCard = savedCards.find((card) => card.cardId === selectedPaymentMethod)
                if (!newDefaultCard) {
                    setIsLoading(false)
                    return setNewCardError("Invalid Selection")
                }

                const attemptSetDefault = await changeDefaultPayment({
                    cardId: newDefaultCard?.cardId,
                    clientId: session?.id
                })
                if (attemptSetDefault?.errorMessage) {
                    setIsLoading(false)
                    return setNewCardError(attemptSetDefault?.errorMessage)
                }
                window.location.href = "/profile?paymentMethodChanged=true"
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className="flex flex-col gap-8">
                <Select
                    selectionMode='single'
                    label="Payment Type"
                    variant="bordered"
                    placeholder="Select a Payment Method"
                    selectedKeys={[selectedPaymentMethod]}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                >
                    {savedCards && savedCards.map((paymentOption) => (
                        <SelectItem key={paymentOption?.cardId} textValue={`${paymentOption?.cardType} ending in ${paymentOption?.lastFourDigits} (Exp: ${paymentOption?.expirationDate.slice(0, 2)}/${paymentOption?.expirationDate.slice(2)})`}>
                            {paymentOption?.cardType} ending in {paymentOption?.lastFourDigits} (Exp: {paymentOption?.expirationDate.slice(0, 2)}/{paymentOption?.expirationDate.slice(2)})
                        </SelectItem>
                    ))}
                    <SelectItem key="new-card">
                        Add New Card
                    </SelectItem>
                </Select>
                {selectedPaymentMethod === "new-card" && (
                    <div className='flex flex-col gap-3'>
                        <PatternFormat label="Card Number" value={newCardInfo?.cardNumber} onChange={(e) => setNewCardInfo({ cardNumber: e.target.value })} format="####-####-####-####" allowEmptyFormatting mask="_" customInput={Input} />
                        <PatternFormat label="Expiry Date (MM/YY)" value={newCardInfo?.expiryDate} onChange={(e) => setNewCardInfo({ expiryDate: e.target.value })} format="##/##" allowEmptyFormatting mask="_" customInput={Input} />
                        <Input label="CVV" value={newCardInfo?.cvv} onChange={(e) => {if (e.target.value.length <= 4) setNewCardInfo({ cvv: e.target.value })}} />
                    </div>
                )}
                <div className='flex justify-center'>
                    <Button functionToRun={handleNewCardSubmit} text="Save Card" secondaryColor={session?.whiteLabel?.secondaryColor} disabled={isLoading ? true : false} />
                </div>
            </div>
            <div>
                {isLoading && (
                    <div className='flex justify-center'>
                        <Spinner color="primary"/>
                    </div>
                )}
                {newCardError && <p className="text-red-400 text-center">{newCardError}</p>}
            </div>
        </div>
    )
}
