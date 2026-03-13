// entities/NameChangeRequest.ts

export type NameChangeRequestStatus = "PENDING" | "APPROVED" | "REJECTED"

export interface INameChangeRequest {
    id: number
    firstname: string
    lastname: string
    middlename: string
    reason_change: string
    reason_rejecting: string | null
    status: NameChangeRequestStatus
    user_id: number
    created_at: string
}
