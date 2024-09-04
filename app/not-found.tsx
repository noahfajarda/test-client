"use client"

import Link from 'next/link'
import React from 'react'

export default function Error() {
  return (
    <div className='flex flex-col items-center gap-3'>
      <h1 className="font-bold text-3xl">This page couldn&apos;t be found</h1>
      <Link href="/tickets?dashboard=true" className='underline'>Return to site</Link>
    </div>
  )
}
