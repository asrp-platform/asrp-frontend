"use client"

import { useCallback, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface UseQueryParamTabOptions {
    defaultTab: string
    tabKeys: readonly string[]
    paramName?: string
}

export const useQueryParamTab = ({
    defaultTab,
    tabKeys,
    paramName = "tab",
}: UseQueryParamTabOptions) => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const requestedTab = searchParams.get(paramName)
    const activeTab = requestedTab && tabKeys.includes(requestedTab) ? requestedTab : defaultTab

    const setActiveTab = useCallback(
        (tab: string) => {
            if (!tabKeys.includes(tab)) return

            const params = new URLSearchParams(searchParams.toString())
            params.set(paramName, tab)
            router.replace(`${pathname}?${params.toString()}`, { scroll: false })
        },
        [paramName, pathname, router, searchParams, tabKeys],
    )

    useEffect(() => {
        if (requestedTab === activeTab) return

        const params = new URLSearchParams(searchParams.toString())
        params.set(paramName, activeTab)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, [activeTab, paramName, pathname, requestedTab, router, searchParams])

    return { activeTab, setActiveTab }
}
