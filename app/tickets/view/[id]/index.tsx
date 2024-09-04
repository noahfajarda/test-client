"use client"

import Loading from '@/components/global/Loading'
import MainTicketCard from '@/components/tickets/IndividualTicket/MainTicketCard'
import RightColumnTicketCard from '@/components/tickets/IndividualTicket/RightColumnTicketCard'
import { useRouter } from 'next/navigation'
import React, { useEffect, useReducer, useState } from 'react'

export default function TicketView({session, ticketData}) {
    const router = useRouter()

    const [ticket, setTicket] = useState([])
    const [ticketVars, setTicketVars] = useReducer(
      (state, action) => ({
        ...state,
        ...action,
        }),
        {
          authDotNet: {},
          samuelUrl: "",
          stripe: "",
          userId: "",
          user: {}
        }
      );
    const [localVars, setLocalVars] = useReducer(
      (state, action) => ({
        ...state,
        ...action,
        }),
        {
          needsFinalPayment: false,
          returnSubmitted: false,
          needsReturnSubmit: false,
          needsPayment: false,
          paymentAmount: 0,
          needs8879Sign: false
        }
      );
    const [documentStates, setDocumentStates] = useReducer(
      (state, action) => ({
        ...state,
        ...action,
        }),
        {
          filteredDocs: [],
          filteredDocNames: [],
          lateSubmissionDocs: [],
          lateSubmissionDocNames: [],
        }
      );

    useEffect(() => {
        const fetchTicket = async () => {
            const ticket = ticketData;
            if (ticket?.ticket?.err) return router.push("/not-found")
            if (ticket?.ticket?.secondReviewerTicket) return router.push(`/tickets/view/${ticket?.ticket?.secondReviewerTicket}`)

            setTicket(ticket?.ticket)
            setTicketVars({
              authDotNet: ticket?.authDotNet,
              samuelURL: ticket?.samuelURL,
              stripe: ticket?.stripe,
              userId: ticket?.user?._id,
              user: ticket?.user,
            })
          }
        fetchTicket().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      setLocalVars({
        needsFinalPayment: ticket?.status === 'In Review' && (ticket?.pricePaid || 0) < ticket?.price,
        returnSubmitted: ticket?.finalTaxReturn && ticket?.finalTaxReturn?.file && ticket?.finalTaxReturn?.status === 'Sent to Client',
        needsReturnSubmit: ticket?.status === 'In Review' && (!ticket?.finalTaxReturn || (ticket?.finalTaxReturn && ticket?.finalTaxReturn.status !== 'Sent to Client')),
        needsPayment: (!ticket?.depositPaid && ticket?.whiteLabelDepositPercentage !== 0 && ticket?.status === 'New') || (localVars.needsFinalPayment && localVars.returnSubmitted),
        paymentAmount: !ticket?.depositPaid && ticket?.status === 'New' ? Math.floor((ticket?.price || 0) * (ticket?.whiteLabelDepositPercentage ?? 50)/100) : Math.floor(ticket?.price - (ticket?.pricePaid || 0)),
        needs8879Sign: ticket?.agreement8879?.link && ticket?.agreement8879?.link !== 'No e-file' && !ticket?.agreement8879?.agreed
      })
    }, [ticket, localVars.needsFinalPayment, localVars.returnSubmitted])

    useEffect(() => {
      setDocumentStates({
        ...documentStates,
        filteredDocs: ticket?.documents && 
          ticket?.documents?.length ? 
          ticket?.documents?.filter(doc => 
              !doc?.lateSubmission || 
              (doc?.lateSubmission && 
                  doc?.adminApproval?.status === 'Approved' && 
                  doc?.firmUserApproval?.status === 'Approved'
              )).filter(doc => 
                  doc?.docType != "Tax Strategy" || 
                  doc?.uploadedBy?.userType == "FirmUser"
              ) : [],
        lateSubmissionDocs: (
          ticket?.documents && 
          ticket?.documents?.length) ? 
          ticket?.documents?.filter((doc) => {
              return doc?.lateSubmission && 
                  doc?.firmUserApproval?.status !== 'Approved';
              }) : []
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticket])

    useEffect(() => {
      setDocumentStates({
        ...documentStates,
        filteredDocNames: documentStates?.filteredDocs?.reduce((array, data) => {
            if(array.includes(data.docName)) return array;
            array.push(data.docName);
            return array;
        }, []),
        lateSubmissionDocNames: documentStates?.lateSubmissionDocs?.reduce((array, data) => {
            if(array.includes(data.docName)) return array;
            array.push(data.docName);
            return array;
        }, [])
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documentStates.filteredDocs, documentStates.lateSubmissionDocs])

    if (ticket?.length <= 0) return <Loading logo={session?.whiteLabel?.logo} />
  
  return (
    <div className='grid lg:grid-cols-6 grid-cols-1 gap-10 max-w-7xl'>
      <MainTicketCard ticket={ticket} documentStates={documentStates} ticketVars={ticketVars} session={session} />
      <RightColumnTicketCard ticket={ticket} localVars={localVars} authDotNet={ticketVars?.authDotNet} session={session} user={ticketVars?.user} />
    </div>
  )
}
