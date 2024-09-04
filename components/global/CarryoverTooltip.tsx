import { addCommas } from '@/utils/functions'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

export default function CarryoverTooltip({carryovers}: {carryovers: Array<object>}) {
  return (
    <Tooltip content={
        <div className='flex flex-col w-full'>
            {carryovers.map(({carryforward, carryoverType}, idx) => (
                <span key={idx} className='flex justify-between font-bold'>
                    <span>{carryoverType || 'No type given'}</span>
                    <span>${addCommas(carryforward)}</span>
                </span>
            ))}
        </div>
        } placement='bottom-end'
        closeDelay={10}
        classNames={{
            content: [
                "p-2 w-64"
            ],
        }}
    >
        <Image src="/images/icons/icon-info.svg" alt="info" width={30} height={30} />
    </Tooltip>
  )
}
