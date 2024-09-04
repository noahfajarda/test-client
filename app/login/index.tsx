"use client"

import Button from "@/components/global/Button";
import Loading from "@/components/global/Loading";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { loginUser } from "@/utils/APIRoutes";
import { validateEmail } from "@/utils/functions";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";

export default function Login({firmBranding}: {firmBranding: {logo?: string; secondaryColor?: string;}}) {
  const mediaQuery = useMediaQuery(1023)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hidePassword, setHidePassword] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [pageLoad, setPageLoad] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleLogIn = async (e: SyntheticEvent<Element, Event>) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      setError("")
      setIsDisabled(true)

      // check if it's a valid email
      if (!validateEmail(email)) {
        setIsLoading(false)
        setIsDisabled(false)
        return setError("Invalid Email")
      }

      // check if password was inputted
      if (!password) {
        setIsLoading(false)
        setIsDisabled(false)
        return setError("Please Enter Your Password")
      }
      
      const formData = new FormData();
      formData.append("email", email)
      formData.append("password", password)

      const response = await loginUser({
        formData
      })
      if (response?.err) {
        setIsLoading(false)
        setIsDisabled(false)
        return setError(response?.err)
      }
    } catch (err) {
      setIsDisabled(false)
      console.error(err)
    }
  }

  useEffect(() => {
    setPageLoad(false)
  }, [])

  if (pageLoad) return <Loading logo={firmBranding?.logo} />

  if (mediaQuery) {
    return (
      <div className={`h-fit w-screen bg-[url('/images/login-bg.png')] bg-center bg-cover rounded-[30px] flex flex-col p-10 gap-5`}>
        <div className="flex flex-col gap-5 items-center">
          <Image
              src={firmBranding?.logo ? firmBranding?.logo : "/images/logo-white.svg"}
              alt="Firm Logo"
              className={firmBranding?.logo ? "" : "invert"}
              height={firmBranding?.logo ? 200 : 300}
              width={firmBranding?.logo ? 200 : 300}
              priority
          />
          <h1 className="uppercase sm:text-left text-center text-4xl font-semibold">Welcome Client</h1>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="uppercase text-2xl font-semibold">Log In</h1>
          <form className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <p className="font-bold">Email</p>
              <input name="email" type="email" placeholder="Email" className="text-black p-1 rounded outline outline-1" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <p className="font-bold">Password</p>
              <div className="flex w-full gap-3 text-black rounded outline outline-1 bg-white">
                <input name="password" type={hidePassword ? 'password' : 'text'} placeholder="Password" className="p-1 w-full" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="flex justify-center items-center px-3">
                  <span className='hover:cursor-pointer' onClick={() => setHidePassword(!hidePassword)}>
                      {hidePassword ? (
                        <Image
                          src="/images/icons/eye-crossed-icon-bg.png"
                          alt="hide password"
                          className='h-6 w-auto'
                          width={40}
                          height={40}
                          priority
                        />
                      ) : (
                        <Image
                          src="/images/icons/eye-icon.png"
                          alt="hide password"
                          className='h-6 w-auto'
                          width={40}
                          height={40}
                          priority
                        />
                      )}
                  </span>
                </div>
              </div>
            </div>
            <Button text="Log In" functionToRun={handleLogIn} disabled={isDisabled} secondaryColor={firmBranding?.secondaryColor ? firmBranding?.secondaryColor : ""} />
            <Link href="/forgotPassword" className="inline hover:text-slate-400 transition-all">Forgot Password</Link>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-center'>{error && <div className='text-red-500'>{error}</div>}</div>
                {isLoading && (
                    <div className='flex justify-center'>
                        <Spinner color="primary"/>
                    </div>
                )}
            </div>
            <a href="https://www.mysamcloud.com" className='hover:text-sky-400 text-sky-600 text-md transition-all text-center underline'>Back to SAM Website</a>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className={`h-[600px] max-w-[1200px] m-auto bg-[url('/images/login-bg.png')] bg-center bg-cover rounded-[30px] flex`}>
      <div className={`h-[600px] bg-white w-[350px] rounded-[30px] shadow-2xl px-12 py-28 flex flex-col gap-3`}>
        <h1 className="uppercase text-2xl font-semibold">Log In</h1>
        <form className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Email</p>
            <input type="text" name="email" autoComplete="email" className='outline outline-2 outline-offset-2 outline-slate-300 w-full rounded p-1' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Password</p>
            <div className='flex justify-between outline outline-2 outline-offset-2 outline-slate-300 w-full rounded p-1 gap-3'>
            <input type={hidePassword ? 'password' : 'text'} className='focus:outline-none w-full p-1' value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className="flex justify-center items-center hover:cursor-pointer" onClick={() => setHidePassword(!hidePassword)}>
                <div className="h-6 w-6">
                  {hidePassword ? (
                    <Image
                      src="/images/icons/eye-crossed-icon.png"
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
                </div>
              </div>
            </div>
          </div>
          <Link href="/forgotPassword" className="inline hover:text-slate-400 transition-all text-end">Forgot Password</Link>
          <Button text="Log In" functionToRun={handleLogIn} disabled={isDisabled} secondaryColor={firmBranding?.secondaryColor ? firmBranding?.secondaryColor : ""} />
          <div className='flex flex-col gap-3'>
                <div className='flex justify-center items-center'>{error && <div className='text-red-500 text-center'>{error}</div>}</div>
                {isLoading && (
                    <div className='flex justify-center'>
                        <Spinner color="primary"/>
                    </div>
                )}
            </div>
          <a href="https://www.mysamcloud.com" className='hover:text-sky-400 text-sky-600 text-md transition-all text-center underline'>Back to SAM Website</a>
        </form>
      </div>
      <div className='flex items-left p-20 flex-col gap-10 justify-start'>
        <Image
          src={firmBranding?.logo ? firmBranding?.logo : "/images/logo-black.svg"}
          alt="Firm Logo"
          height={firmBranding?.logo ? 200 : 400}
          width={firmBranding?.logo ? 200 : 400}
          priority
        />
        <h1 className="uppercase text-left text-5xl font-semibold">Welcome Client</h1>
      </div>
    </div>
  )
}
