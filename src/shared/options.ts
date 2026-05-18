import type { Country, Credentials } from "@features/MembershipApplicationForm/types.ts"

export const practiceSettingOptions = [
    { value: "academic", label: "Academic medical center" },
    { value: "community", label: "Community hospital" },
    { value: "private_lab", label: "Private laboratory" },
    { value: "industry", label: "Industry" },
    { value: "government", label: "Government / military" },
    { value: "other", label: "Other" },
]

export const jobTitleOptions = [
    { value: "attending", label: "Attending pathologist" },
    { value: "fellow", label: "Fellow" },
    { value: "resident", label: "Resident" },
    { value: "medical_student", label: "Medical student" },
    { value: "scientist", label: "Scientist / PhD" },
    { value: "lab_professional", label: "Laboratory professional" },
    { value: "other", label: "Other" },
]

export const credentialsOptions: Credentials[] = [
    "MD",
    "DO",
    "MBBS",
    "DDS",
    "MLS",
    "PhD",
    "MLT",
    "PA(ASCP)",
    "MSc",
    "MBA",
    "MPH",
    "Other",
]

export const countries: Country[] = [
    { code: "US", name: "United States of America" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "AU", name: "Australia" },
    { code: "NZ", name: "New Zealand" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
    { code: "UA", name: "Ukraine" },
    { code: "RU", name: "Russia" },
    { code: "OTHER", name: "Other" },
]

export const referralSourceOptions = [
    { value: "colleague", label: "Colleague" },
    { value: "friend", label: "Friend" },
    { value: "social_media", label: "Social media" },
    { value: "telegram", label: "Telegram" },
    { value: "conference", label: "Conference / meeting" },
    { value: "web_search", label: "Web search" },
    { value: "other", label: "Other" },
]
