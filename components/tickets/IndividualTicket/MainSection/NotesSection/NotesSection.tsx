"use client"

import Button from '@/components/global/Button';
import { addNotesToFirm } from '@/utils/APIRoutes';
import { formatDateTime } from '@/utils/functions';
import { button, Spinner, Textarea } from '@nextui-org/react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function NotesSection({ticket, ticketVars}) {
  const [note, setNote] = useState("")
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [clientNotes, setClientNotes] = useState(ticket?.clientNotes)

  const handleNoteSubmit = async () => {
    try {
        setError("")
        setIsLoading(true)
        setButtonDisabled(true)
        if (note.length <= 0) {
            setIsLoading(false)
            setButtonDisabled(false)
            return setError("Please Enter A Valid Note.")
        }
        const response = await addNotesToFirm({note, ticketId: ticket?._id, clientId: ticketVars?.user?._id});
        if (response.success === true) {
            console.log(response?.notes)
            setClientNotes(response?.notes)
            setIsLoading(false)
            setButtonDisabled(false)
            setNote("")
            toast.success("Comment Added!")
        }
    } catch (err) {
        console.error(err)
        setError("There was an error. Please try again.")
        setIsLoading(false)
        setButtonDisabled(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2 w-full min-h-48">
        {ticket?.notesToClient && ticket?.notesToClient.length ? (
        <div>
            <h1 className="font-bold">Comments From Firm</h1>
            {ticket?.notesToClient.map((note, idx) => (
            <div key={idx}>
                {note.note}
                {note.addedOn}
            </div>
            ))}
        </div>
        ) : ""}
        {clientNotes && clientNotes.length ? (
        <div>
            <h1 className="font-bold">My Comments</h1>
            <div className="flex flex-col py-2">
            {clientNotes.map((note, idx) => (
                <div key={idx} className='flex flex-col gap-2'>
                <p className='text-sm'>{note.note}</p>
                <p className='text-xs'>{note?.addedBy?.name}, {note?.addedOn && formatDateTime(note?.addedOn).formattedDate}, {note?.addedOn && formatDateTime(note?.addedOn, true).formattedTime}</p>
                {idx < clientNotes.length - 1 ? 
                    <div className="py-2">
                        <hr className=''/>
                    </div>
                : ""}
                </div>
            ))}
            </div>
        </div>
        ) : ""}
        <div className='flex flex-col gap-5 w-full min-h-48'>
            <h1 className="font-bold">Add Notes To Firm</h1>
            <Textarea minRows={6} value={note} onChange={(e) => {
                setError("")
                setNote(e.target.value)}
            } />
            <div className="flex gap-6 w-full items-center">
                <Button text="Send Note" style="light" functionToRun={handleNoteSubmit} className='hover:text-white hover:bg-black duration-150 transition-all' disabled={buttonDisabled} />
                {loading && <Spinner color="primary"/>}
                {error && <div className='text-red-500'>{error}</div>}
            </div>
        </div>
    </div>
  )
}
