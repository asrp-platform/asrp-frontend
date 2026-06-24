export interface Sponsor {
    id: number
    created_at: string
    updated_at: string
    name: string
    link: string
    short_name: string | null
    logo_url: string | null
}

export interface CreateSponsorPayload {
    name: string
    link: string
    short_name?: string
    logo_url?: string
}

export type SponsorFormValues = CreateSponsorPayload
