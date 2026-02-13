export interface IUser {
    id: number

    firstname: string
    middlename: string | null
    lastname: string
    suffix: string | null
    credentials: string | null

    email: string
    phone_number: string | null
    telegram_username: string | null

    stuff: boolean
    description: string | null

    country: string
    state: string | null
    city: string

    languages_spoken: string | null
    professional_interests: string | null

    institution: string
    role: string

    avatar_path: string | null

    pending: boolean
    email_confirmed: boolean

    created_at: string
    last_password_change: string | null
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
    user_id: number
}
