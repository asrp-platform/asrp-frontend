"use client"

import type { IMembershipType } from "@entities/Membership.ts"
import { MEMBERSHIP_TYPES_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import type { ColumnsType } from "antd/lib/table"
import { Table, Tag } from "antd"
import MembershipTypeTag from "@shared/ui/Tags/MembershipTypeTag/MembershipTypeTag.tsx"
import { useQuery } from "@tanstack/react-query"
import api from "@/axios.ts"
import EditMembershipTypeModal from "@app/(administration)/administration/membership/(tabs)/MembershipTypesTable/EditMembershipTypeModal.tsx"

const MembershipTypesTable = () => {
    const { data, isPending } = useQuery({
        queryKey: ["membership-types"],
        queryFn: async () => {
            const response = await api.get<IMembershipType[]>(MEMBERSHIP_TYPES_ADMIN_URL)
            return response.data
        },
        retry: false,
        staleTime: 1000 * 60 * 60,
    })

    const columns: ColumnsType<IMembershipType> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Membership type",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (value) => <MembershipTypeTag type={value} />,
        },
        {
            title: "Price (USD)",
            dataIndex: "price_usd",
            key: "price_usd",
        },
        {
            title: "Duration",
            key: "duration",
            dataIndex: "duration",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Is purchasable",
            dataIndex: "is_purchasable",
            key: "is_purchasable",
            render: (_, record) => {
                const color = record.is_purchasable ? "green" : "red"
                const content = record.is_purchasable ? "Yes" : "No"

                return <Tag color={color}>{content}</Tag>
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => <EditMembershipTypeModal membershipType={record} />,
        },
    ]

    return <Table rowKey="id" columns={columns} dataSource={data} loading={isPending} />
}

export default MembershipTypesTable
