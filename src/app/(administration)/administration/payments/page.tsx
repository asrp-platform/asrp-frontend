"use client"

import { Typography } from "antd"
import PaymentsTable from "@app/(administration)/administration/payments/(ui)/PaymentsTable.tsx"

const { Title } = Typography

const Page = () => (
    <>
        <Title level={2}>Payments</Title>
        <PaymentsTable />
    </>
)

export default Page
