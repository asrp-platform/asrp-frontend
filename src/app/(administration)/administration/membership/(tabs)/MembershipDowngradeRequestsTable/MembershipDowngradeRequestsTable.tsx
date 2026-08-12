import { useState } from "react"
import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/lib/table"
import type { FilterValue, SorterResult, TablePaginationConfig } from "antd/es/table/interface"
import Link from "next/link"

import type { AdminMembershipDowngradeRequest } from "@entities/MembershipDowngradeRequest.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import MembershipTypeTag from "@shared/ui/Tags/MembershipTypeTag/MembershipTypeTag.tsx"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import ActionsCell from "@app/(administration)/administration/membership/(tabs)/MembershipDowngradeRequestsTable/ActionsCell/ActionsCell.tsx"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"

interface MembershipTypeChangeRequestsFilters {
    pending?: boolean
    approved?: boolean
    upgrade?: boolean
}

const initialFilters: MembershipTypeChangeRequestsFilters = {}

const MembershipDowngradeRequestsTable = () => {
    const [page, setPage] = useState<number>(1)
    const [ordering, setOrdering] = useState<string[]>([])
    const [filters, setFilters] = useState<MembershipTypeChangeRequestsFilters>(initialFilters)
    const pageSize = 25

    const { data, isLoading } = useTableDataQuery<
        AdminMembershipDowngradeRequest,
        MembershipTypeChangeRequestsFilters
    >({
        url: MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL,
        queryKey: ["membership-downgrade-requests"],
        page,
        pageSize,
        ordering,
        filters,
    })

    const getReviewStatusTag = (record: AdminMembershipDowngradeRequest) => {
        if (record.pending) {
            return <Tag color="gold">Pending</Tag>
        }

        if (record.approved) {
            return <Tag color="green">Approved</Tag>
        }

        return <Tag color="red">Rejected</Tag>
    }

    const columns: ColumnsType<AdminMembershipDowngradeRequest> = [
        {
            title: "Actions",
            key: "actions",
            width: 220,
            render: (_, record) => {
                if (!record.pending) {
                    return null
                }

                return <ActionsCell requestId={record.id} />
            },
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 90,
            sorter: true,
        },
        {
            title: "User",
            key: "user",
            render: (_, record) => (
                <Link href={`/administration/users/${record.id}`}>
                    {record.user_membership.user.email}
                </Link>
            ),
        },
        {
            title: "Current Type",
            key: "current_type",
            render: (_, record) => (
                <MembershipTypeTag type={record.user_membership.membership_type.type} />
            ),
        },
        {
            title: "Target Type",
            key: "target_type",
            render: (_, record) => <MembershipTypeTag type={record.target_membership_type.type} />,
        },
        {
            title: "Change Type",
            dataIndex: "upgrade",
            key: "upgrade",
            filteredValue: typeof filters.upgrade === "boolean" ? [String(filters.upgrade)] : null,
            filters: [
                { text: "Upgrade", value: "true" },
                { text: "Downgrade", value: "false" },
            ],
            render: (upgrade: boolean) =>
                upgrade ? <Tag color="blue">Upgrade</Tag> : <Tag color="purple">Downgrade</Tag>,
        },
        {
            title: "Status",
            key: "status",
            filteredValue:
                typeof filters.pending === "boolean"
                    ? [filters.pending ? "pending" : filters.approved ? "approved" : "rejected"]
                    : null,
            filters: [
                { text: "Pending", value: "pending" },
                { text: "Approved", value: "approved" },
                { text: "Rejected", value: "rejected" },
            ],
            render: (_, record) => getReviewStatusTag(record),
        },
        {
            title: "Reason",
            dataIndex: "reason_changing",
            key: "reason_changing",
            ellipsis: true,
        },
        {
            title: "Admin Comment",
            dataIndex: "admin_comment",
            key: "admin_comment",
            ellipsis: true,
            render: (value: string | null) => value ?? "-",
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            sorter: true,
            render: (value: string) => formatDatetime(value, ["hour", "minute"]),
        },
    ]

    const handleTableChange = (
        pagination: TablePaginationConfig,
        tableFilters: Record<string, FilterValue | null>,
        sorter:
            | SorterResult<AdminMembershipDowngradeRequest>
            | SorterResult<AdminMembershipDowngradeRequest>[],
    ) => {
        setPage(pagination.current ?? 1)

        const upgradeFilter = tableFilters.upgrade?.[0]
        const statusFilter = tableFilters.status?.[0]

        setFilters({
            upgrade:
                upgradeFilter === "true" ? true : upgradeFilter === "false" ? false : undefined,
            pending:
                statusFilter === "pending"
                    ? true
                    : statusFilter === "approved" || statusFilter === "rejected"
                      ? false
                      : undefined,
            approved:
                statusFilter === "approved"
                    ? true
                    : statusFilter === "rejected"
                      ? false
                      : undefined,
        })

        if (Array.isArray(sorter)) {
            setOrdering([])
            return
        }

        const field = sorter.field as string | undefined
        const order = sorter.order

        if (!field || !order) {
            setOrdering([])
            return
        }

        setOrdering(order === "descend" ? [`-${field}`] : [field])
    }

    if (isLoading && !data) {
        return <Loading />
    }

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={data?.data ?? []}
            loading={isLoading}
            onChange={handleTableChange}
            pagination={{
                current: page,
                pageSize,
                total: data?.count ?? 0,
                onChange: (nextPage) => setPage(nextPage),
            }}
            scroll={{ x: 1400 }}
        />
    )
}

export default MembershipDowngradeRequestsTable
