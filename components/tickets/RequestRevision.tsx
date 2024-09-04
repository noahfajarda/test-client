"use client"

import { Spinner, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import Button from '../global/Button'
import { addNotesToFirm, rejectReturn } from '@/utils/APIRoutes'

export default function RequestRevision({ticket, session, user}) {
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

    const sendBackToRevision = async (e) => {
        e.preventDefault()
        try {
          setButtonDisabled(true)
          setIsLoading(true)
          const rejectReturnResponse = await rejectReturn({
              ticketId: ticket?._id,
              clientId: user?._id,
              clientName: ticket?.clientName
          })
          console.log(rejectReturnResponse)

          // add the note to reject the return
          const addNote = await addNotesToFirm({
              note,
              ticketId: ticket?._id,
              clientId: user?._id,
          })
          console.log(addNote)
          location.reload()
        } catch (err) {
          console.error(err)
          setButtonDisabled(false)
          setIsLoading(false)
        }
    }


  return (
    <div className='flex flex-col gap-5'>
        <p>Are you sure you want to send this return back for a revision? This will require that the firm attaches a new return and may increase your fee.</p>
        <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-lg'>Reason for revision:</h2>
            <Textarea minRows={6} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <Button text="Send Back" className='w-full' secondaryColor={session?.whiteLabel?.secondaryColor} functionToRun={sendBackToRevision} disabled={buttonDisabled} />
        <div className='flex justify-center'>
          {isLoading && <Spinner color="primary"/>}
        </div>
    </div>
  )
}
