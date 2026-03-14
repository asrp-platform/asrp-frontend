"use client"

import { type ReactNode } from "react"
import AccessDenied from "./AccessDenied"

interface Props {
    allowed: boolean
    fallback?: ReactNode
    children: ReactNode
}

const PermissionGuard = ({ allowed, fallback, children }: Props) => {
    if (!allowed) {
        return fallback ?? <AccessDenied />
    }

    return <>{children}</>
}

export default PermissionGuard
