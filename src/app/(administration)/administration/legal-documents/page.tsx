"use client"

import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import { BylawsFileCard } from "../site-settings/ui/Bylaws"

const Page = () => {
    return (
        <AdminPermissionGuard permission="legal_documents.view">
            <BylawsFileCard />
        </AdminPermissionGuard>
    )
}

export default Page
