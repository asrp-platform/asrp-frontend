"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import CookieBanner from "./CookieBanner/CookieBanner"
import { DEFAULT_COOKIE_CONSENT, readCookieConsent, type CookieConsent } from "./cookieConsent"

type CookieConsentContextType = {
    resetConsent: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useCookieConsent = () => {
    const context = useContext(CookieConsentContext)
    if (!context) {
        throw new Error("useCookieConsent must be used within CookieConsentProvider")
    }
    return context
}

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
    const [bannerConsent, setBannerConsent] = useState<CookieConsent | null>(null)

    useEffect(() => {
        if (!readCookieConsent()) {
            // Browser storage is only available after hydration.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setBannerConsent({ ...DEFAULT_COOKIE_CONSENT })
        }
    }, [])

    const resetConsent = () => {
        setBannerConsent(readCookieConsent() ?? { ...DEFAULT_COOKIE_CONSENT })
    }

    return (
        <CookieConsentContext.Provider value={{ resetConsent }}>
            {children}
            {bannerConsent && (
                <CookieBanner
                    initialConsent={bannerConsent}
                    onClose={() => setBannerConsent(null)}
                />
            )}
        </CookieConsentContext.Provider>
    )
}
