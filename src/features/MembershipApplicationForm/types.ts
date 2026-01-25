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
    firstName: string
    lastName: string
    middleName?: string
    suffix?: string
    credentials?: Credentials
    email: string
    phone?: string
    country: string
    state: string
    city: string
    primaryInstitution: string
    jobTitle: JobTitle
    practiceSetting?: PracticeSetting
    subspecialty?: string
    membership: MembershipKey
    referralSource?: string
    telegramUsername?: string
    interestStatement?: string
}

export type MembershipKey = "active" | "trainee" | "affiliate" | "pathway" | "honorary"
