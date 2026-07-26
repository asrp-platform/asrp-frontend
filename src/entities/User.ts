export interface IUserPublic {
    id: number
    firstname: string
    middlename: string | null
    lastname: string
    preferred_name: string | null
    suffix: string | null
    credentials: string | null
    email: string
    admin: boolean
    superuser: boolean
    banned: boolean
    ban_reason: string | null
    description: string | null
    country: string
    state: string | null
    city: string
    languages_spoken: string | null
    professional_interests: string | null
    avatar_url: string | null
}

export interface IUserPrivate extends IUserPublic {
    telegram_username: string | null
    avatar_path: string | null
    phone_number: string | null
    pending: boolean
    created_at: string
    last_password_change: string | null
    postal_code: string | null
}

export interface IUserProfessionalInformation {
    medical_school: string
    medical_school_country: string
    years_from_to: string

    is_board_certified_pathologist: boolean
    is_us_pathology_trainee: boolean
    is_us_lab_professional: boolean

    created_at: string
    updated_at: string
}

export interface IUserResidency {
    id: number
    institution: string
    speciality: string
    city: string
    state: string
    country: string
    years_from_to: string
    current_position?: boolean
    user_id: number
}

export type IUserResidencyFormValues = Omit<IUserResidency, "id" | "user_id">

export interface IUserFellowship {
    id: number
    institution: string
    speciality: string
    city: string
    state: string
    country: string
    years_from_to: string
    current_position?: boolean
    user_id: number
}

export type IUserFellowshipFormValues = Omit<IUserFellowship, "id" | "user_id">

export interface IUserJob {
    id: number
    institution: string
    speciality: string
    city: string
    state: string
    country: string
    years_from_to: string
    current_position?: boolean
    user_id: number
}

export type IUserJobFormValues = Omit<IUserJob, "id" | "user_id">

export interface ICommunicationPreferences {
    membership_account_notifications: boolean
    newsletters: boolean
    events_meetings: boolean
    committees_leadership: boolean
    volunteer_opportunities: boolean
    user_id: number
}
