import { getSession, logout } from '@/utils/auth';
import React from 'react'
import NavbarContents from './NavbarContents';

export default async function Navbar() {
  const session = await getSession();

  const handleLogout = async () => {
    'use server'
    await logout()
  }
  
  return (
    <div>
      {process.env.MESSAGE_DISPLAY && (<div className='h-12 bg-zinc-400 flex justify-center items-center gap-1 xs:text-sm'>Message:<span className='text-slate-200'>{process.env.MESSAGE_DISPLAY}</span></div>)}
      <NavbarContents session={session} handleLogout={handleLogout} />
    </div>
  )
}
