"use client"

import { getTicketSelections } from '@/utils/ticketSelections'
import { Checkbox, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ModalComponent from '@/components/global/Modal';
import { createTicket } from '@/utils/APIRoutes';
import { useRouter } from 'next/navigation';
import { renderInput } from './renderInput';
import Button from '@/components/global/Button';

export default function NewReturnForm({filingName, category, engagementLetters, user, secondaryColor, luminosity, errorStates}: {filingName: string; category: string; engagementLetters: object; user: object; secondaryColor: string; luminosity: boolean; errorStates: Array<any>;}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
  
    const [ticketSelections, setTicketSelections] = useState({})
    const [col1Questions, setCol1Questions] = useState([])
    const [col2Questions, setCol2Questions] = useState([])
    const [agreeToEngagementLetter, setAgreeToEngagementLetter] = useState(false)

    const [errorSelections, setErrorSelections, engagementLetterError, setEngagementLetterError] = errorStates;

    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        setTicketSelections(getTicketSelections(filingName))
        setAgreeToEngagementLetter(false)
    },[filingName])

    const generateInput = (selection) => {
      let finalState = {};

      // select type
      if (selection?.type === "select") {
        const inputState = selection.options.find((option) => option.optionOpensInput)
        // if there's an option in a selection that has an 'optionOpensInput'
        if (inputState) {
          if (Array.isArray(inputState?.optionOpensInput)) {
            const otherInput = inputState.optionOpensInput.map((input) => {
              if (input?.optionOpenedType === "date") {
                return {id: input?.optionOpenedId, value: null}
              }
              return {id: input?.optionOpenedId, value: ""};
            })
            finalState = {id: selection?.id, value: "", otherInput}
          } else {
            finalState = {id: selection?.id, value: "", otherInput: {id: inputState.optionOpensInput.optionOpenedId, value: ""}}
          }
          if (selection?.required) {
            finalState.required = true
          }
          return finalState
        }
      }
      // checkbox type
      if (selection?.type === "checkbox" && selection?.opensInput) {
        finalState = {id: selection?.id, value: "", otherInput: {id: selection?.opensInput.extraInputId, value: ""}}
        if (selection?.required) {
          finalState.required = true
          finalState.otherInput.required = true
        }
        return finalState
      }
      // date type
      if (selection?.type === "date") {
        finalState = {id: selection?.id, value: null}
        if (selection?.required) {
          finalState.required = true
        }
        return finalState
      }
      // multi-checkbox type
      if (selection?.type === "multi-checkbox") {
        finalState = {id: selection?.id, value: []}
        if (selection?.required) {
          finalState.required = true
        }
        return finalState
      }
      
      // anything else
      finalState = {id: selection?.id, value: ""}
      if (selection?.required) {
        finalState.required = true
      }
      return finalState
    }

    useEffect(() => {
      setCol1Questions(ticketSelections.hasOwnProperty('col1') ? (
        ticketSelections?.col1?.map((selection) => generateInput(selection))
      ) : [])
      setCol2Questions(ticketSelections.hasOwnProperty('col2') ? (
        ticketSelections?.col2?.map((selection) => generateInput(selection))
      ) : [])
    }, [ticketSelections])

    const handleSubmit = async () => {
      setIsDisabled(true)
      setIsLoading(true)
      setErrorSelections(false)
      setEngagementLetterError(false)
      let hasError = false;
      const ticketSelections = {
        firmId: user?.firm?._id,
        // change this eventually, should be advisory service
        filingType: filingName === "Tax Planning" || filingName === "Wealth Management" ? filingName : category,
        filingName,
        whiteLabelClient: user?._id,
        whiteLabelTicket: 'true'
      }

      col1Questions.map((question) => {
        // if question is requird, but doesn't have a value, show an error
        if (question?.required && !question?.value) {
          hasError = true
          setErrorSelections(true)
        }
        // if question has a value
        if (question.value) {
          // if question.value is a DATE (i.e. date of gift), make sure the value is valid
          if (typeof question.value === "object" && !Array.isArray(question.value)) {
            return ticketSelections[question.id] = question.value.toString();
          }
          // set property in final obj to the value
          return ticketSelections[question.id] = question.value;
        }
      })
      col1Questions.map((question) => {
        if (question?.otherInput) {
          // check if 'otherInput' is an array
          if (Array.isArray(question?.otherInput) && question?.otherInput.length > 0) {
            question?.otherInput.map((otherInputIdx) => {
              // check if 'otherInput' has multiple valid values
              if (typeof otherInputIdx.value === "object" && !Array.isArray(otherInputIdx.value)) {
                if (!otherInputIdx?.value) return
                return ticketSelections[otherInputIdx?.id] = otherInputIdx?.value.toString();
              }
              return ticketSelections[otherInputIdx?.id] = otherInputIdx?.value
            })
          }
          // set value of 'otherInput' in final obj
          if (question?.otherInput?.value) {
            return ticketSelections[question.otherInput.id] = question?.otherInput?.value;
          }
        }
      })
      col2Questions.map((question) => {
        if (question?.required && !question?.value) {
          hasError = true
          setErrorSelections(true)
        }
        if (question.value) {
          if (typeof question.value === "object" && !Array.isArray(question.value)) {
            return ticketSelections[question.id] = question.value.toString();
          }
          return ticketSelections[question.id] = question.value;
        }
      })
      col2Questions.map((question) => {
        if (question?.otherInput) {
          if (Array.isArray(question?.otherInput) && question?.otherInput.length > 0) {
            question?.otherInput.map((otherInputIdx) => {
              if (typeof otherInputIdx.value === "object" && !Array.isArray(otherInputIdx.value)) {
                return ticketSelections[otherInputIdx?.id] = otherInputIdx?.value.toString();
              }
              return ticketSelections[otherInputIdx?.id] = otherInputIdx?.value
            })
          }
          if (question?.otherInput?.value) {
            return ticketSelections[question.otherInput.id] = question?.otherInput?.value;
          }
        }
      })

      if (engagementLetters[filingName]) {
        if (!agreeToEngagementLetter) {
          hasError = true
          console.log("Engagement letter not agreed to")
          setEngagementLetterError(true)
          setIsLoading(false)
          setIsDisabled(false)
          return
        }
        ticketSelections["agreeToEngagementLetter"] = "true"
      }

      if (hasError) {
        setIsLoading(false)
        setIsDisabled(false)
        return
      }


      const response = await createTicket({ticketSelections, firmId: ticketSelections.firmId})
      const newTicketId = response?.ticket?._id
      router.push(`/tickets/view/${newTicketId}`)

      return false
    }


  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <div className="flex flex-col gap-3">
          {ticketSelections?.col1?.map((question, idx) => renderInput({question, idx, state: col1Questions, setState: setCol1Questions, errorSelections}))}
        </div>
        <div className="flex flex-col gap-3">
          {ticketSelections?.col2?.length > 0 && <p className="font-bold text-xl">Select Any That Applies To You</p>}
          {ticketSelections?.col2?.map((question, idx) => renderInput({question, idx, state: col2Questions, setState: setCol2Questions, errorSelections}))}
        </div>
      </div>

      {engagementLetters[filingName] && (
        <div>
          <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
          <div className="py-5 flex flex-col gap-5">
            <h2 className='text-xl font-bold'>Please Sign The Engagement Letter</h2>
            <div className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-5 flex flex-col gap-3">
              <h2 className='font-bold'>Engagement Letter</h2>
              <p className='text-[#6E6E73]'>Please sign the engagement letter to confirm your agreement with the outlined terms.</p>
              <div className="flex justify-center">
                <ModalComponent
                    isIconOnly={false}
                    button={<Button text='View' style='light'/>}
                    header="Edit My Info"
                    body={
                      <div className='text-black'>engagement Letter for {filingName}: {engagementLetters[filingName]}</div>
                    }
                />
              </div>
            </div>

            <Checkbox value="engagement-letter" color="success" classNames={{base: "py-3"}} size="md" isSelected={agreeToEngagementLetter} onValueChange={(val) => {
                setAgreeToEngagementLetter(val)
                setEngagementLetterError(false)
            }}> 
              <p className='text-[#6E6E73]'>I have read the engagement letter and agree to the terms outlined.</p>
            </Checkbox>
            {engagementLetterError && <div className='text-red-500'>This field is required.</div>}
          </div>
        </div>
      )}
      <div className="flex justify-center py-3">
        <ModalComponent
          isIconOnly={false}
          button={
            <Button text="SUBMIT" secondaryColor={secondaryColor} luminosity={luminosity} />
          }
          header="Are you ready to send your ticket?"
          body={
            <div className='text-black flex flex-col gap-5 items-center'>
              <p>Please double check all your selections and make sure they are right before proceeding!</p>
              <Button functionToRun={handleSubmit} text="PROCEED!" secondaryColor={secondaryColor} disabled={isDisabled} luminosity={luminosity} />
              <div className='flex flex-col gap-3'>
                {isLoading && (
                  <div className='flex justify-center'>
                    <Spinner color="primary"/>
                  </div>
                )}
                {(engagementLetterError || errorSelections) && <p className='text-red-500 text-center'>There are one or more errors with your selections. Please double check and try again.</p>}
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
