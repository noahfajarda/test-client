"use client"

import Button from '@/components/global/Button';
import { resetPassword, resetPasswordCode } from '@/utils/APIRoutes';
import { resetPasswordValidation } from '@/utils/functions';
import { Input, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react'

export default function ResetPassword({id} : {id: string;}) {
  const [code, setCode] = useState("")
  const [newPass, setNewPass] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleSubmit = async (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()

    try {
      setError("")
      setIsLoading(true)
      setIsDisabled(true)

      if (!code) {
        setIsLoading(false)
        setIsDisabled(false)
        return setError("Please enter the code sent to your email.")
      }

      if (!resetPasswordValidation({
        password: newPass, 
        setError, 
        setIsLoading
      })) return setIsDisabled(false);

      console.log(code, newPass)

      const codeResponse = await resetPasswordCode({
        password: newPass,
        clientId: id,
        resetCode: code
      })
      console.log(codeResponse)
      if (codeResponse?.err) {
        setIsDisabled(false)
        setIsLoading(false)
        return setError(codeResponse?.err)
      }
      const resetResponse = await resetPassword({
        password: newPass,
        clientId: id,
      })
      console.log(resetResponse)
      if (resetResponse?.err) {
        setIsDisabled(false)
        setIsLoading(false)
        return setError(resetResponse.err.message)
      }
      window.location.href = "/login"
    } catch (err) {
      setIsLoading(false)
      setIsDisabled(false)
      console.error(err)
    }
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='max-w-[1500px] flex flex-col gap-4'>
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <h1 className="text-lg font-bold text-center">Check your email for a verification code!</h1>
        <div className='flex flex-col items-center gap-3'>
          <Input type="text" label="Code" value={code} onChange={(e) => setCode(e.target.value)} className="max-w-md"  />
          <Input type={hidePassword ? "password" : "text"} label="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className='max-w-md' />
          <div className='relative h-0 bottom-[50px] left-[190px] hover:cursor-pointer' onClick={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <Image
                src="/images/icons/eye-crossed-icon-bg.png"
                alt="hide password"
                className='h-auto'
                width={25}
                height={25}
                priority
              />
            ) : (
              <Image
                src="/images/icons/eye-icon.png"
                alt="hide password"
                className='h-auto'
                width={25}
                height={25}
                priority
              />
            )}
          </div>
          <Button text={"Reset Password"} className='w-full max-w-md' functionToRun={handleSubmit} disabled={isDisabled} />
        </div>
      </div>
      <div className='h-4 flex flex-col items-center'>
        {isLoading && <Spinner color="primary"/>}
        {error && <div className='text-red-500'>{error}</div>}
      </div>
    </div>
  )
}
