"use client"

import Button from '@/components/global/Button'
import { changeConfirmation, confirmTicketWithDeposit, createTransaction, makePayment, ticketPayment } from '@/utils/APIRoutes'
import { Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function ConfirmPopupContent({user, ticket, needsPayment, selectedPaymentMethod, newCardInfo, authDotNet, session, engagementLetterChecked, engagementLetterError, setEngagementLetterError}) {
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    setPaymentAmount(
      !ticket.depositPaid && ticket.status === 'New' ? 
      Math.floor((ticket.price || 0) * (ticket.whiteLabelDepositPercentage ?? 50)/100) : 
      Math.floor(ticket.price - (ticket.pricePaid || 0))
    )
  }, [ticket?.depositPaid, ticket?.price, ticket?.pricePaid, ticket?.status, ticket?.whiteLabelDepositPercentage])


  const handleInitialTicketPayment = async (e) => {
    e.preventDefault()
    // engagement letter
    setEngagementLetterError(false)
    // is there is an engagement letter on this page
    if (ticket?.engagementLetter && ticket?.engagementLetter?.agreement && ticket?.price && !ticket?.engagementLetter?.agreed) {
      // check if it's been signed. if not, show error on engagement letter
      if (!engagementLetterChecked) return setEngagementLetterError(true)
    }
    
    // STEPS:
    try {
      setButtonDisabled(true)
      // 1. enable a 'loading spinner' for UI
      setIsLoading(true)
      setError("")
      // 2. if it's a new card, 'isNewCard' == true, otherwise, 'isNewCard' == false
      let isNewCard = false
      let selectedCard;
      let cardNumber, expiryDate, cvv;


      // if (!newCardInfo)
      const {firstName, lastName, address, city, state, zipCode} = newCardInfo;

      if (!firstName || !lastName || !address || !city || !state || !zipCode) {
        setButtonDisabled(false)
        setIsLoading(false)
        return setError("One or more pieces of personal information were not entered.")
      }

      if (selectedPaymentMethod === "new-card") {
        ({cardNumber, expiryDate, cvv} = newCardInfo)

        // handle error no value for a field
        if (!cardNumber || !expiryDate || !cvv) {
          setIsLoading(false)
          setButtonDisabled(false)
          return setError("Not all card details were entered. Please try again.")
        }
        // handle error incomplete value
        if (cardNumber.includes("_") || expiryDate.includes("_") || cvv.includes("_")) {
          setIsLoading(false)
          setButtonDisabled(false)
          return setError("Your card information is incomplete. Please try again.")
        }
        // set the card to the info, and claim it's a new card
        selectedCard = newCardInfo
        isNewCard = true
      } else {
        selectedCard = authDotNet?.savedCards?.savedCards?.find((card) => card?.cardId === selectedPaymentMethod)
        isNewCard = false
      }

      // 3. API call (and retrieve data) to '/authorizeDotNet/customers/ticketPayment' with the body:
              // user,
              // quantity: ticketPrice,
              // cardNumber,
              // expiry,
              // cardCode,
              // isNewCard,
              // cardId: paymentMethodDropDown?.value
      const ticketPaymentResponse = await ticketPayment({
        clientId: user?._id,
        quantity: paymentAmount,
        cardNumber: selectedCard?.cardNumber,
        expiry: selectedCard?.expiryDate,
        cardCode: selectedCard?.cvv,
        isNewCard,
        cardId: selectedPaymentMethod
      })
      console.log(ticketPaymentResponse)
      // 3a. if there's an error, remove the 'loading spinner' and set the error to the error received from the API
      if (ticketPaymentResponse?.errorMessage) {
        setIsLoading(false)
          setButtonDisabled(false)
          return setError(ticketPaymentResponse?.errorMessage)
      }

      
      // 4. if no error, API call to '/tickets-v2/makePayment' with the body:
                // id (ticketId)
                // clientId
                // depositPaid: true
                // pricePaid: amount due/ticketPrice
      const makePaymentResponse = await makePayment({
        ticketId: ticket?._id,
        clientId: user?._id,
        ticketPrice: paymentAmount
      })
      console.log(makePaymentResponse)
      // 4a. if there's an error, remove the 'loading spinner' and set the error to the error received from the API
      if (!makePaymentResponse?.sucess) {
        setIsLoading(false)
        setButtonDisabled(false)
        return setError("Something went wrong with your Payment. Please try again.")
      }
      // 4b. ONLY IF YOU'RE CONFIRMING THE TICKET: API call to '/tickets-v2/changeConfirmation' (may encounter errors with 'withCredentials') with the body:
                // id (ticketId)
                // clientId
                // confirmedBy: 'client'
                // readyForCpaReview: true,
                // engagementLetterNeeded,
                // agreeToEngagementLetter
      if (!ticket.readyForCpaReview && ticket?.price) { // condition for 'changeConfirmation'
        const engagementLetterNeeded = (ticket?.engagementLetter && ticket?.engagementLetter?.agreement) && !ticket?.engagementLetter?.agreed;
        const confirmationChangeResponse = await changeConfirmation({
          ticketId: ticket?._id,
          clientId: user?._id,
          engagementLetterNeeded,
          agreeToEngagementLetter: engagementLetterNeeded ? engagementLetterChecked : undefined
          // ```withCredentials: true```
        })
        const updatedTicket = confirmationChangeResponse
        console.log(updatedTicket)
      }

      // 5. declare 'cardUsed' as {cardType, authDotNetTransactionId: transactionId (taken from 'step 3')}
      const cardUsed = {
          cardType: ticketPaymentResponse?.cardType,
          authDotNetTransactionId: ticketPaymentResponse?.transactionId
      }
      console.log(cardUsed)

      // 6. retrieve the data from the previous API call and API call to '/transactions-v2/create' with the body:
                // ticket: ticket._id
                // userId
                // transactionType: 'Client Ticket Fee',
                // toWhom: 'Client',
                // quantity: amount due/ticketPrice
                // cardUsed: (variable you created in previous step)
      const createClientTransactionResponse = await createTransaction({
        ticketId: ticket?._id,
        userId: user?._id,
        ticketPrice: paymentAmount,
        transactionType: 'Client Ticket Fee',
        toWhom: 'Client',
        cardUsed
      })
      console.log(createClientTransactionResponse)

      // 7. retrieve the data from the previous step and API call to '/transactions-v2/create' with the body:
                // ticket (ticket._id)
                // userId: ticket.firmUser._id
                // transactionType: 'Client Income'
                // toWhom: 'Firm',
                // quantity: ticketPrice
      const createFirmTransactionResponse = await createTransaction({
        ticketId: ticket?._id,
        userId: ticket?.firmUser?._id,
        ticketPrice: paymentAmount,
        transactionType: 'Client Income',
        toWhom: 'Firm',
      })
      console.log(createFirmTransactionResponse)
      // f. then reload the page
      location.reload()
    } catch (err) {
      setButtonDisabled(false)
      setIsLoading(false)
      console.error(err)
    }

  }

  const handleTicketConfirmation = async (e) => {
    try {
      const confirmTicketWithDepositResponse = await confirmTicketWithDeposit({
        ticketId: ticket?._id,
        clientId: user?._id,
        agreeToEngagementLetter: true
      })
      console.log(confirmTicketWithDepositResponse)
      location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='px-5 flex flex-col gap-3'>
      {ticket?.missingInformation && ticket?.missingInformation.length ? (
        <div>
          <p>
            {needsPayment ? "You are about to make a payment, but y" : "Y"}ou still have missing documents to submit. Are you sure you want to confirm your file?
          </p>
        </div>
      ) : (
        <div>
          {!ticket?.readyForCpaReview ? (
            <ul className="list-disc">
              <li>Uploaded all source documents</li>
              <li>Added notes for my CPA/EA</li>
            </ul>
          ) : (needsPayment ? (
            <p>Are you sure you are ready to submit this payment? Please confirm that the payment information is correct before submitting.</p>
          ) : (
            <p>Are you sure you want to confirm the selections?</p>
          ))}

          {!ticket?.depositPaid ? (
            <p className='py-4 font-bold text-xl'>AMOUNT DUE: ${paymentAmount || 0}</p>
          ) : ""}

          {/* <label className='text-red-500'>SHOW THIS ON AN ERRORYou cannot send the file until you have filled out all the required fields.</label> */}
        </div>
      )}
      {needsPayment ? (
        <div className='flex justify-center gap-3 flex-col'>
          <Button text="Confirm" functionToRun={handleInitialTicketPayment} secondaryColor={session && session?.whiteLabel?.secondaryColor ? session?.whiteLabel?.secondaryColor : ""} disabled={buttonDisabled} />
          {engagementLetterError && <div className='text-red-500 text-center'>Engagement Letter must be agreed to in order to proceed.</div>}
          {isLoading && <Spinner color="primary"/>}
          {error && <div className='text-red-500 text-center'>{error}</div>}
        </div>
      ) : (
        <Button text="Confirm" functionToRun={handleTicketConfirmation} secondaryColor={session && session?.whiteLabel?.secondaryColor ? session?.whiteLabel?.secondaryColor : ""} disabled={buttonDisabled} />
      )}
    </div>
  )
}
