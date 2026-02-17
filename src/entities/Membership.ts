import type { IUser } from "./User.ts"

export interface IMembershipType {
    id: number
    name: string
    price_usd: number | string
    duration: number
    description: string
    is_purchasable: boolean
    stripe_price_id: string
}

export interface IUserMembership {
    id: number | string
    created_at: string
    updated_at: string

    current_period_end: string
    has_access: boolean
    cancel_at_period_end: boolean

    user_id: number | string
    user?: IUser

    membership_type_id: number | string
    membership_type?: IMembershipType
}
