"use client"

import Link from 'next/link'
import React, { useEffect, useReducer } from 'react'
import RenderNavOptions from './RenderNavOptions'
import { getFirmBranding } from '@/utils/APIRoutes'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function NavbarContents({session, handleLogout}) {
  const searchParams = useSearchParams()
  const firmId = searchParams.get('firmId')
  const [whiteLabel, setWhiteLabel] = useReducer(
    (state, action) => ({
        ...state,
        ...action,
        }),
        {
            logo: "",
            primaryColor: "",
            secondaryColor: ""
        }
    );
  
  useEffect(() => {
    const fetchFirm = async () => {
      if (firmId) {
        const firmBranding = await getFirmBranding({firmId})
        const {primaryColor, secondaryColor, logo} = firmBranding;
        setWhiteLabel({
          logo,
          primaryColor,
          secondaryColor
        })
      }
    }
    fetchFirm().catch(err => console.error(err))
  }, [firmId])

  const headerStyle = {
    backgroundColor: session && session?.whiteLabel?.primaryColor ? session?.whiteLabel?.primaryColor : (whiteLabel?.primaryColor ? whiteLabel?.primaryColor : 'black'),
    color: session && session?.whiteLabel?.luminosity ? "black" : "white",
    borderBottom: session && session?.whiteLabel?.luminosity ? "solid" : ""
  }

  return (
    <div>
      <header style={headerStyle} className="flex justify-center items-center">
        <div className='flex lg:flex-row flex-col justify-between lg:items-end items-center max-w-[1300px] m-auto w-full p-5 pb-0 gap-3'>
          <div>
            <Link href="/tickets" className='flex'>
              <div className="w-56 h-36 relative flex justify-start items-center">
                <Image 
                  src={session && session?.whiteLabel?.logo ? session?.whiteLabel?.logo : (whiteLabel?.logo ? whiteLabel?.logo : "/images/logo-white.svg")} 
                  alt="Firm Logo" fill className='object-contain object-left-bottom'
                />
              </div>
              {/* <Image src={session && session?.whiteLabel?.logo ? session?.whiteLabel?.logo : (whiteLabel?.logo ? whiteLabel?.logo : "/images/logo-white.svg")} alt="Firm Logo" className='w-auto' width={20} height={20} /> */}
            </Link>
          </div>
          <nav className={`text-lg font-bold flex gap-4 lg:flex-row flex-col lg:text-left text-center uppercase ${session?.whiteLabel?.primaryLuminosity ? "text-black" : "text-white"}`}>
            {/* render navbar options component */}
            <RenderNavOptions session={session} />
            {session && (
              <form action={handleLogout}>
                <button type="submit" className='uppercase'>Log Out</button>
              </form>
            )}
          </nav>
        </div>
      </header>
    </div>
  )
}
