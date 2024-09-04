import Image from 'next/image'
import React from 'react'

export default function Loading({logo}) {
  return (
    <div className='animate-pulse w-60'>
        <Image
            src={logo ? logo : "/images/logo-black.svg"}
            alt="hide password"
            className='h-auto w-full'
            sizes='300px'
            width={0}
            height={0}
            priority
        />
    </div>
  )
}
