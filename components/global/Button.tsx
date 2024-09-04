"use client"

import { darkenColor, lightenColor } from '@/utils/functions';
import Link from 'next/link'
import React, { useState } from 'react'

export default function Button({text, link, style, functionToRun, className, targetBlank, secondaryColor, disabled, luminosity}: {text: string; link?: string; style?: string; functionToRun?: (e: React.SyntheticEvent) => void; className?: string; targetBlank?: boolean; secondaryColor?: string; disabled?: boolean; luminosity?: boolean;}) {
  // just in case outline is wanted:  outline outline-2 outline-black
  const buttonClasses = `bg-[#5C94CA] hover:bg-slate-100 ${disabled && "bg-[#92BFE0] hover:bg-slate-300"} ${luminosity ? "text-black" : "text-white"} ${!secondaryColor && `${luminosity ? "hover:text-white" : "hover:text-black"}`} transition-all`
  const lightButtonClasses = `bg-white hover:bg-black ${disabled && "bg-[#dbdbdb] hover:bg-slate-300"} text-black hover:text-white hover:outline-offset-0 transition-all outline outline-2 outline-offset-2 outline-black`

  const generalClasses = `${style === "light" ? lightButtonClasses : buttonClasses} ${className} rounded-xl font-bold uppercase px-5 py-2 text-center ${luminosity && "outline outline-2 outline-offset-2 outline-black"}`

  // states
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const buttonStyle = {
    backgroundColor: secondaryColor ? luminosity ? 
    (!isHovered ? secondaryColor : darkenColor({color: secondaryColor, percent: 20})) : 
    (!isHovered ? secondaryColor : lightenColor({color: secondaryColor, percent: 20})) : '',
    transition: 'background 0.3s',
  };

  if (targetBlank && link) return <Link style={{backgroundColor: secondaryColor ? secondaryColor : ''}} target='_blank' href={link} className={generalClasses}>{text}</Link>
  if (link) return <Link href={link} className={generalClasses} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{text}</Link>
  if (functionToRun) return <button className={generalClasses} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={functionToRun} disabled={disabled ? true : false}>{text}</button>
  return <button className={generalClasses} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} disabled={disabled ? true : false}>{text}</button>
}
