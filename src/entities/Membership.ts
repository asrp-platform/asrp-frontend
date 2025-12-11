import type { IUser } from "./User.ts"

/* eslint-disable */
export enum MembershipTypeEnum {
    PATHWAY = "PATHWAY",
    AFFILIATE = "AFFILIATE",
    ACTIVE = "ACTIVE",
    TRAINEE = "TRAINEE",
    HONORARY = "HONORARY",
}

export interface IMembershipType {
    id: number
    name: string
    type: MembershipTypeEnum
    price_usd: number | string
    duration: number
    description: string
    is_purchasable: boolean
    stripe_price_id: string
}

/* eslint-disable */
export enum StripeSubscriptionStatusEnum {
    INCOMPLETE = "incomplete",
    INCOMPLETE_EXPIRED = "incomplete_expired",
    TRIALING = "trialing",
    ACTIVE = "active",
    PAST_DUE = "past_due",
    CANCELED = "canceled",
    UNPAID = "unpaid",
}

export enum ApprovalStatusEnum {
    APPROVED = "APPROVED",
    PENDING = "PENDING",
    REJECTED = "REJECTED",
}

export interface IUserMembership {
    id: number | string
    created_at: string
    updated_at: string

    status: StripeSubscriptionStatusEnum
    approval_status: ApprovalStatusEnum

    stripe_subscription_id: string | null
    stripe_customer_id: string | null

    current_period_end: string
    has_access: boolean
    cancel_at_period_end: boolean

    checkout_session_expires_at: string | null
    checkout_url: string | null

    user_id: number | string
    user?: IUser

    membership_type_id: number | string
    membership_type?: IMembershipType
}
