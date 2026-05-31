import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { MEMBERS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import { useState } from "react"
import { type IUserMembership } from "@entities/Membership.ts"
import { Table } from "antd"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"

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
        },
        {
            title: "User email",
            dataIndex: ["user", "email"],
            key: "user_email",
        },
        {
            title: "Expires at",
            dataIndex: "expires_at",
            key: "expires_at",
        },
        {
            title: "Is active",
            dataIndex: "is_active",
            key: "is_active",
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
                scroll={{ x: 1600 }}
            />
        </div>
    )
}

export default MembersTable
