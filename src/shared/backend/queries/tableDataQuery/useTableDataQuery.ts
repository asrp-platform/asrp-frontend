import api from "../../../../axios.ts"
import { useQuery } from "@tanstack/react-query"
import type { QueryKey } from "@tanstack/query-core"

type TableFilters = Record<string, any | string | number | boolean | null | undefined>

interface TableQueryParams<Filters extends TableFilters> {
    url: string
    queryKey: QueryKey
    page: number
    pageSize: number
    ordering?: string[]
    filters?: Filters
}

const fetchData = async <Response, Filters extends TableFilters>({
    url,
    page,
    pageSize,
    filters,
    ordering = [],
}: Omit<TableQueryParams<Filters>, "queryKey">) => {
    const response = await api.get<Response>(url, {
        params: {
            page: page,
            page_size: pageSize,
            ordering: ordering.length ? ordering.join(",") : null,
            ...(filters ?? {}),
        },
    })
    return response.data
}

export const useTableDataQuery = <Response, Filters extends TableFilters = TableFilters>({
    url,
    queryKey,
    page,
    pageSize,
    ordering = [],
    filters,
}: TableQueryParams<Filters>) => {
    return useQuery<Response>({
        queryKey: [...queryKey, { page, pageSize, ordering, filters: filters ?? {} }],
        queryFn: () => fetchData<Response, Filters>({ url, page, pageSize, filters, ordering }),
        placeholderData: (prev) => prev,
    })
}
