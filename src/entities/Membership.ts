import type { IUserPrivate } from "@/entities/User.ts"

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
    PAYMENT_PENDING = "PAYMENT_PENDING",
    PAID = "PAID",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    PAYMENT_FAILED = "PAYMENT_FAILED",
}

export interface IMembershipType {
    id: number
    name: string
    type: MembershipTypeEnum
    price_usd: number
    duration: number
    description: string
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
    user?: IUserPrivate

    membership_type_id: number | string
    membership_type?: IMembershipType
}

export interface IUserMembership {
    id: number | string
    created_at: string
    updated_at: string
    expires_at: string
    membership_request_id: number
    is_active: boolean

    terminated: boolean
    termination_reason: string | null
    terminated_at: string | null

    suspended_until: string | null
    suspension_reason: string | null
    suspended_at: string | null

    is_suspended: boolean

    membership_type_id: number
    membership_type: IMembershipType

    user_id: number
    user: Pick<IUserPrivate, "id" | "email">
}
