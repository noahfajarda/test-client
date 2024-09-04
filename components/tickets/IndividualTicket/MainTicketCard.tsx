"use client"

import { Card } from '@nextui-org/react';
import TicketStatus from '../TicketStatus';
import NotesSection from './MainSection/NotesSection/NotesSection';
import DocumentsSection from './MainSection/DocumentsSection/DocumentsSection';
import SelectionsSection from './MainSection/SelectionsSection/SelectionsSection';

export default function MainTicketCard({ticket, documentStates, ticketVars, session}) {
  return (
    <Card className='shadow-2xl h-fit w-full lg:col-span-4 col-span-1'>
        <div className="bg-[#F0F0F0] h-24 p-3">
          <table className='w-full h-full'>
            <tbody>
              <tr className='text-left'>
                <th>Filing For</th>
                <th>Tax Form</th>
                <th>Year</th>
                {(ticket?.specQuest && ticket?.specQuest?.dateOfDeath) && <th>Date of Death</th>}
                {(ticket?.specQuest && ticket?.specQuest?.dateOfGift) && <th>Date of Gift</th>}
              </tr>
              <tr>
                <td>{ticket?.filingFor || ticket?.clients.map(client => client.name || 'Pending').join(', ')}</td>
                <td>{ticket?.filingName}</td>
                <td>{ticket?.year ? (ticket?.year === 'fiscal-year' ? ticket?.fiscalYearDate : ticket?.year) : "N/A"}</td>
                {(ticket?.specQuest && ticket?.specQuest?.dateOfDeath) && (
                  <td>
                    {ticket.specQuest?.dateOfDeath?.month}/{ticket.specQuest?.dateOfDeath?.day}/{ticket?.specQuest?.dateOfDeath?.year}
                  </td>
                )}
                {(ticket?.specQuest && ticket?.specQuest?.dateOfGift) && (
                  <td>
                    {ticket?.specQuest?.dateOfGift?.month}/{ticket?.specQuest?.dateOfGift?.day}/{ticket?.specQuest?.dateOfGift?.year}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex flex-col gap-10 p-5'>
          <TicketStatus ticket={ticket} />
          <div className='flex flex-col gap-8'>
            <div className='flex sm:flex-row flex-col gap-10'>
              <SelectionsSection ticket={ticket} />
              <DocumentsSection ticket={ticket} documentStates={documentStates} ticketVars={ticketVars} session={session} />
            </div>
            <NotesSection ticket={ticket} ticketVars={ticketVars}/>
          </div>
        </div>
      </Card>
  )
}
