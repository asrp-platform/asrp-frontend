import { useState } from "react"
import {
    type IMembershipRequest,
    MembershipRequestStatusEnum,
} from "../../../../../entities/Membership.ts"
import { useTableDataQuery } from "../../../../../shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import type { IPaginatedBackendResponse } from "../../../../../shared/types/interfaces.ts"
import { MEMBERSHIP_REQUESTS_ADMIN_URL } from "../../../../../shared/backend/rest-api-urls/admin/membershipsUrls.ts"
import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/lib/table"
import type { FilterValue, SorterResult, TablePaginationConfig } from "antd/es/table/interface"
import Loading from "../../../../(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

interface IFilters {
    status?: MembershipRequestStatusEnum
}

const initialFilters: IFilters = {}

const MembershipRequestsTable = () => {
    const [page, setPage] = useState<number>(1)
    const [ordering, setOrdering] = useState<string[]>([])
    const [filters, setFilters] = useState<IFilters>(initialFilters)
    const pageSize = 25

    const { data, isLoading } = useTableDataQuery<
        IPaginatedBackendResponse<IMembershipRequest>,
        IFilters
    >({
        url: MEMBERSHIP_REQUESTS_ADMIN_URL,
        queryKey: ["membership-requests"],
        page,
        pageSize,
        ordering,
        filters,
    })

    const getStatusTag = (status: MembershipRequestStatusEnum) => {
        switch (status) {
            case MembershipRequestStatusEnum.APPROVED:
                return <Tag color="green">Approved</Tag>
            case MembershipRequestStatusEnum.REJECTED:
                return <Tag color="red">Rejected</Tag>
            case MembershipRequestStatusEnum.PAID:
                return <Tag color="blue">Paid</Tag>
            case MembershipRequestStatusEnum.PAYMENT_PENDING:
                return <Tag color="gold">Payment pending</Tag>
            case MembershipRequestStatusEnum.PAYMENT_FAILED:
                return <Tag color="red">Payment failed</Tag>
            case MembershipRequestStatusEnum.PAYMENT_EXPIRED:
                return <Tag color="volcano">Payment expired</Tag>
            case MembershipRequestStatusEnum.SUBMITTED:
                return <Tag color="default">Submitted</Tag>
            default:
                return <Tag>{status}</Tag>
        }
    }

    const columns: ColumnsType<IMembershipRequest> = [
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
            render: (_, record) => {
                if (record.user) {
                    return `${record.user.firstname} ${record.user.lastname}`.trim()
                }

                return record.user_id
            },
        },
        {
            title: "Email",
            key: "email",
            render: (_, record) => record.user?.email ?? "—",
        },
        {
            title: "Membership Type",
            key: "membership_type",
            render: (_, record) => record.membership_type?.name ?? record.membership_type_id,
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
            render: (value: MembershipRequestStatusEnum) => getStatusTag(value),
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
