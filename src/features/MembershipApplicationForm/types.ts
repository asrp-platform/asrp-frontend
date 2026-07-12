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
    primary_affiliation: string
    job_title: JobTitle
    practice_setting?: PracticeSetting
    subspecialty?: string

    membership_type: MembershipKey

    hear_about_asrp: string
    tg_username?: string
    interest_description?: string
    confirmAccuracy: boolean
    is_agrees_communications: boolean
}

export type MembershipKey = "ACTIVE" | "TRAINEE" | "AFFILIATE" | "PATHWAY" | "HONORARY"
