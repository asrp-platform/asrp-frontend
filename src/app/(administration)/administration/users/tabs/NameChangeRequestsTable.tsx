"use client"

import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import type { SorterResult, TablePaginationConfig } from "antd/es/table/interface"
import type { ColumnsType } from "antd/lib/table"

import api from "../../../../../axios.ts"
import Loading from "../../../../(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

import { NAME_CHANGE_REQUESTS_URL } from "../../../../../shared/backend/adminApiUrls.ts"
import type { IPaginatedBackendResponse } from "../../../../../shared/types/interfaces.ts"
import type { INameChangeRequest } from "../../../../../entities/NameChangeRequest.ts"

import { getSortOrder } from "../../../../../shared/helpers/getSortOrder.ts"

const NameChangeRequestsTable = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [tableData, setTableData] =
        useState<IPaginatedBackendResponse<INameChangeRequest> | null>()

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
    }, [currentPage, pageSize, ordering])

    const columns: ColumnsType<INameChangeRequest> = [
        {
            title: "User",
            key: "user",
            render: (_, record) => `${record.user_id} ${record.user_id}`,
        },
        {
            title: "New Firstname",
            dataIndex: "firstname",
            key: "firstname",
            sorter: true,
            sortOrder: getSortOrder("firstname", ordering),
        },
        {
            title: "New Lastname",
            dataIndex: "lastname",
            key: "lastname",
            sorter: true,
            sortOrder: getSortOrder("lastname", ordering),
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
            render: (value) => {
                if (value === "PENDING") return <Tag color="gold">Pending</Tag>

                if (value === "APPROVED") return <Tag color="green">Approved</Tag>

                return <Tag color="red">Rejected</Tag>
            },
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

    const handleTableChange = (
        _pagination: TablePaginationConfig,
        _filters: any,
        sorter: SorterResult<INameChangeRequest> | SorterResult<INameChangeRequest>[]
    ) => {
        if (Array.isArray(sorter)) return

        const field = sorter.field as string | undefined
        const order = sorter.order

        if (!field) {
            setOrdering([])
            return
        }

        if (order === "ascend") {
            setOrdering([field])
        } else if (order === "descend") {
            setOrdering([`-${field}`])
        } else {
            setOrdering([])
        }
    }

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
            onChange={handleTableChange}
            scroll={{ x: 1 }}
        />
    )
}

export default NameChangeRequestsTable
