"use client"

import { usePathname } from "next/navigation"

import { getLoginUrl } from "@shared/helpers/authRedirect.ts"

export const useReturnToLoginHref = (href: string) => {
    const pathname = usePathname()

    return href === "/login" ? getLoginUrl(pathname) : href
}
