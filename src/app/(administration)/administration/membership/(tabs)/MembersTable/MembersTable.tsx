import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { MEMBERS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import { useState } from "react"
import { type IUserMembership } from "@entities/Membership.ts"
import { Table } from "antd"
import type { ColumnsType } from "antd/lib/table"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import ManageUserMembership from "@app/(administration)/administration/membership/(tabs)/MembersTable/ManageUserMembership/ManageUserMembership.tsx"
import MembershipStatusTag from "@app/(administration)/administration/membership/(tabs)/MembersTable/MembershipStatusTag.tsx"

interface IFilters {
    user_id: string | null
}

const initialFilters: IFilters = {
    user_id: null,
}

const MembersTable = () => {
    const [page, setPage] = useState<number>(1)
    const [ordering, setOrdering] = useState<string[]>([])
    const [filters] = useState<IFilters>(initialFilters)
    const pageSize = 25

    const { data, isLoading } = useTableDataQuery<IUserMembership, IFilters>({
        url: MEMBERS_ADMIN_URL,
        queryKey: ["members"],
        page,
        pageSize,
        ordering,
        filters,
    })

    const columns: ColumnsType<IUserMembership> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "User email",
            dataIndex: ["user", "email"],
            key: "user_email",
            width: 250,
        },
        {
            title: "Status",
            key: "status",
            width: 140,
            render: (_, record) => <MembershipStatusTag membership={record} />,
        },
        {
            title: "Expires at",
            dataIndex: "expires_at",
            key: "expires_at",
            render: (value: string) => <span>{formatDatetime(value)}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => <ManageUserMembership userMembership={record} />,
        },
    ]

    return (
        <div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data?.data ?? []}
                loading={isLoading}
                onChange={(pagination, filters, sorter) =>
                    handleTableChange(pagination, filters, sorter, setOrdering)
                }
                pagination={{
                    current: page,
                    pageSize,
                    total: data?.count ?? 0,
                    onChange: (nextPage) => setPage(nextPage),
                }}
            />
        </div>
    )
}

export default MembersTable
