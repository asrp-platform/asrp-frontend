"use client"

import { usePathname } from "next/navigation"

import { getLoginUrl } from "@shared/helpers/authRedirect.ts"

export const useReturnToLoginHref = (href: string) => {
    const pathname = usePathname()

    const isAuthOnlyPage =
        pathname === "/login" ||
        pathname === "/registration" ||
        pathname.startsWith("/registration/") ||
        pathname === "/password-reset" ||
        pathname.startsWith("/password-reset/")

    return href === "/login" && !isAuthOnlyPage ? getLoginUrl(pathname) : href
}
