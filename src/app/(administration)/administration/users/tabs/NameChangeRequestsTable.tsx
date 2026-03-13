"use client"

import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/lib/table"

import api from "../../../../../axios.ts"
import Loading from "../../../../(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

import { NAME_CHANGE_REQUESTS_URL } from "../../../../../shared/backend/adminApiUrls.ts"
import type { IPaginatedBackendResponse } from "../../../../../shared/types/interfaces.ts"
import type {
    INameChangeRequest,
    NameChangeRequestStatus,
} from "../../../../../entities/NameChangeRequest.ts"

import { getSortOrder } from "../../../../../shared/helpers/getSortOrder.ts"
import { handleTableChange } from "../../../../../shared/helpers/antdTableHelpers.ts"
import { getSelectTableFilterDropdown } from "../../../../../widgets/TableDropdown/SelectTableFilterDropdown/getSelectTableFilterDropdown.tsx"

interface ITableFilters {
    status?: NameChangeRequestStatus
}

const statusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
]

const NameChangeRequestsTable = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [tableData, setTableData] =
        useState<IPaginatedBackendResponse<INameChangeRequest> | null>()

    const [filters, setFilters] = useState<ITableFilters>({})
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(10)
    const [ordering, setOrdering] = useState<string[]>([])

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setIsLoading(true)

                const response = await api.get<IPaginatedBackendResponse<INameChangeRequest>>(
                    NAME_CHANGE_REQUESTS_URL,
                    {
                        params: {
                            page: currentPage,
                            page_size: pageSize,
                            ordering: ordering.length ? ordering.join(",") : null,
                            ...filters,
                        },
                    }
                )

                setTableData(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchRequests()
    }, [currentPage, pageSize, ordering, filters])

    const columns: ColumnsType<INameChangeRequest> = [
        {
            title: "User",
            dataIndex: "user_id",
            key: "user_id",
            sorter: true,
            sortOrder: getSortOrder("user_id", ordering),
            render: (_, record) => `${record.user_id}`,
        },
        {
            title: "New first name",
            dataIndex: "firstname",
            key: "firstname",
        },
        {
            title: "New last name",
            dataIndex: "lastname",
            key: "lastname",
        },
        {
            title: "New middlename",
            dataIndex: "middlename",
            key: "middlename",
        },
        {
            title: "Reason",
            dataIndex: "reason_change",
            key: "reason_change",
            ellipsis: true,
        },
        {
            title: "Reject Reason",
            dataIndex: "reason_rejecting",
            key: "reason_rejecting",
            render: (value: string | null) => value ?? "—",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: true,
            sortOrder: getSortOrder("status", ordering),
            render: (_, record) => {
                console.log(record)
                if (record.status === "PENDING") return <Tag color="gold">Pending</Tag>

                if (record.status === "APPROVED") return <Tag color="green">Approved</Tag>

                return <Tag color="red">Rejected</Tag>
            },
            ...getSelectTableFilterDropdown("status", filters, setFilters, statusOptions),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            sorter: true,
            sortOrder: getSortOrder("created_at", ordering),
            render: (value: string) => new Date(value).toLocaleString(),
        },
    ]

    if (isLoading || !tableData) {
        return <Loading />
    }

    return (
        <Table
            dataSource={tableData.data}
            columns={columns}
            pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: tableData?.count,
                onChange: (page) => setCurrentPage(page),
            }}
            rowKey="id"
            onChange={(pagination, filters, sorter) =>
                handleTableChange(pagination, filters, sorter, setOrdering)
            }
            scroll={{ x: 1 }}
        />
    )
}

export default NameChangeRequestsTable
