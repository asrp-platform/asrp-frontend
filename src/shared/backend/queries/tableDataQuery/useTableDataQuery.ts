import api from "@/axios.ts"
import { useQuery } from "@tanstack/react-query"
import type { QueryKey } from "@tanstack/react-query"
import type { IPaginatedBackendResponse } from "@shared/types/interfaces.ts"

type TableFilterValue = string | number | boolean | null | undefined
type TableFilters<Filters> = {
    [Key in keyof Filters]: TableFilterValue
}

interface TableQueryParams<Filters extends TableFilters<Filters>> {
    url: string
    queryKey: QueryKey
    page?: number
    pageSize?: number
    ordering?: string[]
    filters?: Filters
}

const fetchData = async <T, F extends TableFilters<F>>({
    url,
    page,
    pageSize,
    filters,
    ordering = [],
}: Omit<TableQueryParams<F>, "queryKey">): Promise<IPaginatedBackendResponse<T>> => {
    const response = await api.get<IPaginatedBackendResponse<T>>(url, {
        params: {
            page: page,
            page_size: pageSize,
            ordering: ordering.length ? ordering.join(",") : null,
            ...(filters ?? {}),
        },
    })
    return response.data
}

export const useTableDataQuery = <T, F extends TableFilters<F> = Record<string, TableFilterValue>>({
    url,
    queryKey,
    page,
    pageSize,
    ordering = [],
    filters,
}: TableQueryParams<F>) => {
    return useQuery<IPaginatedBackendResponse<T>>({
        queryKey: [...queryKey, page, pageSize, ordering, { filters: filters ?? {} }],
        queryFn: () => fetchData<T, F>({ url, page, pageSize, filters, ordering }),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60 * 10,
    })
}
