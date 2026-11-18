import api from "@/axios"
import { useQuery } from "@tanstack/react-query"
import { useAdminPermissions } from "./usePermissionsQuery"
import {
    CONTACT_MESSAGES_ADMIN_URL,
    MEMBERSHIP_REQUESTS_ADMIN_URL,
    NAME_CHANGE_REQUESTS_URL,
} from "../restApiUrls/adminApiUrls"
import { ContactMessageType } from "@/entities/ContactMessage"
import type { IPaginatedBackendResponse } from "@shared/interfaces"

export const ADMIN_ATTENTION_QUERY_KEY = ["admin-attention"]

const options = { staleTime: 30_000, refetchInterval: 60_000, retry: false } as const

const fetchCount = async (url: string, status: string, signal: AbortSignal) => {
    const { data } = await api.get<IPaginatedBackendResponse<unknown>>(url, {
        params: { status, page: 1, page_size: 1 },
        signal,
    })
    return data.count
}

const fetchUnanswered = async (signal: AbortSignal) => {
    const entries = await Promise.all(
        Object.values(ContactMessageType).map(async (type) => {
            const { data } = await api.get<IPaginatedBackendResponse<unknown>>(
                CONTACT_MESSAGES_ADMIN_URL,
                {
                    params: { type, answered: false, page: 1, page_size: 1 },
                    signal,
                },
            )
            return [type, data.count] as const
        }),
    )
    return Object.fromEntries(entries) as Record<ContactMessageType, number>
}

export const useAdminAttentionQuery = () => {
    const { currentUser, can } = useAdminPermissions()
    const queryKey = [...ADMIN_ATTENTION_QUERY_KEY, currentUser?.id]
    const membership = useQuery({
        ...options,
        queryKey: [...queryKey, "membership"],
        queryFn: ({ signal }) => fetchCount(MEMBERSHIP_REQUESTS_ADMIN_URL, "PAID", signal),
        enabled: can("memberships.view"),
    })
    const names = useQuery({
        ...options,
        queryKey: [...queryKey, "names"],
        queryFn: ({ signal }) => fetchCount(NAME_CHANGE_REQUESTS_URL, "PENDING", signal),
        enabled: can("name_change_requests.view"),
    })
    const feedback = useQuery({
        ...options,
        queryKey: [...queryKey, "feedback"],
        queryFn: ({ signal }) => fetchUnanswered(signal),
        enabled: can("feedback.view"),
    })
    const feedbackCounts = can("feedback.view") ? feedback.data : undefined
    return {
        membershipCount: can("memberships.view") ? membership.data : undefined,
        nameChangeCount: can("name_change_requests.view") ? names.data : undefined,
        feedbackCounts,
        feedbackCount: feedbackCounts
            ? Object.values(feedbackCounts).reduce((sum, n) => sum + n, 0)
            : undefined,
    }
}
