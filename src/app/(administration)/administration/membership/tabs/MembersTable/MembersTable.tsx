import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { MEMBERS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import { useState } from "react"
import { type IUserMembership } from "@entities/Membership.ts"
import { Table } from "antd"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import BooleanTag from "@shared/ui/Tags/BooleanTag/BooleanTag.tsx"

interface IFilters {
    user_id: string
}

const initialFilters: IFilters = {
    user_id: "",
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

    const columns = [
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
            title: "Is active",
            dataIndex: "is_active",
            key: "is_active",
            width: 100,
            render: (value: boolean) => <BooleanTag value={value} />,
        },
        {
            title: "Expires at",
            dataIndex: "expires_at",
            key: "expires_at",
            render: (value: string) => <span>{formatDatetime(value)}</span>,
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
