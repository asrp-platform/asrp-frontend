"use client"

import { useCurrentUserPaymentQuery } from "@/shared/backend/queries/useCurrentUserPaymentQuery.ts"
import { Table } from "antd"

const PaymentsTable = () => {
    const { data: payments, isLoading } = useCurrentUserPaymentQuery()

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Currency",
            dataIndex: "currency",
            key: "currency",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Purpose",
            dataIndex: "purpose",
            key: "purpose",
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
        },
    ]

    return <Table columns={columns} dataSource={payments?.data} rowKey="id" loading={isLoading} />
}

export default PaymentsTable
