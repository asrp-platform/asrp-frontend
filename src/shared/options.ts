import type { Credentials } from "@features/MembershipApplicationForm/types.ts"

export const DEFAULT_PAGE_SIZE = 10

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

export const WEBINAR_TIMEZONE_OPTIONS = [
    { label: "Eastern Time (New York)", value: "America/New_York" },
    { label: "Central Time (Chicago)", value: "America/Chicago" },
    { label: "Mountain Time (Denver)", value: "America/Denver" },
    { label: "Mountain Time - no DST (Phoenix)", value: "America/Phoenix" },
    { label: "Pacific Time (Los Angeles)", value: "America/Los_Angeles" },
    { label: "Alaska Time (Anchorage)", value: "America/Anchorage" },
    { label: "Hawaii Time (Honolulu)", value: "Pacific/Honolulu" },
    { label: "Moscow Time", value: "Europe/Moscow" },
    { label: "United Kingdom (London)", value: "Europe/London" },
    { label: "Central Europe (Berlin)", value: "Europe/Berlin" },
    { label: "Gulf Time (Dubai)", value: "Asia/Dubai" },
    { label: "India Time (Kolkata)", value: "Asia/Kolkata" },
    { label: "Singapore Time", value: "Asia/Singapore" },
    { label: "Japan Time (Tokyo)", value: "Asia/Tokyo" },
    { label: "Australian Eastern Time (Sydney)", value: "Australia/Sydney" },
    { label: "UTC", value: "UTC" },
] as const

export const WEBINAR_LANGUAGE_OPTIONS = [
    { label: "English", value: "English" },
    { label: "Russian", value: "Russian" },
] as const
