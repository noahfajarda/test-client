"use client"

import { Input, Spinner } from '@nextui-org/react'
import React, { useReducer, useState } from 'react'
import Button from '../global/Button';
import { editPassword, resetPassword } from '@/utils/APIRoutes';
import Image from 'next/image';
import { resetPasswordValidation } from '@/utils/functions';

export default function ChangePassword({secondaryColor, userId}) {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [password, setPassword] = useReducer(
        (state, action) => ({
            ...state,
            ...action,
            }),
            {
                currentPass: "",
                newPass: "",
                confirm: "",
            }
        );

    const [hidePassword, sethidePassword] = useReducer(
        (state, action) => ({
            ...state,
            ...action,
            }),
            {
                currentPass: true,
                newPass: true,
                confirm: true,
            }
        );

        const updatePassword = async (e) => {
            try {
                e.preventDefault()
                setError("")
                setIsLoading(true)

                const {currentPass, newPass, confirm} = password;

                if (!currentPass || !newPass) {
                    setIsLoading(false)
                    return setError("Please enter your current password and new password.")
                }
                
                if (!confirm) {
                    setIsLoading(false)
                    return setError("Please enter confirm your new password.")
                }

                // check if passwords match
                if (newPass !== confirm) {
                    setIsLoading(false)
                    return setError("New passwords do not match.")
                }

                if (!resetPasswordValidation({
                    password: newPass, 
                    setError, 
                    setIsLoading
                })) return;

                const editPasswordResponse = await editPassword({
                    oldPassword: currentPass,
                    password: newPass, 
                    confirmPassword: confirm, 
                    clientId: userId
                })
                console.log(editPasswordResponse)
                if (editPasswordResponse?.err) {
                    setIsLoading(false)
                    return setError(editPasswordResponse?.err)
                }
                
                const resetPasswordResponse = await resetPassword({
                    password: newPass,
                    clientId: userId
                })
                console.log(resetPasswordResponse)
                window.location.href = "/profile?passChangeSuccess=true"
            } catch (err) {
                console.error(err)
            }
        }

  return (
    <div className='flex flex-col gap-8'>
    <div className='flex flex-col gap-5'>
        <div>
            <span className='h-5 w-5 absolute top-[5.7rem] right-10 z-10 hover:cursor-pointer' onClick={() => sethidePassword({ currentPass: !hidePassword.currentPass })}>
                {hidePassword.currentPass ? (
                    <Image
                        src="/images/icons/eye-crossed-icon-bg.png"
                        alt="hide password"
                        className='h-auto'
                        width={40}
                        height={40}
                        priority
                        />
                    ) : (
                    <Image
                        src="/images/icons/eye-icon.png"
                        alt="hide password"
                        className='h-auto'
                        width={40}
                        height={40}
                        priority
                    />
                )}
            </span>
            <Input type={hidePassword.currentPass ? "password" : "text"} label="Current Password" value={password?.currentPass} onChange={(e) => setPassword({ currentPass: e.target.value })}/>
        </div>
        <div>
            <span className='h-5 w-5 absolute top-[10.4rem] right-10 z-10 hover:cursor-pointer' onClick={() => sethidePassword({ newPass: !hidePassword.newPass })}>
                {hidePassword.newPass ? (
                    <Image
                    src="/images/icons/eye-crossed-icon-bg.png"
                    alt="hide password"
                    className='h-auto'
                    width={40}
                    height={40}
                    priority
                    />
                ) : (
                    <Image
                    src="/images/icons/eye-icon.png"
                    alt="hide password"
                    className='h-auto'
                    width={40}
                    height={40}
                    priority
                    />
                )}
            </span>
            <Input autoComplete='' type={hidePassword.newPass ? "password" : "text"} label="New Password" value={password?.newPass} onChange={(e) => setPassword({ newPass: e.target.value })} />
        </div>
        <div>
            <span className='h-5 w-5 absolute top-[15.2rem] right-10 z-10 hover:cursor-pointer' onClick={() => sethidePassword({ confirm: !hidePassword.confirm })}>
                {hidePassword.confirm ? (
                    <Image
                        src="/images/icons/eye-crossed-icon-bg.png"
                        alt="hide password"
                        className='h-auto'
                        width={40}
                        height={40}
                        priority
                    />
                ) : (
                    <Image
                        src="/images/icons/eye-icon.png"
                        alt="hide password"
                        className='h-auto'
                        width={40}
                        height={40}
                        priority
                    />
                )}
            </span>
            <Input type={hidePassword.confirm ? "password" : "text"} label="Confirm New Password" value={password?.confirm} onChange={(e) => setPassword({ confirm: e.target.value })} />
        </div>
    </div>
    <div className='flex justify-center'>
      <Button text="Save" className='!px-20' functionToRun={updatePassword} secondaryColor={secondaryColor} disabled={isLoading ? true : false} />
    </div>
    <div>
        {isLoading && (
            <div className='flex justify-center'>
                <Spinner color="primary"/>
            </div>
        )}
        {error && <p className="text-red-400 text-center">{error}</p>}
    </div>
  </div>
  )
}
