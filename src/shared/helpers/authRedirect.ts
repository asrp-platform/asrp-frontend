export const DEFAULT_AUTH_REDIRECT = "/"

export const getLoginUrl = (returnTo: string) => `/login?returnTo=${encodeURIComponent(returnTo)}`

export const getSafeReturnTo = (returnTo: string | null) => {
    if (!returnTo || !returnTo.startsWith("/") || returnTo.startsWith("//")) {
        return DEFAULT_AUTH_REDIRECT
    }

    try {
        const baseUrl = "https://local.asrp"
        const resolvedUrl = new URL(returnTo, baseUrl)

        if (resolvedUrl.origin !== baseUrl) {
            return DEFAULT_AUTH_REDIRECT
        }

        return `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`
    } catch {
        return DEFAULT_AUTH_REDIRECT
    }
}
