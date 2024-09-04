"use client"

import Button from '@/components/global/Button'
import { Input } from '@nextui-org/react'
import React, { useReducer, useState } from 'react'
import { PatternFormat } from 'react-number-format'

export default function VerifyUser() {
  const [myInfo, setMyInfo] = useReducer(
    (state, action) => ({
        ...state,
        ...action,
        }),
        {
            firstName: "",
            email: "",
            address: "",
            state: "",
            lastName: "",
            phoneNumber: "",
            city: "",
            zipCode: "",
            setPassword: "",
            confirmPassword: ""
        }
    );
    const [error, setError] = useState("")

  return (
    <div className='flex flex-col gap-5 w-full max-w-[1500px] text-center items-center'>
            <h1 className="text-3xl font-bold">Thank you for verifying your email</h1>
            <h3 className="text-xl font-bold">Please confirm your information and set a new password for your account</h3>

            <div className='flex sm:flex-row flex-col gap-3 lg:w-1/2 md:w-3/4 w-full'>
                <div className='flex flex-col sm:w-1/2 w-full gap-5'>
                    <Input type="text" label="First Name" value={myInfo?.firstName} onChange={(e) => setMyInfo({ firstName: e.target.value })} />
                    <Input type="text" label="Email" value={myInfo?.email} disabled />
                    <Input type="text" label="Address" value={myInfo?.address} onChange={(e) => setMyInfo({ address: e.target.value })} />
                    <Input type="text" label="State" value={myInfo?.state} onChange={(e) => setMyInfo({ state: e.target.value })} />
                    <Input type="password" label="Set Password" value={myInfo?.setPassword} onChange={(e) => setMyInfo({ setPassword: e.target.value })} />
                </div>
                <div className='flex flex-col sm:w-1/2 w-full gap-5'>
                    <Input type="text" label="Last Name" value={myInfo?.lastName} onChange={(e) => setMyInfo({ lastName: e.target.value })} />
                    {/* check if value has an underscore before submittting to api */}
                    <div className="flex justify-center items-center h-14">
                        <PatternFormat label="Phone Number" value={myInfo?.phoneNumber} onChange={(e) => setMyInfo({ phoneNumber: e.target.value })} format="###-###-####" allowEmptyFormatting mask="_" customInput={Input} />
                    </div>
                    <Input type="text" label="City" value={myInfo?.city} onChange={(e) => setMyInfo({ city: e.target.value })} />
                    <Input type="number" label="Zip Code" value={myInfo?.zipCode} onChange={(e) => setMyInfo({ zipCode: e.target.value })} />
                    <Input type="password" label="Confirm Password" value={myInfo?.confirmPassword} onChange={(e) => setMyInfo({ confirmPassword: e.target.value })} />
                </div>
            </div>

            <div className='flex flex-col gap-5 w-2/5'>
                <Button text={"Set Password"} />
                <div className='flex justify-center'>{error && <div className='text-red-500'>{error}</div>}</div>
            </div>
        </div>
  )
}
