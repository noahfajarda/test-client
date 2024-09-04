"use client"

import Loading from '@/components/global/Loading'
import NextUITabsStyling from '@/components/global/Next-UI-Tabs-Styling';
import NewReturnForm from '@/components/tickets/NewReturn/NewReturnForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { menuTabs } from '@/utils/constants';
import { Tabs, Tab, Tooltip, Card } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function NewReturn({session, userData}: {session: Object; userData: Object;}) {
  const category = useSearchParams().get('category')
  const title = useSearchParams().get('title')

  const mediaQuery = useMediaQuery(1200)
  const [user, setUser] = useState([])
  const [engagementLetters, setEngagementLetters] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const [selected, setSelected] = useState();
  const [selectedKey, setSelectedKey] = useState()

  const [errorSelections, setErrorSelections] = useState(false)
  const [engagementLetterError, setEngagementLetterError] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const user = userData
      setUser(user?.user)
      setEngagementLetters(user?.user?.firm?.engagementLetters ? user?.user?.firm?.engagementLetters : [])
      setSelected(category ? category : "Individual")
      setSelectedKey(title ? title : "Individual")
      setIsLoading(false)
    }
    fetchUser().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <Loading logo={session?.whiteLabel?.logo} />

  return (
    <div className='w-full flex flex-col gap-3 lg:h-[1900px] md:h-[2500px] h-fit'>
      <Card className='p-5'>
        <h1 className="font-bold uppercase text-2xl">Create Ticket</h1>
        <div className="py-5">
          <hr className='h-0.5 bg-slate-200 border-0'/>
        </div>
        <NextUITabsStyling session={session} />
        <div className="py-5">
          <Tabs aria-label="Options" className='flex justify-center items-center w-full' size="lg" fullWidth={true} selectedKey={selected} onSelectionChange={(sec) => {
              setErrorSelections(false)
              setEngagementLetterError(false)
              setSelected(sec)
            }} isVertical={mediaQuery} classNames={{
              tabList: "w-full relative rounded-none p-0 border-1 border-divider rounded-xl shadow-black shadow-lg shadow-gray-300 bg-white",
              cursor: "w-full bg-[#5C94CA]",
              tabContent: "group-data-[selected=true]:text-white"
            }}
          >
            {menuTabs.map((option) => (
              <Tab key={option.filingType} title={option.filingType.toUpperCase()} className='py-7 px-12 font-bold'>
              </Tab>
            ))}
          </Tabs>
        </div>
        <div className="py-5">
          <hr className='h-0.5 bg-slate-200 border-0'/>
        </div>
        <div className="py-2">
          {/* sub-tabs */}
          {menuTabs.map((option, idx) => {
            if (selected === option.filingType) {
              return (
                <div key={idx}>
                  <Tabs variant="underlined" aria-label="Tabs variants" selectedKey={selectedKey} onSelectionChange={(sec) => {
                    setErrorSelections(false)
                    setEngagementLetterError(false)
                    setSelectedKey(sec)
                  }} isVertical={mediaQuery} classNames={{
                    base: `w-full`,
                    tabList: `w-full flex gap-3`,
                    cursor: "bg-[#5C94CA]",
                  }}>
                    {option.items.map((item) => (
                      <Tab key={item.filingTitle} title={
                        <div className='flex gap-2'>
                          <div>{item.filingTitle}</div>
                          {item?.dropdownInfo && (
                          <Tooltip content={item?.dropdownInfo} placement='bottom-start'
                          closeDelay={10}
                          classNames={{
                            base: [
                              // arrow color
                              "before:bg-neutral-400 dark:before:bg-white max-w-80",
                            ],
                            content: [
                              "py-2 px-4 shadow-xl",
                              "text-black bg-slate-50",
                            ],
                          }}
                          >
                            {'>'}
                          </Tooltip>
                          )}
                        </div>
                        } className='font-bold'>
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              )
            }
          })}
        </div>
        <div className="py-5">
          <hr className='h-0.5 bg-slate-200 border-0'/>
        </div>
        <NewReturnForm 
          filingName={menuTabs.find(tab => tab.filingType === selected)?.items.find(item => item.filingTitle === selectedKey)?.filingName || ""}
          engagementLetters={engagementLetters}
          category={menuTabs.find(tab => tab.filingType === selected)?.filingType || ""}
          user={user}
          secondaryColor={session?.whiteLabel?.secondaryColor}
          luminosity={session?.whiteLabel?.secondaryLuminosity}
          errorStates={[errorSelections, setErrorSelections, engagementLetterError, setEngagementLetterError]}
        />
      </Card>
    </div>
  )
}
