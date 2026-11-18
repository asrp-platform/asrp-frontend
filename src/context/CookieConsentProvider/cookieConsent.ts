export const COOKIE_CONSENT_KEY = "cookieConsent"

export const DEFAULT_COOKIE_CONSENT = {
    necessary: true,
    performance: false,
    targeting: false,
    functionality: false,
    unclassified: false,
}

export type CookieConsent = typeof DEFAULT_COOKIE_CONSENT

export const COOKIE_CATEGORIES = [
    { key: "necessary", label: "Strictly necessary" },
    { key: "performance", label: "Analytics cookies" },
    { key: "targeting", label: "Marketing cookies" },
    { key: "functionality", label: "Functional cookies" },
    { key: "unclassified", label: "Other cookies" },
] as const satisfies ReadonlyArray<{ key: keyof CookieConsent; label: string }>

export const ALL_COOKIE_CONSENT: CookieConsent = {
    necessary: true,
    performance: true,
    targeting: true,
    functionality: true,
    unclassified: true,
}

export const readCookieConsent = (): CookieConsent | null => {
    try {
        const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY)
        if (!raw) return null
        const value: unknown = JSON.parse(raw)
        if (typeof value !== "object" || value === null) return null
        if (
            !COOKIE_CATEGORIES.every(
                ({ key }) => key in value && typeof value[key as keyof typeof value] === "boolean",
            )
        )
            return null
        return { ...DEFAULT_COOKIE_CONSENT, ...value, necessary: true }
    } catch {
        return null
    }
}
