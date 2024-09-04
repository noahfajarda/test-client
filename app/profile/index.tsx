"use client"

import FileUpload from '@/components/global/FileUpload'
import Loading from '@/components/global/Loading'
import ModalComponent from '@/components/global/Modal'
import ChangePassword from '@/components/profile/ChangePassword'
import MyInfo from '@/components/profile/MyInfo'
import PaymentMethods from '@/components/profile/PaymentMethods'
import { userPfpStore } from '@/hooks/zustand'
import { Card, CardBody, CardHeader, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useReducer, useState } from 'react'

export default function Profile({session, data}: {session: Object; data: Object;}) {
    const zustandPFP = userPfpStore((state: any) => state.profilePicture)
    const zustandUpdatePFP = userPfpStore((state: any) => state.updateProfilePicture)

    const pfpModal = useDisclosure()
    const searchParams = useSearchParams()
    const passChangeSuccess = searchParams.get('passChangeSuccess')
    const paymentMethodAdded = searchParams.get('paymentMethodAdded')
    const paymentMethodChanged = searchParams.get('paymentMethodChanged')
    const profileInfoChanged = searchParams.get('profileInfoChanged')

    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [profilePicture, setProfilePicture] = useState("")
    const [savedCards, setSavedCards] = useState([])
    const [defaultPaymentCard, setDefaultPaymentCard] = useState(null)
    const [myInfo, setMyInfo] = useReducer(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        (state: any, action: any) => ({
            ...state,
            ...action,
            }),
            {
                firstName: "",
                email: "",
                address: "",
                state: "",
                lastName: "",
                phoneNumber: "",
                city: "",
                zipCode: ""
            }
        );
    const [newCardInfo, setNewCardInfo] = useReducer(
        (state: any, action: any) => ({
            ...state,
            ...action,
            }),
            {
                cardNumber: "",
                expiryDate: "",
                cvv: "",
            }
        );
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

    

    useEffect(() => {
        const fetchUser = async () => {
            if (!data?.user) return;

            const {user} = data;
            setUser(user?.user)
            setSavedCards(user?.savedCards?.savedCards)
            setProfilePicture(zustandPFP.profilePicture || user?.user?.profilePicture)

            setMyInfo({ 
                userId: user?.user?._id,
                firstName: user?.user?.name.split(" ")[0],
                email: user?.user?.email,
                address: user?.user?.address.street,
                state: user?.user?.address.state,
                lastName: user?.user?.name.split(" ").slice(-1)[0],
                phoneNumber: user?.user?.phoneNumber,
                city: user?.user?.address.city,
                zipCode: user?.user?.address.zipCode
            })
            const defaultCard = user?.savedCards?.savedCards?.find(card => card.default === true);

            setDefaultPaymentCard(defaultCard || null)
            setSelectedPaymentMethod(defaultCard?.cardId)

            setIsLoading(false)
        }
        fetchUser().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) return <Loading logo={session?.whiteLabel?.logo} />

  return (
    <div className='flex flex-col gap-5 w-full max-w-[1500px]'>
        <div className='w-full'>
            <div className="flex justify-center flex-col">
                <div className='flex items-center gap-5'>
                    <div>
                        <div className='h-32 w-32'>
                            <Image src={profilePicture} alt="profile-picture" className='h-full w-full object-cover rounded-full' width={500} height={500} />
                        </div>
                        <div className='w-fit rounded-full p-1 relative bottom-9 left-24'>
                            <ModalComponent 
                                isIconOnly
                                button={<Image
                                    src="/images/icons/edit-icon.svg"
                                    alt="hide password"
                                    className='h-auto'  
                                    width={20}
                                    height={20}
                                    priority
                                />}
                                header="Update Profile Picture"
                                body={<FileUpload 
                                    type="ProfilePicture" 
                                    clientId={session?.id} 
                                    secondaryColor={session?.whiteLabel?.secondaryColor} 
                                    setProfilePicture={setProfilePicture} 
                                    luminosity={session?.whiteLabel?.secondaryLuminosity}
                                    disclosure={pfpModal}
                                    update={zustandUpdatePFP}
                                />}
                                disclosure={pfpModal}
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                </div>
                {passChangeSuccess === "true" && <div className='flex justify-center text-green-700 py-5'>Password changed successfully.</div>}
                {paymentMethodAdded === "true" && <div className='flex justify-center text-green-700 py-5'>Payment added successfully.</div>}
                {paymentMethodChanged === "true" && <div className='flex justify-center text-green-700 py-5'>Default payment changed successfully.</div>}
                {profileInfoChanged === "true" && <div className='flex justify-center text-green-700 py-5'>Profile Information changed successfully.</div>}
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                    <Card className='p-3 shadow-2xl'>
                        <CardHeader>
                            <div className="flex justify-between w-full">
                                <h1 className="text-2xl font-bold">My Information</h1>
                                <ModalComponent 
                                    isIconOnly
                                    button={<Image
                                        src="/images/icons/edit-icon.svg"
                                        alt="hide password"
                                        className='h-auto'  
                                        width={20}
                                        height={20}
                                        priority
                                    />}
                                    header="Edit My Info"
                                    body={<MyInfo myInfo={myInfo} setMyInfo={setMyInfo} secondaryColor={session?.whiteLabel?.secondaryColor} luminosity={session?.whiteLabel?.secondaryLuminosity} />}
                                />
                            </div>
                        </CardHeader>
                        <CardBody className='flex gap-6'>
                            <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
                                <div className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2">
                                    <h1 className="uppercase font-bold">Basic Info</h1>
                                    <div className="py-5">
                                        <div className='flex flex-col gap-4 py-3'>
                                            <p className="text-gray-500">First Name</p>
                                            <p>{user?.name.split(" ")[0]}</p>
                                        </div>
                                        <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                                        <div className='flex flex-col gap-4 py-3'>
                                            <p className="text-gray-500">Last Name</p>
                                            <p>{user?.name.split(" ").slice(-1)[0]}</p>
                                        </div>
                                        <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                                        <div className='flex flex-col gap-4 py-3'>
                                            <p className="text-gray-500">Email</p>
                                            <p>{user?.email}</p>
                                        </div>
                                        <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                                        <div className='flex flex-col gap-4 py-3'>
                                            <p className="text-gray-500">Phone</p>
                                            <p>{user?.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2">
                                    <h1 className="uppercase font-bold">Address Info</h1>
                                    <div className="py-5">
                                        <div className='flex flex-col gap-4 py-3'>
                                            <p className="text-gray-500">Address</p>
                                            <p>{user?.address.street}</p>
                                        </div>
                                        <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                                        <div className='flex flex-col gap-4 py-3'>
                                            <p className="text-gray-500">City</p>
                                            <p>{user?.address.city}</p>
                                        </div>
                                        <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                                        <div className='flex flex-col gap-4 py-3'>
                                            <p className="text-gray-500">State/Country</p>
                                            <p>{user?.address.state}</p>
                                        </div>
                                        <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                                        <div className='flex flex-col gap-4 py-3'>
                                            <p className="text-gray-500">Zip Code</p>
                                            <p>{user?.address.zipCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className='p-3 shadow-2xl'>
                        <CardHeader>
                            <div className="md:grid md:grid-cols-2 flex flex-col gap-6 w-full">
                                <h1 className="text-xl font-bold">Payment Information</h1>
                                <h1 className="text-xl font-bold">My Information</h1>
                            </div>
                        </CardHeader>
                        <CardBody className='flex gap-6'>
                            <div className="md:grid md:grid-cols-2 flex flex-col gap-6 h-full">
                                <div className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2">
                                    <div className="flex justify-between">
                                        <h1 className="uppercase font-bold">Current Card</h1>
                                        <ModalComponent 
                                            isIconOnly
                                            button={<Image
                                                src="/images/icons/edit-icon.svg"
                                                alt="hide password"
                                                className='h-auto'
                                                width={20}
                                                height={20}
                                                priority
                                            />}
                                            header="Change Default Payment Method"
                                            body={
                                                <PaymentMethods 
                                                    selectedPaymentMethod={selectedPaymentMethod}
                                                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                                                    savedCards={savedCards}
                                                    newCardInfo={newCardInfo}
                                                    setNewCardInfo={setNewCardInfo}
                                                    session={session}
                                                />
                                            }
                                        />
                                    </div>
                                    <div className="py-5">
                                        {(defaultPaymentCard) ? 
                                            <div>
                                                <div className='flex flex-col gap-4 py-3'>
                                                    <p className="text-gray-500">Credit Card</p>
                                                    <p>{defaultPaymentCard?.cardType} ending in {defaultPaymentCard?.lastFourDigits}</p>
                                                </div>
                                                <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700'/>
                                                <div className='flex flex-col gap-4 py-3'>
                                                    <p className="text-gray-500">Exp</p>
                                                    <p>{defaultPaymentCard?.expirationDate?.slice(0, 2)}/{defaultPaymentCard?.expirationDate?.slice(2)}</p>
                                                </div>
                                            </div>
                                        : <p>No default payment method saved.</p>}
                                    </div>
                                </div>
                                <div className="rounded-xl outline outline-2 outline-offset-2 outline-slate-300 p-2">
                                    <div className="flex justify-between">
                                        <h1 className="uppercase font-bold">Change Password</h1>
                                        <ModalComponent 
                                            isIconOnly
                                            button={<Image
                                                src="/images/icons/edit-icon.svg"
                                                alt="hide password"
                                                className='h-auto'
                                                width={20}
                                                height={20}
                                                priority
                                            />}
                                            header="Change Password"
                                            body={<ChangePassword secondaryColor={session?.whiteLabel?.secondaryColor} userId={session?.id} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  )
}
