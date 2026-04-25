"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/context/AuthProvider.tsx"
import { PermissionsProvider } from "@/context/PermissionsProvider.tsx"
import { CookieConsentProvider } from "@/context/CookieConsentProvider/CookieConsentProvider.tsx"
import { QueryClient } from "@tanstack/query-core"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <AuthProvider>
                <PermissionsProvider>
                    <CookieConsentProvider>{children}</CookieConsentProvider>
                </PermissionsProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}
