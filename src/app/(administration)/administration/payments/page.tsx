"use client"

import { Typography } from "antd"
import PaymentsTable from "@app/(administration)/administration/payments/(ui)/PaymentsTable.tsx"
import AdminPermissionGuard from "@shared/ui/PermissionGuard/AdminPermissionGuard.tsx"

const { Title } = Typography

const Page = () => (
    <AdminPermissionGuard permission="payments.view">
        <Title level={2}>Payments</Title>
        <PaymentsTable />
    </AdminPermissionGuard>
)

export default Page
