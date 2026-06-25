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
    current_role?: string | null
    institution_location?: string | null
    areas?: string[]
    ideas?: string | null
    future_committee_working?: boolean
    future_leadership_positions?: boolean
    receive_updates?: boolean
    role_affiliation?: string
    get_involved_message?: string
    organization?: string
    donation_type?: string
    message?: string
}

export interface IContactMessage {
    type: ContactMessageType
    id: number
    name: string
    email: string
    created_at: string
    answered: boolean
    message_content: ContactMessageContent
}
