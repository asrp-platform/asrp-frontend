import api from "@/axios.ts"
import {
    getSponsorAdminUrl,
    SPONSORS_ADMIN_URL,
    SPONSORS_LOGOS_ADMIN_URL,
} from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import { SPONSORS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

import type { CreateSponsorPayload, Sponsor } from "./types"

export const SPONSORS_QUERY_KEY = ["admin-site-settings-sponsors"]

export const fetchSponsors = async () => {
    const response = await api.get<Sponsor[]>(SPONSORS_URL)
    return response.data
}

export const createSponsor = async (payload: CreateSponsorPayload) => {
    const response = await api.post<Sponsor>(SPONSORS_ADMIN_URL, payload)
    return response.data
}

export const deleteSponsor = async (sponsorId: number) => {
    await api.delete(getSponsorAdminUrl(sponsorId))
}

export const uploadSponsorLogo = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await api.put<string | { url?: string; link?: string; logo_url?: string }>(
        SPONSORS_LOGOS_ADMIN_URL,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    if (typeof response.data === "string") {
        return response.data
    }

    return response.data.logo_url ?? response.data.url ?? response.data.link ?? ""
}
