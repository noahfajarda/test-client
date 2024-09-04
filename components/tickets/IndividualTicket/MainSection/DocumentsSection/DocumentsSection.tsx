import FileUpload from '@/components/global/FileUpload';
import ModalComponent from '@/components/global/Modal';
import Image from 'next/image';
import React from 'react'

export default function DocumentsSection({ticket, documentStates, ticketVars, session}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2 sm:w-1/2 w-full min-h-48">
        <div className='flex flex-col gap-3'>
            <h1 className="font-bold">Documents</h1>
            {(documentStates?.filteredDocs && documentStates?.filteredDocs.length > 0) && (documentStates?.filteredDocNames && documentStates.filteredDocNames.length > 0) ?
                <div className='flex flex-col gap-5'>
                {documentStates?.filteredDocNames.map((docName, idx) => {
                    const groupedDocs = documentStates?.filteredDocs.filter(data => data.docName === docName);
                    return (
                    <div key={idx} className='flex flex-col gap-2'>
                        <h5 className="text-sm font-bold">{docName.replace(/_/g, ' ')}</h5>
                        <div className="flex flex-col gap-3">
                        {groupedDocs.map((doc, idx) => (
                            <a key={idx} target="_blank" href={doc?.url} id={doc} className="flex text-wrap break-all justify-between gap-3 rounded-lg outline outline-1 outline-offset-2 outline-slate-300 p-1 px-3 w-full hover:cursor-pointer hover:bg-gray-300 transition-all">
                                <p className='text-wrap break-all'>{doc.docName}</p>
                            </a>
                        ))}
                        </div>
                    </div>
                    )
                })}
                </div>
            : (<ul><li>None found</li></ul>)
            }
        </div>
        {/* try to get this to show up */}
        {(ticket?.status !== "Complete" && (ticket?.missingInformation && ticket?.missingInformation.length)) ? (
            <div className='flex flex-col gap-2'>
            <h5 className="text-sm font-bold">Missing Documents</h5>
            {ticket?.missingInformation.map((doc, idx) => (
                <div key={idx}>
                    <ModalComponent
                    isIconOnly={false}
                    button={
                        <div className="flex justify-between gap-3 rounded-lg outline outline-1 outline-offset-2 outline-slate-300 p-3 w-full hover:cursor-pointer hover:bg-gray-300 transition-all">
                            <p>{doc}</p>
                            <p className="underline">Add</p>
                        </div>
                    }
                    header="Upload Documents"
                    body={
                        <div className='text-black flex flex-col gap-2'>
                            <p>(MAX 10 DOCUMENTS PER FIELD)</p>
                            <FileUpload type='Document' clientId={ticketVars?.user?._id} ticketId={ticket?._id} category={doc} secondaryColor={session?.whiteLabel?.secondaryColor} docName={doc} />
                        </div>
                    }
                    />
                </div>
            ))}
            </div>
        ) : ""}
        {ticket?.status !== 'Complete' && (
            <div className='flex flex-col gap-3'>
                <h1 className="font-bold">Add Additional Documents</h1>
                {(documentStates?.lateSubmissionDocs && documentStates?.lateSubmissionDocs?.length) ? (
                    <div>
                        {documentStates?.lateSubmissionDocNames.map((docName, idx) => {
                            const groupedDocs = documentStates?.lateSubmissionDocs?.filter(data => data.docName === docName);
                            return (
                            <div key={idx}>
                                {groupedDocs.map(doc => (
                                <div key={doc.id}>
                                    {doc?.firmUserApproval?.status !== 'Pending' && doc?.firmUserApproval?.status !== 'Declined' && doc?.adminApproval?.status !== 'Declined' ?
                                    <a target="_blank" href={doc?.url} id={doc}>{doc?.fileName}</a> : 
                                    (doc?.firmUserApproval?.status === 'Declined' || doc?.adminApproval?.status === 'Declined' ?
                                    <p className="flex text-gray-400 justify-between gap-3 rounded-lg outline outline-1 outline-offset-2 outline-slate-300 p-1 px-3 w-full hover:cursor-pointer hover:bg-gray-300 transition-all">
                                        {doc.fileName} <span className='text-red-500'>(Declined)</span>
                                    </p> :
                                    <p className="flex text-gray-400 justify-between gap-3 rounded-lg outline outline-1 outline-offset-2 outline-slate-300 p-1 px-3 w-full hover:cursor-pointer hover:bg-gray-300 transition-all">
                                        {doc.fileName} (Pending Approval)
                                    </p>
                                    )}
                                </div>
                                ))}
                            </div>
                            )
                        })}
                    </div>
                ) : ""}
                <div>
                    <ModalComponent
                        isIconOnly={false}
                        button={
                            <div className="flex justify-between gap-3 rounded-lg outline outline-1 outline-offset-2 outline-slate-300 p-3 w-full hover:cursor-pointer hover:bg-gray-300 transition-all">
                                <p>Additional Documents</p>
                                <div className='flex gap-1'>
                                    <Image
                                        src="/images/add.svg"
                                        alt="Firm Logo"
                                        height={25}
                                        width={25}
                                        priority
                                    />
                                    <p className="underline">Add</p>
                                </div>
                            </div>
                        }
                        header="Upload Documents"
                        body={
                            <div className='text-black flex flex-col gap-2'>
                                <p>(MAX 10 DOCUMENTS PER FIELD)</p>
                                <FileUpload type='Document' clientId={ticketVars?.user?._id} ticketId={ticket?._id} secondaryColor={session?.whiteLabel?.secondaryColor} />
                            </div>
                        }
                    />
                </div>
            </div>
        )}
    </div>
  )
}
