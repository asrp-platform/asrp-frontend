"use client"

import type {ReactNode} from "react";
import {AuthProvider} from "./AuthProvider.tsx";
import {PermissionsProvider} from "./PermissionsProvider.tsx";
import {CookieConsentProvider} from "./CookieConsentProvider/CookieConsentProvider.tsx";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <PermissionsProvider>
                <CookieConsentProvider>
                    {children}
                </CookieConsentProvider>
            </PermissionsProvider>
        </AuthProvider>
    )
}