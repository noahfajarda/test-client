"use server"

import { login } from "./auth";
import { url } from "./constants";

const makeSAMRequest = async ({endpoint, method, body}: {endpoint: string; method: string; body?: object}) => {
    endpoint = endpoint.slice(1)
    try {
        const response = await fetch(`${url}${endpoint}`, {
            method,
            body: body ? JSON.stringify(body) : JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify({ authToken: "AUTH TOKEN NOT NECESSARY" }),
            },
        })
        console.log(endpoint)
        const result = await response.json()
        return result;
    } catch (err) {
        console.log(err)
    }
}

export const userMiddleware = async ({clientId, paymentInfo}: {clientId: string; paymentInfo?: boolean;}) => {
    const user = await getUser({clientId})
    const savedCards = await getPaymentInformation({clientId})

    // API CALL NEEDS TO RUN ONLY WHEN NECESSARY
    // let savedCards = <Object>[];
    // if (paymentInfo) ({savedCards} = await getPaymentInformation({clientId}))
    const samuelURL = process.env.API_URL || 'https://api.mysamadmin.com/';

    return {user, savedCards, samuelURL}
}


export async function logInClient({email, password}: {email: string; password: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/login',
            method: 'POST',
            body: {email, password}
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function clientIsLoggedIn({userId}: {userId: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/clients/isLoggedIn',
            method: 'POST',
            body: {userId}
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function updateClientInfo({clientId, formInputs}: {clientId: string; formInputs: object;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/clients/update',
            method: 'POST',
            body: {
                section: "personalInfo",
                user: {"_id": clientId},
                userId: clientId,
                ...formInputs
            }
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function getUserTickets({id}: {id: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/retrieve',
            method: 'POST',
            body: {query: {clients: {$in: id}}}
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function getRecentTicketType({id, type}: {id: string; type: "1040" | "Estate Planning" | "Tax Planning";}) {
    let body;
    switch (type) {
        case '1040':
            body = {
                query: {
                    filingName:'1040',
                    clients: {$in: id},
                  },
                  projection: {
                    year:1,
                    carryovers:1
                  },
                  limit:1,
                  sort:{
                    _id:-1
                  }
                }
            break;
        case 'Estate Planning':
            body = {
                query: {
                    filingName:'Estate Planning',
                    clients: {$in: id},
                  },
                  projection: {
                    createdAt:1
                  },
                  limit:1,
                  sort:{
                    _id:-1,
                  }
                }
            break;
        case 'Tax Planning':
            body = {
                query: {
                    filingName:'Tax Planning',
                    clients: {$in: id},
                  },
                  projection: {
                    year:1,
                  },
                  limit:1,
                  sort:{
                    _id:-1
                  }
                }
            break;
        
    }
    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/retrieve',
            method: 'POST',
            body
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function addNotesToFirm({note, ticketId, clientId}: {note: string; ticketId: string; clientId: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/addNote',
            method: 'POST',
            body: {note, ticketId, clientId}
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function getUser({clientId}: {clientId: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/clients/isLoggedIn',
            method: 'POST',
            body: {userId: clientId}
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function addNewCard({clientId, cardNumber, expiry, cardCode, isNewCard}: {clientId: string; cardNumber: string; expiry: string; cardCode: string; isNewCard: boolean}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/authorizeDotNet/customers/addNewCard',
            method: 'POST',
            body: {
                user: {
                    "_id": clientId
                },
                cardNumber,
                expiry,
                cardCode,
                isNewCard
            }
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function changeDefaultPayment({cardId, clientId}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/authorizeDotNet/customers/addNewCard',
            method: 'POST',
            body: {
                user: {
                    "_id": clientId
                },
                isNewCard: false,
                cardId
            }
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function getPaymentInformation({clientId}: {clientId: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/authorizeDotNet/customers/getPaymentInformation',
            method: 'POST',
            body: {user: {_id: clientId}}
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function getTicket({clientId, ticketId}: {clientId: string; ticketId: string | string[];}) {
    try {
        const {user, savedCards, samuelURL} = await userMiddleware({clientId})

        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/retrieve',
            method: 'POST',
            body: {
                _id: ticketId,
                client: {
                    "_id": clientId
                }
            }
        })
        return {user, authDotNet: {savedCards}, ticket: result, samuelURL}
    } catch (err) {
        console.log(err)
    }
}

export async function uploadDocument({formData, docName, clientId, ticketId}: {formData: any; docName: string; clientId: string; ticketId: string;}) {
    const files = []
    
    for (const pair of formData.entries()) {
        const file = pair[1];
        const {size, type, name} = file;
        const bytes = await pair[1].arrayBuffer();
        const buffer = Buffer.from(bytes)

        files.push({
            fieldName: "Additional Documents",
            originalname: name,
            encoding: '7bit',
            mimetype: type,
            buffer,
            size
        })
    }

    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/documents/upload',
            method: 'POST',
            body: {
                ticketId: ticketId,
                files,
                user: {
                    id: clientId
                },
                userType: 'firm',
                lateSubmission: false,
                // category of document
                docName
            }
        })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

export async function getFirmBranding({firmId}: {firmId: string | string[];}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/cpa/getFirmBranding',
            method: 'POST',
            body: {firmId}
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function editProfilePicture({formData, clientId}: {formData: any; clientId: string;}) {
    const {size, type, name} = formData.get('file');
    const bytes = await formData.get('file').arrayBuffer();
    const buffer = Buffer.from(bytes)

    const profilePicture = {
            fieldname: "Profile Picture",
            originalname: name,
            encoding: '7bit',
            mimetype: type,
            buffer,
            size,
        }
    

    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/clients/update',
            method: 'POST',
            body: {
                userId: clientId,
                user: {
                    "_id": clientId
                },
                section: "profilePicture",
                profilePicture
            }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function createTicket({ticketSelections, firmId}: {ticketSelections: object; firmId: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/createTicket',
            method: 'POST',
            body: {
                ...ticketSelections,
                firmId,
                requestedBy: "client"
            }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function confirmTicket({ticketId, clientId, agreeToEngagementLetter}: {ticketId: string; clientId: string; agreeToEngagementLetter: boolean;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/changeConfirmation',
            method: 'POST',
            body: {
                _id: ticketId,
                clientId: clientId,
                confirmedBy: "client",
                readyForCpaReview: true,
                depositPaid: true,
                agreeToEngagementLetter,
            }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function ticketPayment({clientId, quantity, cardNumber, expiry, cardCode, isNewCard, cardId}: {clientId: string; quantity: number; cardNumber: string; expiry: string; cardCode: string; isNewCard: boolean; cardId: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/authorizeDotNet/customers/ticketPayment',
            method: 'POST',
            body: {
                user: {
                    "_id": clientId
                },
                quantity,
                cardNumber,
                expiry,
                cardCode,
                isNewCard,
                cardId
            }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function makePayment({ticketId, clientId, ticketPrice}: {ticketId: string; clientId: string; ticketPrice: number;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/makePayment',
            method: 'POST',
            body: {
                _id: ticketId,
                clientId: clientId,
                depositPaid: true,
                pricePaid: ticketPrice
            }
            // withCredentials: true
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function changeConfirmation({ticketId, clientId, engagementLetterNeeded, agreeToEngagementLetter} : {ticketId: string; clientId: string; engagementLetterNeeded: boolean; agreeToEngagementLetter: boolean;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/changeConfirmation',
            method: 'POST',
            body: {
                _id: ticketId,
                clientId: clientId,
                confirmedBy: 'client',
                readyForCpaReview: true,
                engagementLetterNeeded,
                agreeToEngagementLetter
            }
            // withCredentials: true
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function createTransaction({ticketId, userId, ticketPrice, transactionType, toWhom, cardUsed}: {ticketId: string; userId: string; ticketPrice: number; transactionType: 'Client Ticket Fee' | 'Client Income'; toWhom: 'Client' | 'Firm', cardUsed?: Object;}){
    try {
        const result = await makeSAMRequest({
            endpoint: '/transactions-v2/create',
            method: 'POST',
            body: {
                ticket: ticketId,
                userId,
                transactionType,
                toWhom,
                quantity: ticketPrice,
                cardUsed
            }
            // withCredentials: true
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function confirmTicketWithDeposit({ticketId, clientId, agreeToEngagementLetter} : {ticketId: string; clientId: string; agreeToEngagementLetter: boolean;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/tickets-v2/changeConfirmation',
            method: 'POST',
            body: {
                _id: ticketId,
                clientId: clientId,
                confirmedBy: 'client',
                readyForCpaReview: true,
                depositPaid: true,
                agreeToEngagementLetter
            }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function rejectReturn({ticketId, clientId, clientName} : {ticketId: string; clientId: string; clientName: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/cpa/sendClientReturn',
            method: 'POST',
            body: {
                ticketId,
                status: "Revision",
                client: {
                    name: clientName
                },
                clientId
            }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

export async function editPassword({oldPassword, password, confirmPassword, clientId}: {oldPassword: string; password: string; confirmPassword: string; clientId: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/editPassword',
            method: 'POST',
            body: {
                oldPassword,
                password,
                confirmPassword,
                userId: clientId,
                userType: "Client"
            }
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function resetPassword({password, clientId}: {password: string; clientId: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/resetPassword',
            method: 'PUT',
            body: {
                password,
                user: clientId,
                userType: "Client"
            },
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function verifyUser({clientId, encodedAuth}: {clientId: string; encodedAuth: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/invites/verify',
            method: 'POST',
            body: {
                user: clientId,
                auth: encodedAuth,
            },
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function verifySetPassword({password, clientId, firstName, lastName, phoneNumber, address}: {password: string; clientId: string; firstName: string; lastName: string; phoneNumber: string; address: object;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/users-v2/setPassword',
            method: 'POST',
            body: {
                password,
                user: clientId,
                firstName, 
                lastName, 
                phoneNumber,
                address
            },
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function forgotPassword({email}: {email: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/register/forgotPassword',
            method: 'POST',
            body: {
                email,
                userType: "Client"
            },
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function resetPasswordCode({password, clientId, resetCode}: {password: string; clientId: string; resetCode: string;}) {
    try {
        const result = await makeSAMRequest({
            endpoint: '/register/resetPassword',
            method: 'POST',
            body: {
                password,
                userId: clientId,
                userType: 'Client',
                resetCode,
            },
        })
        return result;
    } catch (err) {
        console.log(err)
    }
}

export async function loginUser({formData}: {formData: any;}) {
    try {
        const response = await login(formData)
        if (response?.err) return {err: response?.err}
    } catch (err) {
        console.error(err)
    }
}