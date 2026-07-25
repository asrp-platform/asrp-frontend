import type { MembershipTypeEnum } from "@/entities/Membership.ts"

export interface IMemberDirectoryItem {
    id: number
    firstname: string
    middlename: string | null
    lastname: string
    preferred_name: string | null
    suffix: string | null
    credentials: string | null
    description: string | null
    country: string
    state: string | null
    city: string | null
    languages_spoken: string | null
    professional_interests: string | null
    avatar_url: string | null
    membership_type: MembershipTypeEnum
}

export interface IMembersDirectoryFilters {
    search?: string
    country?: string
    state?: string
    membership_type?: MembershipTypeEnum
}
