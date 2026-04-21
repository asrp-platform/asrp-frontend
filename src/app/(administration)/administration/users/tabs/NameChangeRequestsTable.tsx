"use client"

import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/lib/table"

import api from "../../../../../axios.ts"
import Loading from "../../../../(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

import {
    getUserNameChangeRequestById,
    NAME_CHANGE_REQUESTS_URL,
} from "../../../../../shared/backend/adminApiUrls.ts"
import type { IPaginatedBackendResponse } from "../../../../../shared/types/interfaces.ts"
import type {
    INameChangeRequest,
    NameChangeRequestStatus,
} from "../../../../../entities/NameChangeRequest.ts"

import { getSortOrder } from "../../../../../shared/helpers/getSortOrder.ts"
import { handleTableChange } from "../../../../../shared/helpers/antdTableHelpers.ts"
import { getSelectTableFilterDropdown } from "../../../../../widgets/TableDropdown/SelectTableFilterDropdown/getSelectTableFilterDropdown.tsx"
import NameChangeStatusModal from "../../../../../features/NameChangeRequestModal/NameChangeRequestModal.tsx"
import PermissionGuard from "../../../../../shared/ui/PermissionGuard/PermissionGuard.tsx"
import { usePermissions } from "../../../../../context/PermissionsProvider.tsx"

interface ITableFilters {
    status?: NameChangeRequestStatus
}

type UpdateStatusAction = { action: "approve" } | { action: "reject"; reason_rejecting: string }

const statusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
]

const NameChangeRequestsTable = () => {
    const { permissions } = usePermissions()

    const canView = permissions.includes("name_change_requests.view")
    const canUpdate = canView && permissions.includes("name_change_requests.update")

    const [isLoading, setIsLoading] = useState(true)
    const [statusUpdateLoading, setStatusUpdateLoading] = useState<boolean>(false)
    const [tableData, setTableData] =
        useState<IPaginatedBackendResponse<INameChangeRequest> | null>()

    const [filters, setFilters] = useState<ITableFilters>({})
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(10)
    const [ordering, setOrdering] = useState<string[]>([])
    const [statusModalOpen, setStatusModalOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<INameChangeRequest | null>(null)

    const openModal = (row: INameChangeRequest) => {
        setStatusModalOpen(true)
        setSelectedRow(row)
    }

    const closeModal = () => {
        setStatusModalOpen(false)
        setSelectedRow(null)
    }

    const updateStatusInTable = (selectedRow: INameChangeRequest, action: "approve" | "reject") => {
        setTableData(
            (prev) =>
                ({
                    ...prev,
                    data: prev?.data.map((row) =>
                        row.id === selectedRow.id ? { ...row, status: action } : row,
                    ),
                }) as IPaginatedBackendResponse<INameChangeRequest>,
        )
    }

    const changeNameChangeRequestStatus = async (data: UpdateStatusAction) => {
        if (!selectedRow) {
            return
        }
        try {
            setStatusUpdateLoading(true)
            if (data.action === "approve") {
                await api.patch(
                    getUserNameChangeRequestById(selectedRow.user_id, selectedRow.id),
                    data,
                )
                updateStatusInTable(selectedRow, data.action)
            }
            if (data.action === "reject") {
                await api.patch(
                    getUserNameChangeRequestById(selectedRow.user_id, selectedRow.id),
                    data,
                )
                updateStatusInTable(selectedRow, data.action)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setStatusUpdateLoading(false)
        }
    }

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
                    },
                )
                setTableData(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (canView) {
            fetchRequests()
        }
    }, [currentPage, pageSize, ordering, filters, canView])

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
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: true,
            sortOrder: getSortOrder("status", ordering),
            render: (_, record) => {
                if (record.status === "PENDING")
                    return (
                        <Tag
                            color="gold"
                            onClick={canUpdate ? () => openModal(record) : undefined}
                            style={{ cursor: "pointer" }}
                        >
                            Pending
                        </Tag>
                    )

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

    if (!canView) {
        return <PermissionGuard allowed={false} />
    }

    if (isLoading || !tableData) {
        return <Loading />
    }

    return (
        <PermissionGuard allowed={canView}>
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
            <NameChangeStatusModal
                open={statusModalOpen}
                loading={statusUpdateLoading}
                onClose={closeModal}
                onSubmit={changeNameChangeRequestStatus}
            />
        </PermissionGuard>
    )
}

export default NameChangeRequestsTable
