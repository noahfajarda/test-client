"use client"

import Button from '@/components/global/Button'
import Loading from '@/components/global/Loading'
import { verifySetPassword, verifyUser } from '@/utils/APIRoutes'
import { Input } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useReducer, useState } from 'react'
import { PatternFormat } from 'react-number-format'

export default function SetPassword() {
    const searchParams = useSearchParams()
    const userId = searchParams.get('user')
    const auth = searchParams.get('auth')

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
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

    
    useEffect(() => {
        const fetchUser = async () => {
            if (auth && userId) {
                const verify = await verifyUser({
                    clientId: userId,
                    encodedAuth: encodeURIComponent(auth)
                })
                console.log(verify)

                if (verify?.err) window.location.href = "/not-found"
                if (verify?.verifiedUser) {
                    setUser(verify?.verifiedUser)
                    setIsLoading(false)
                    // set a cookie
                    setMyInfo({ 
                        userId: verify?.verifiedUser?._id,
                        firstName: verify?.verifiedUser?.name?.split(" ")[0] && "",
                        email: verify?.verifiedUser?.email,
                        address: verify?.verifiedUser?.address?.street,
                        state: verify?.verifiedUser?.address?.state,
                        lastName: verify?.verifiedUser?.name?.split(" ").slice(-1)[0] && "",
                        phoneNumber: verify?.verifiedUser?.phoneNumber,
                        city: verify?.verifiedUser?.address?.city,
                        zipCode: verify?.verifiedUser?.address?.zipCode
                    })
                }
            }
        }
        fetchUser().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updatePassword = async (e) => {
        try {
            e.preventDefault()
            setError("")

            // check if passwords match
            if (myInfo.setPassword !== myInfo.confirmPassword) return setError("New Passwords do not match.")

            // check if it meets criteria
            // at least 6 characters         r"^.{6,}$".test(s)
            if (!/^.{6,}$/.test(myInfo.setPassword)) return setError("Password must contain at least 6 characters.");
            // one capital                  /[A-Z]/.test(s);
            if (!/[A-Z]/.test(myInfo.setPassword)) return setError("Password must contain a capital letter.")
            // one special                  [!@#$%^&*(),.?":{}|<>].test(s)
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(myInfo.setPassword)) return setError("Password must contain a special character.")

            const {address, state, city, zipCode} = myInfo

            const response = await verifySetPassword({
                password: myInfo.setPassword, 
                clientId: userId, 
                firstName: myInfo.firstName, 
                lastName: myInfo.lastName, 
                phoneNumber: myInfo.phoneNumber, 
                address: {
                    street: address,
                    city,
                    zipCode,
                    state
                }
            })
            console.log(response)

        } catch (err) {
            console.error(err)
        }
    }

    if (isLoading) return <Loading/>

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
                <Button text={"Set Password"} functionToRun={updatePassword} />
                <div className='flex justify-center'>{error && <div className='text-red-500'>{error}</div>}</div>
            </div>
        </div>
    )
}
