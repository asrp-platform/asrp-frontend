"use client"




import type {ReactNode} from "react";
import {AuthProvider} from "./AuthProvider.tsx";
import {PermissionsProvider} from "./PermissionsProvider.tsx";
import {MembershipProvider} from "./MembershipProvider.tsx";
import {CookieConsentProvider} from "./CookieConsentProvider/CookieConsentProvider.tsx";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <PermissionsProvider>
                <MembershipProvider>
                    <CookieConsentProvider>
                        {children}
                    </CookieConsentProvider>
                </MembershipProvider>
            </PermissionsProvider>
        </AuthProvider>
    )
}