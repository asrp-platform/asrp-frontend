"use client"

import { useState } from "react"

import WebinarFilters from "@app/(administration)/administration/content/(tabs)/WebinarsTab/components/WebinarFilters.tsx"
import WebinarsTable from "@app/(administration)/administration/content/(tabs)/WebinarsTab/components/WebinarsTable.tsx"
import type { IWebinar } from "@entities/News.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { WEBINARS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { DEFAULT_PAGE_SIZE } from "@shared/options.ts"

import type { WebinarFilterValues } from "./types.ts"
import { Flex, Tag } from "antd"

const initialFilters: WebinarFilterValues = {}
const webinarsQueryKey = ["admin-webinars"]

const WebinarsTab = () => {
    const [page, setPage] = useState(1)
    const [ordering, setOrdering] = useState<string[]>(["-id"])
    const [filters, setFilters] = useState<WebinarFilterValues>(initialFilters)
    const pageSize = DEFAULT_PAGE_SIZE

    const {
        data: webinars,
        isLoading,
        isFetching,
    } = useTableDataQuery<IWebinar, WebinarFilterValues>({
        url: WEBINARS_ADMIN_URL,
        queryKey: webinarsQueryKey,
        page,
        pageSize,
        ordering,
        filters,
    })

    const updateFilters = (nextFilters: WebinarFilterValues) => {
        setPage(1)
        setFilters(nextFilters)
    }

    return (
        <>
            <Flex gap={12} wrap="wrap" justify="space-between" style={{ marginBottom: 16 }}>
                <WebinarFilters filters={filters} onChange={updateFilters} />
                <Tag style={{ display: "flex", alignItems: "center" }}>
                    {webinars?.count ?? 0} webinars
                </Tag>
            </Flex>

            <WebinarsTable
                data={webinars?.data ?? []}
                filters={filters}
                page={page}
                pageSize={pageSize}
                total={webinars?.count ?? 0}
                ordering={ordering}
                loading={isLoading || isFetching}
                onPageChange={setPage}
                onOrderingChange={setOrdering}
                onFiltersChange={updateFilters}
            />
        </>
    )
}

export default WebinarsTab
