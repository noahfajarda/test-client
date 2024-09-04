"use client"

import Link from 'next/link';
import React from 'react'

export default function RenderNavOptions({session}: {session: object;}) {
    const options = session ? [
            {text: "Home", link: "/tickets?dashboard=true"},
            {text: "My Profile", link: "/profile"},
        ] : []

    return (
        <div className='flex lg:flex-row flex-col gap-4'>
            {options.map((option, idx) => {
                return <Link href={option.link} key={idx} className="uppercase">{option.text}</Link>
            })}
        </div>
    )
}
