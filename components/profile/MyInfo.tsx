"use client"

import { Input, Select, SelectItem, Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import { PatternFormat } from 'react-number-format';
import Button from '../global/Button';
import { updateClientInfo } from '@/utils/APIRoutes';
import { usStateAbbreviations } from '@/utils/constants';

export default function MyInfo({myInfo, setMyInfo, secondaryColor, luminosity}: {myInfo: object; session: object; luminosity: boolean}) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const updateInfo = async () => {
    try {
      setError("")
      setIsDisabled(true)
      setIsLoading(true)
      if (!myInfo?.firstName || !myInfo?.lastName || !myInfo?.phoneNumber || !myInfo?.address || !myInfo?.city || !myInfo?.zipCode || !myInfo?.state) {
        setIsLoading(false)
        setIsDisabled(false)
        return setError("Please enter all fields and try again.")
      }
      if (myInfo?.phoneNumber.includes("_")) {
        setIsLoading(false)
        setIsDisabled(false)
        return setError("Please enter a valid phone number.")
      }
      const formInputs = {
        name: `${myInfo?.firstName} ${myInfo?.lastName}`,
        phoneNumber: myInfo?.phoneNumber,
        address: {
          street: myInfo?.address,
          city: myInfo?.city,
          zipCode: myInfo?.zipCode,
          state: myInfo?.state
        }
      }

      await updateClientInfo({clientId: myInfo?.userId, formInputs})
      window.location.href = "/profile?profileInfoChanged=true"
    } catch (err) {
      console.error(err)
      setIsDisabled(false)
      setError("Something Went Wrong! Please Try Again!")
    }

  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex sm:flex-row flex-col gap-3'>
        <div className='flex flex-col sm:w-1/2 w-full gap-5'>
          <Input type="text" label="First Name" value={myInfo?.firstName} onChange={(e) => setMyInfo({ firstName: e.target.value })} required />
          <Input type="text" label="Email" value={myInfo?.email} onChange={(e) => setMyInfo({ email: e.target.value })} isDisabled required />
          <Input type="text" label="Address" value={myInfo?.address} onChange={(e) => setMyInfo({ address: e.target.value })} required />
          <Select
            selectionMode='single'
            label="State"
            placeholder="Please Select"
            size="md"
            selectedKeys={[myInfo?.state]}
            onChange={(e) => setMyInfo({ state: e.target.value })}
            required
          >
            {usStateAbbreviations.map(option => (
              <SelectItem key={option} className='text-black' textValue={option}>
                  {option}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className='flex flex-col sm:w-1/2 w-full gap-5'>
          <Input type="text" label="Last Name" value={myInfo?.lastName} onChange={(e) => setMyInfo({ lastName: e.target.value })} required />
          {/* check if value has an underscore before submittting to api */}
          <div className="flex justify-center items-center h-14">
            <PatternFormat label="Phone Number" value={myInfo?.phoneNumber} onChange={(e) => setMyInfo({ phoneNumber: e.target.value })} format="###-###-####" allowEmptyFormatting mask="_" customInput={Input} required />
          </div>
          <Input type="text" label="City" value={myInfo?.city} onChange={(e) => setMyInfo({ city: e.target.value })} required />
          <Input type="number" label="Zip Code" value={myInfo?.zipCode} onChange={(e) => setMyInfo({ zipCode: e.target.value })} required />
        </div>
      </div>
      <div className='flex justify-center'>
        <Button text="Save" className='!px-20' functionToRun={updateInfo} secondaryColor={secondaryColor} disabled={isDisabled} luminosity={luminosity} />
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
