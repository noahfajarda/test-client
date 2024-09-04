"use client"

import { editProfilePicture, uploadDocument } from '@/utils/APIRoutes'
import React, { useRef, useState } from 'react'
import Button from './Button';
import { Spinner } from '@nextui-org/react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function FileUpload({type, clientId, ticketId, category, secondaryColor, setProfilePicture, docName, luminosity, disclosure, update}: {type: "Document" | "ProfilePicture", clientId?: string; ticketId?: string; category?: string; secondaryColor?: string; docName?: string; luminosity?: boolean;}) {
    const [files, setFiles] = useState()
    const hiddenFileInput = useRef(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleChange = (e) => {
        if (type === "Document") setFiles(e.target.files)
        if (type === "ProfilePicture") setFiles(e.target.files[0])
    }

    const showError = (errorMessage: string) => {
        setIsLoading(false)
        setButtonDisabled(false)
        return setError(errorMessage)
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            setError("")
            setButtonDisabled(true)

            const formData = new FormData();
            const maxFileSize = 50 * 1024 * 1024; // Maximum file size in bytes (e.g., 2 MB)

            // List of disallowed file types
            const disallowedTypes = ['exe', 'bat', 'sh'];

            if (type === "Document" && clientId && ticketId) {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].size > maxFileSize) {
                        return showError("A file has exceeded the max file size (50MB). Please try again.")
                    }

                    const fileType = files[i].name.split('.').pop().toLowerCase();
                    if (disallowedTypes.includes(fileType)) {
                        return showError("You have uploaded a file that is not allowed. Please try again.")
                    }

                    formData.append(`file-${i}`, files[i])
                }
                await uploadDocument({formData, docName: category ? category : "Additional Documents", clientId, ticketId})
                location.reload();
            }
            
            if (type === "ProfilePicture" && clientId) {
                if (files.size > maxFileSize) {
                    return showError("Your profile picture has exceeded the max file size (50MB). Please try again.")
                }

                const fileType = files.name.split('.').pop().toLowerCase();
                if (disallowedTypes.includes(fileType)) {
                    return showError("You have uploaded a file that is not allowed. Please try again.")
                }

                formData.append('file', files)
                const res = await editProfilePicture({formData, clientId})
                if (res?.success) {
                    setProfilePicture(res?.pic)
                    setIsLoading(false)
                    setButtonDisabled(false)
                    toast.success("Profile Picture Changed!")
                    setFiles(undefined)
                    update({
                        profilePicture: res?.pic
                    })
                    disclosure.onClose()
                }
            } 
        } catch (err) {
            showError("Something Went Wrong.")
        }
    }

    const handleClick = (event) => {
        hiddenFileInput?.current?.click();
    };

    return (
        <div className='flex justify-between flex-col gap-3'>
            <button onClick={handleClick} tabIndex={-1}>
                <div className="bg-gray-300 hover:bg-neutral-300 text-black hover:invert transition-all rounded-xl h-60 flex flex-col gap-3 justify-center items-center">
                    <Image
                        src="/images/icons/upload-icon.svg"
                        alt="upload"
                        className='h-auto'
                        width={30}
                        height={30}
                        priority
                    />
                    <p>{docName ? `Upload ${docName}` : (type === "ProfilePicture" ? "Upload New Profile Picture" : "Upload file(s)")}</p>
                </div>
            </button>
            <input className='hidden' multiple={type === "ProfilePicture" ? false : true} type="file" accept={type === "ProfilePicture" ? "image/png, image/jpeg" : ""} id="file-upload" name="docInput" ref={hiddenFileInput} onChange={handleChange} required/>
            
            {files && (
                <div className='flex flex-col gap-5'>
                    <div className='text-center'>
                        <h1 className='font-bold text-2xl underline'>File(s) selected for upload</h1>
                        {type === "ProfilePicture" ? (
                            <p>{files.name}</p>
                        ) : (
                            <div>
                                {Array.from(files).map((file, idx) => <p key={idx}>{file.name}</p>)}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-4 items-center justify-center'>
                        <Button functionToRun={handleSubmit} text="Submit" disabled={buttonDisabled} secondaryColor={secondaryColor} luminosity={luminosity} />
                        {error && <div className='flex justify-center'><div className='text-red-500'>{error}</div></div>}
                        {isLoading && (
                            <div className='flex justify-center'>
                                <Spinner color="primary"/>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
