"use client"

import Button from '@/components/global/Button'
import { forgotPassword } from '@/utils/APIRoutes'
import { validateEmail } from '@/utils/functions'
import { Input, Spinner } from '@nextui-org/react'
import React, { SyntheticEvent, useState } from 'react'

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const handleForgotPassword = async (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)

            if (!email || !validateEmail(email)) {
                setLoading(false)
                return setError("Please enter a valid email address.")
            }
            const response = await forgotPassword({email})
            const {id} = response
            window.location.href = `/resetPassword/${id}`

        } catch (err) {
            console.error(err)
        }
    }
  return (
    <div className='flex flex-col gap-3 w-full'>
        <div className='max-w-[1500px] flex flex-col gap-4'>
            <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
            <div className='flex justify-center'>
                <Input type="text" label="Email" className="max-w-md" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex justify-center'>
                <Button className='w-full max-w-md' text={"Send Reset Link"} functionToRun={handleForgotPassword} />
            </div>
        </div>
        <div className='h-4'>
            <div className="flex flex-col items-center">
                {loading && <Spinner color="primary"/>}
                {error && <div className='text-red-500'>{error}</div>}
            </div>
        </div>
    </div>
  )
}
