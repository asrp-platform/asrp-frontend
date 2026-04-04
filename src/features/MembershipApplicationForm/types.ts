export type Credentials =
    | "MD"
    | "DO"
    | "MBBS"
    | "DDS"
    | "MLS"
    | "PhD"
    | "MLT"
    | "PA(ASCP)"
    | "MSc"
    | "MBA"
    | "MPH"
    | "Other"

export type Country = {
    code: string // "US"
    name: string // "United States"
}

export type JobTitle =
    | "attending"
    | "fellow"
    | "resident"
    | "medical_student"
    | "scientist"
    | "lab_professional"
    | "other"

export type PracticeSetting =
    | "academic"
    | "community"
    | "private_lab"
    | "industry"
    | "government"
    | "other"

export type FieldType = {
    firstname: string
    lastname: string
    middlename?: string
    suffix?: string
    credentials?: Credentials
    email: string
    phone?: string
    country: string
    state: string
    city: string

    primary_affiliation: string
    job_title: JobTitle
    practice_setting?: PracticeSetting
    subspecialty?: string

    membership_type: MembershipKey

    hear_about_asrp: string
    tg_username?: string
    interest_description?: string
}

export type MembershipKey = "ACTIVE" | "TRAINEE" | "AFFILIATE" | "PATHWAY" | "HONORARY"
