"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { useMemo, useState } from "react"

import NewsFilters from "@app/(administration)/administration/content/(tabs)/NewsAndEventsTab/components/NewsFilters.tsx"
import NewsTable from "@app/(administration)/administration/content/(tabs)/NewsAndEventsTab/components/NewsTable.tsx"
import api from "@/axios.ts"
import type { News } from "@entities/News.ts"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { getNewsDetailAdminUrl, NEWS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import { DEFAULT_PAGE_SIZE } from "@shared/options.ts"
import PermissionGuard from "@shared/ui/PermissionGuard/PermissionGuard.tsx"

import type { NewsFilterValues } from "./types.ts"

const QUERY_KEY = ["admin-news-management"]
const initialFilters: NewsFilterValues = {}

const NewsAndEventsTab = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    const [ordering, setOrdering] = useState<string[]>(["-created_at"])
    const [filters, setFilters] = useState<NewsFilterValues>(initialFilters)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [unpublishingId, setUnpublishingId] = useState<number | null>(null)
    const { data: permissions = [], isLoading: permissionsLoading } =
        useCurrentUserPermissionsQuery()

    const permissionActions = useMemo(() => permissions.map(({ action }) => action), [permissions])
    const canView = permissionActions.includes("news.view")
    const canUpdate = permissionActions.includes("news.update")
    const canDelete = permissionActions.includes("news.delete")

    const { data, isLoading, isFetching } = useTableDataQuery<News, NewsFilterValues>({
        url: NEWS_ADMIN_URL,
        queryKey: QUERY_KEY,
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        ordering,
        filters,
        enabled: canView,
    })

    const deleteNewsMutation = useMutation({
        mutationFn: async (news: News) => {
            await api.delete(getNewsDetailAdminUrl(news.id))
        },
        onSuccess: async (_, news) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ["news"] }),
            ])
            message.success(`“${news.title}” deleted.`)
        },
        onError: (error) => handleApiError({ error }),
        onSettled: () => setDeletingId(null),
    })

    const unpublishNewsMutation = useMutation({
        mutationFn: async (news: News) => {
            await api.patch(getNewsDetailAdminUrl(news.id), { is_published: false })
        },
        onSuccess: async (_, news) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ["news"] }),
            ])
            message.success(`“${news.title}” is now a draft.`)
        },
        onError: (error) => handleApiError({ error }),
        onSettled: () => setUnpublishingId(null),
    })

    const updateFilters = (nextFilters: NewsFilterValues) => {
        setPage(1)
        setFilters(nextFilters)
    }

    const deleteNews = (news: News) => {
        setDeletingId(news.id)
        deleteNewsMutation.mutate(news)
    }

    const unpublishNews = (news: News) => {
        setUnpublishingId(news.id)
        unpublishNewsMutation.mutate(news)
    }

    if (!permissionsLoading && !canView) return <PermissionGuard allowed={false} />

    return (
        <>
            <NewsFilters filters={filters} total={data?.count ?? 0} onChange={updateFilters} />
            <NewsTable
                data={data?.data ?? []}
                filters={filters}
                page={page}
                pageSize={DEFAULT_PAGE_SIZE}
                total={data?.count ?? 0}
                ordering={ordering}
                loading={permissionsLoading || isLoading || isFetching}
                canUpdate={canUpdate}
                canDelete={canDelete}
                deletingId={deletingId}
                unpublishingId={unpublishingId}
                onPageChange={setPage}
                onOrderingChange={setOrdering}
                onFiltersChange={updateFilters}
                onDelete={deleteNews}
                onUnpublish={unpublishNews}
            />
        </>
    )
}

export default NewsAndEventsTab
