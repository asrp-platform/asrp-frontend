import type { MembershipTypeEnum } from "@/entities/Membership.ts"
import type { IUser } from "@/entities/User.ts"

export interface MembershipTypeChangeRequestMembershipType {
    id: number
    name: string
    type: MembershipTypeEnum
}

export interface IMembershipDowngradeRequestBoundedUserMembership {
    is_active: boolean
    user_id: number
    user: Pick<IUser, "id" | "email">
    membership_type_id: number
    membership_type: MembershipTypeChangeRequestMembershipType
}

export interface MembershipDowngradeRequest {
    id: number
    created_at: string
    updated_at: string

    target_membership_type_id: number
    target_membership_type: MembershipTypeChangeRequestMembershipType

    user_membership_id: number

    upgrade: boolean
    reason_changing: string
    approved: boolean
    admin_comment: string | null
    pending: boolean
}

export interface AdminMembershipDowngradeRequest extends MembershipDowngradeRequest {
    user_membership: IMembershipDowngradeRequestBoundedUserMembership
}
