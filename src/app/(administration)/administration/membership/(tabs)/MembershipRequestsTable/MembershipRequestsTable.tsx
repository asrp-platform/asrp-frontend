import { useState } from "react"
import { type IMembershipRequest, MembershipRequestStatusEnum } from "@entities/Membership.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { MEMBERSHIP_REQUESTS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import { Table } from "antd"
import type { ColumnsType } from "antd/lib/table"
import type { FilterValue, SorterResult, TablePaginationConfig } from "antd/es/table/interface"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import Link from "next/link"
import MembershipTypeTag from "@shared/ui/Tags/MembershipTypeTag/MembershipTypeTag.tsx"
import MembershipRequestStatusTag from "@shared/ui/Tags/MembershipRequestStatusTag/MembershipRequestStatusTag.tsx"
import ActionsCell from "./ActionsCell/ActionsCell"

interface IFilters {
    status?: MembershipRequestStatusEnum
}

const initialFilters: IFilters = {}

const MembershipRequestsTable = () => {
    const [page, setPage] = useState<number>(1)
    const [ordering, setOrdering] = useState<string[]>([])
    const [filters, setFilters] = useState<IFilters>(initialFilters)
    const pageSize = 25

    const { data, isLoading } = useTableDataQuery<IMembershipRequest, IFilters>({
        url: MEMBERSHIP_REQUESTS_ADMIN_URL,
        queryKey: ["membership-requests"],
        page,
        pageSize,
        ordering,
        filters,
    })

    const columns: ColumnsType<IMembershipRequest> = [
        {
            title: "Actions",
            key: "actions",
            width: 200,
            render: (_: null, record: IMembershipRequest) => {
                if (record.status === MembershipRequestStatusEnum.PAID) {
                    return <ActionsCell membershipRequestId={record.id} />
                }
                return null
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
                <Link href={`/administration/users/${record.id}`}>{record.user?.email}</Link>
            ),
        },
        {
            title: "Membership Type",
            key: "membership_type",
            render: (_, record) =>
                record.membership_type ? (
                    <MembershipTypeTag type={record.membership_type.type} />
                ) : (
                    record.membership_type_id
                ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: true,
            filteredValue: filters.status ? [filters.status] : null,
            filters: [
                { text: "Submitted", value: MembershipRequestStatusEnum.SUBMITTED },
                { text: "Payment pending", value: MembershipRequestStatusEnum.PAYMENT_PENDING },
                { text: "Paid", value: MembershipRequestStatusEnum.PAID },
                { text: "Approved", value: MembershipRequestStatusEnum.APPROVED },
                { text: "Rejected", value: MembershipRequestStatusEnum.REJECTED },
                { text: "Payment failed", value: MembershipRequestStatusEnum.PAYMENT_FAILED },
                { text: "Payment expired", value: MembershipRequestStatusEnum.PAYMENT_EXPIRED },
            ],
            render: (value: MembershipRequestStatusEnum) => (
                <MembershipRequestStatusTag status={value} />
            ),
        },
        {
            title: "Primary Affiliation",
            dataIndex: "primary_affiliation",
            key: "primary_affiliation",
            ellipsis: true,
        },
        {
            title: "Job Title",
            dataIndex: "job_title",
            key: "job_title",
            ellipsis: true,
        },
        {
            title: "Practice Setting",
            dataIndex: "practice_setting",
            key: "practice_setting",
            ellipsis: true,
        },
        {
            title: "Subspecialty",
            dataIndex: "subspecialty",
            key: "subspecialty",
            ellipsis: true,
        },
        {
            title: "Reviewed At",
            dataIndex: "reviewed_at",
            key: "reviewed_at",
            sorter: true,
            render: (value: string | null) => (value ? new Date(value).toLocaleString() : "—"),
        },
        {
            title: "Admin Comment",
            dataIndex: "admin_comment",
            key: "admin_comment",
            ellipsis: true,
            render: (value: string | null) => value ?? "—",
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            sorter: true,
            render: (value: string) => new Date(value).toLocaleString(),
        },
    ]

    const handleTableChange = (
        pagination: TablePaginationConfig,
        tableFilters: Record<string, FilterValue | null>,
        sorter: SorterResult<IMembershipRequest> | SorterResult<IMembershipRequest>[],
    ) => {
        setPage(pagination.current ?? 1)

        const statusFilter = tableFilters.status?.[0]

        setFilters((prev) => ({
            ...prev,
            status:
                typeof statusFilter === "string"
                    ? (statusFilter as MembershipRequestStatusEnum)
                    : undefined,
        }))

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
            scroll={{ x: 1600 }}
        />
    )
}

export default MembershipRequestsTable
