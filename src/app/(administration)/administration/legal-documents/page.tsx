"use client"

import { BylawsFileCard } from "@/app/(administration)/administration/legal-documents/ui/Bylaws.tsx"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"

const Page = () => {
    return (
        <AdminPermissionGuard permission="legal_documents.view">
            <BylawsFileCard />
        </AdminPermissionGuard>
    )
}

export default Page
