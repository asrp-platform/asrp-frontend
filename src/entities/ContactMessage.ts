/* eslint-disable */
// @ts-ignore
export enum ContactMessageType {
    Contact = "CONTACT",
    GetInvolved = "GET_INVOLVED",
    GetInvolvedCommittees = "GET_INVOLVED_COMMITTEES",
    DonationSponsorship = "DONATION_SPONSORSHIP",
}

interface ContactMessageContent {
    subject?: string
    contact_message?: string
}

export interface IContactMessage {
    type: ContactMessageType.Contact
    id: number
    name: string
    email: string
    created_at: string
    answered: boolean
    message_content: ContactMessageContent
}
