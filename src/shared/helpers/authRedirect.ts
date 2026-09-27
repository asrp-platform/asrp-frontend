export const DEFAULT_AUTH_REDIRECT = "/"

const AUTH_ONLY_PATHS = ["/login", "/registration", "/password-reset"]

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

        if (
            AUTH_ONLY_PATHS.some(
                (path) =>
                    resolvedUrl.pathname === path || resolvedUrl.pathname.startsWith(`${path}/`),
            )
        ) {
            return DEFAULT_AUTH_REDIRECT
        }

        return `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`
    } catch {
        return DEFAULT_AUTH_REDIRECT
    }
}
