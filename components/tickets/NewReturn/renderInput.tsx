import ModalComponent from "@/components/global/Modal";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Checkbox, CheckboxGroup, DatePicker, Input, Select, SelectItem } from "@nextui-org/react"

const retrieveQuestionStateVars = ({prev, state, question}) => {
    const newState = [...prev];
    const questionState = state.find((property) => property?.id === question?.id)
    const currentStateIndex = state.indexOf(questionState);
    return {newState, questionState, currentStateIndex}
  }

export const renderInput = ({question, idx, state, setState, errorSelections}) => {
    const individualState = state.find((property) => property?.id === question?.id)

    if (question?.type === "date") {
      return (
        <div key={idx} className='flex flex-col'>
          <div className="flex items-center justify-between">
            <h2 className='font-bold text-black'>{question?.label}</h2>
            <DatePicker className="max-w-[320px]" label="Date" variant='bordered' size="sm" value={individualState?.value} minValue={question?.allInputClass.includes("due-date") ? today(getLocalTimeZone()).add({days: Number(question?.allInputClass.replace("due-date-", "").replace("days", ""))}) : undefined} maxValue={question?.allInputClass === "past-date-restriction" ? today(getLocalTimeZone()).subtract({days: Number(question?.allInputClass.replace("due-date-", "").replace("days", "")) + 1}) : undefined} onChange={(date) => setState((prev) => {
                  const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                  newState[currentStateIndex] = {...questionState, value: date}
                  return newState
            })} />
          </div>
          {(errorSelections && (individualState?.value == null || individualState?.value == "") && individualState?.required) && (
            <div className="text-red-500">This field is required.</div>
          )}
        </div>
      )
    }

    if (question?.type === "checkbox") {
      return (
        <div key={idx}>
          <div className="inline-flex justify-between gap-3 items-center">
            <Checkbox value="own-home" classNames={{base: "py-3", wrapper: "text-white", label: "inline-flex gap-1 text-[#6E6E73]"}} size="md" color="success"
            isSelected={individualState?.value === 'on' ? true : false} 
            onValueChange={() => setState((prev) => {
                    const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                    newState[currentStateIndex] = {...questionState, value: individualState?.value === 'on' ? '' : 'on', otherInput: {...questionState?.otherInput, value: individualState?.value === 'on' ? questionState?.otherInput?.value : ""}}
                    return newState
            })}>{question?.label} 
            </Checkbox>
            {question?.additionalInfoPopup && (
              <ModalComponent 
                size="5xl"
                isIconOnly={false}
                button={
                  <p className="underline text-blue-400 cursor-pointer">More Info</p>
                }
                header={question?.additionalInfoPopup?.linkText}
                body={<div dangerouslySetInnerHTML={{ __html: question?.additionalInfoPopup?.content }}></div>}
              />
            )}
          </div>
          {(errorSelections && (individualState?.value == null || individualState?.value == "") && individualState?.required) && (
            <div className="text-red-500">This field is required.</div>
          )}
          {question?.opensInput && individualState?.value === 'on' && (
            <div>
              <Input type="number" label="Enter Quantity" value={individualState?.otherInput?.value} onChange={(e) => {
                setState((prev) => {
                  const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                  newState[currentStateIndex] = {...questionState, otherInput: {id: question?.opensInput?.extraInputId, value: e.target.value}}
                  return newState
                })
              }} />
              {(errorSelections && (individualState?.otherInput?.value == null || individualState?.otherInput?.value == "") && individualState?.required) && (
                <div className="text-red-500">This field is required.</div>
              )}
            </div>
          )}
        </div>
      )
    }
    
    if (question?.type === "select") {
      return (
        <div key={idx} className="flex flex-col gap-3">
          <div className='flex justify-between items-center'>
            <h2 className='font-bold text-black'>{question?.label}</h2>
            <Select
              selectionMode='single'
              placeholder="Please Select"
              className="max-w-xs"
              size="sm"
              variant='bordered'
              aria-label='filing-status'
              selectedKeys={[individualState ? individualState.value : ""]}
              onChange={(e) => {
                setState((prev) => {
                  const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                  newState[currentStateIndex] = {...questionState, value: e.target.value == "$.0" ? "" : e.target.value}
                  return newState
                })
              }}
              required
            >
              {question?.options?.map((option) => (
                <SelectItem key={option?.optionValue} className='text-black' textValue={option?.optionLabel}>
                    {option?.optionLabel}
                </SelectItem>
              ))}
            </Select>
          </div>
          {question?.options?.map((option, idx) => {
            if ((option?.optionValue == individualState?.value) && (option?.optionOpensInput)) {
              // check if option?.optionOpensInput is an array or an object
              if (Array.isArray(option?.optionOpensInput)) {
                return (
                  <div className="flex flex-col gap-2" key={option?.optionValue}>
                    {option?.optionOpensInput.map((option, idx) => {
                      if (option?.optionOpenedType === "date") {
                        return  (
                          <div key={idx} className='flex flex-col'>
                            <div className="flex items-center justify-between">
                              <h2 className='font-bold text-black'>{option?.optionOpenedLabel}</h2>
                              <DatePicker className="max-w-[320px]" label="Date" variant='bordered' size="sm" value={individualState?.otherInput[idx].value} onChange={(date) => setState((prev) => {
                                    const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                                    questionState.otherInput.find(obj => obj.id === individualState?.otherInput[idx].id).value = date
                                    newState[currentStateIndex] = {...questionState, otherInput: questionState.otherInput}
                                    return newState
                              })} />
                            </div>
                          </div>
                        )
                      }
                      if (option?.optionOpenedType === "text") {
                        return (
                          <div key={idx} className="flex flex-col gap-2">
                            <div className='flex justify-between items-center'>
                              <h2 className='font-bold text-black'>{option?.optionOpenedLabel}</h2>
                              <div className="w-full flex justify-end">
                                <Input type="text" value={individualState?.otherInput[idx].value} className="max-w-[320px]" onChange={(e) => {
                                  setState((prev) => {
                                    const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                                    questionState.otherInput.find(obj => obj.id === individualState?.otherInput[idx].id).value = e.target.value
                                    newState[currentStateIndex] = {...questionState, otherInput: questionState.otherInput}
                                    return newState
                                  })
                                }} />
                              </div>
                            </div>
                            {(errorSelections && (individualState?.value == null || individualState?.value == "") && individualState?.required) && (
                              <div className="text-red-500">This field is required.</div>
                            )}
                          </div>
                        )
                      }
                    })}
                  </div>
                )
                
              }
              return <Input type="text" key={idx} label={option?.optionOpensInput?.optionOpenedLabel} value={individualState?.otherInput?.value} onChange={(e) => {
                setState((prev) => {
                  const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                  newState[currentStateIndex] = {...questionState, otherInput: {id: option?.optionOpensInput?.optionOpenedId, value: e.target.value}}
                  return newState
                })
              }} />
            }
          })}
          {(errorSelections && (individualState?.value == null || individualState?.value == "") && individualState?.required) && (
            <div className="text-red-500">This field is required.</div>
          )}
      </div>
      )
    }

    if (question?.type === "text") {
      return (
        <div className="flex flex-col gap-2">
          <div key={idx} className='flex justify-between items-center'>
            <h2 className='font-bold text-black'>{question?.label}</h2>
            <div className="w-full flex justify-end">
              <Input type="text" value={individualState?.value} className="max-w-[320px]" onChange={(e) => {
                setState((prev) => {
                  const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                  newState[currentStateIndex] = {...questionState, value: e.target.value}
                  return newState
                })
              }} />
            </div>
          </div>
          {(errorSelections && (individualState?.value == null || individualState?.value == "") && individualState?.required) && (
            <div className="text-red-500">This field is required.</div>
          )}
        </div>
      )
    }

    if (question?.type === "multi-checkbox") {
      return (
        <div key={idx}>
          <h2 className='font-bold text-black'>{question?.label}</h2>
          <CheckboxGroup
            color="success"
            value={individualState?.value}
            onValueChange={(selected) => {
              setState((prev) => {
                const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                newState[currentStateIndex] = {...questionState, value: selected}
                return newState
              })
            }}
          >
            {question?.options?.map((option) => (
              <Checkbox key={option?.optionValue} classNames={{wrapper: "text-white"}} className='text-black' value={option?.optionValue}>
                  {option?.optionLabel}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      )
    }

    if (question?.type === "number") {
      return (
        <div key={idx} className='flex flex-col '>
          <div className="flex justify-between items-center">
            <h2 className='font-bold text-black'>{question?.label}</h2>
            <Input type="number" className="max-w-[320px]" value={individualState?.value} onChange={(e) => {
              setState((prev) => {
                const {newState, questionState, currentStateIndex} = retrieveQuestionStateVars({prev, state, question})
                newState[currentStateIndex] = {...questionState, value: e.target.value}
                return newState
              })
            }} />
          </div>
          {(errorSelections && (individualState?.value == null || individualState?.value == "") && individualState?.required) && (
            <div className="text-red-500">This field is required.</div>
          )}
        </div>
      )
    }

    return (
      <div key={idx}>Unknown Input</div>
    )
  }