"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import CookieBanner from "./CookieBanner/CookieBanner.tsx"

type CookieConsentContextType = {
    resetConsent: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

/* eslint-disable */
export const useCookieConsent = () => {
    const context = useContext(CookieConsentContext)

    if (!context) {
        throw new Error("useCookieConsent must be used within CookieConsentProvider")
    }
    return context
}

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        const cookieConsent = window.localStorage.getItem("cookieConsent")
        if (!cookieConsent) {
            setShowBanner(true)
        }
    }, [])

    const resetConsent = () => {
        window.localStorage.removeItem("cookieConsent")
        setShowBanner(true)
    }

    return (
        <CookieConsentContext.Provider value={{ resetConsent }}>
            {children}
            {showBanner && <CookieBanner onClose={() => setShowBanner(false)} />}
        </CookieConsentContext.Provider>
    )
}
