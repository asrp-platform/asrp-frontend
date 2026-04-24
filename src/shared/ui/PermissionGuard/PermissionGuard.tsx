"use client"

import { type ReactNode } from "react"
import AccessDenied from "@/shared/ui/PermissionGuard/AccessDenied"

interface Props {
    allowed: boolean
    fallback?: ReactNode
    children?: ReactNode
}

const PermissionGuard = ({ allowed, fallback, children }: Props) => {
    if (!allowed) {
        return fallback ?? <AccessDenied />
    }

    return <>{children || fallback}</>
}

export default PermissionGuard
