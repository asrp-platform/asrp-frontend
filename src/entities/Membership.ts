import type { IUser } from "./User.ts"

/* eslint-disable */

// @ts-ignore
export enum MembershipTypeEnum {
    ACTIVE = "ACTIVE",
    TRAINEE = "TRAINEE",
    AFFILIATE = "AFFILIATE",
    HONORARY = "HONORARY",
    PATHWAY = "PATHWAY",
}

/* eslint-disable */

// @ts-ignore
export enum MembershipRequestStatusEnum {
    SUBMITTED = "SUBMITTED",
    PAYMENT_PENDING = "PAYMENT_PENDING",
    PAID = "PAID",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    PAYMENT_EXPIRED = "PAYMENT_EXPIRED",
}

export interface IMembershipType {
    id: number
    name: string
    type: MembershipTypeEnum
    price_usd: number | string
    duration: number
    description: string | null
    is_purchasable: boolean
}

export interface IMembershipRequest {
    id: number | string
    created_at: string
    updated_at: string

    status: MembershipRequestStatusEnum
    primary_affiliation: string
    job_title: string
    practice_setting: string
    subspecialty: string

    reviewed_at: string | null
    admin_comment: string | null

    user_id: number | string
    user?: IUser

    membership_type_id: number | string
    membership_type?: IMembershipType
}
