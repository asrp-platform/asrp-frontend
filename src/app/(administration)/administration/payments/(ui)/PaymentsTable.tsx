"use client"

import { type Dispatch, type Key, type SetStateAction, useRef, useState } from "react"
import Link from "next/link"
import { Button, Input, type InputRef, Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import type {
    FilterDropdownProps,
    FilterValue,
    SorterResult,
    TablePaginationConfig,
} from "antd/es/table/interface"
import {
    type IPayment,
    PaymentPurposeEnum,
    PaymentProvider,
    PaymentStatusEnum,
} from "@/entities/Payments.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { PAYMENTS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { getSortOrder } from "@shared/helpers/getSortOrder.ts"
import styles from "@app/(administration)/administration/users/styles.module.scss"
import { getSelectTableFilterDropdown } from "@/widgets/TableDropdown/SelectTableFilterDropdown/getSelectTableFilterDropdown.tsx"

const PAYMENTS_ADMIN_QUERY_KEY = ["payments-admin"]
const PAGE_SIZE = 25

interface ITableFilters {
    user_id?: number
    purpose?: PaymentPurposeEnum
    status?: PaymentStatusEnum
}

const purposeOptions = Object.values(PaymentPurposeEnum).map((purpose) => ({
    label: purpose,
    value: purpose,
}))

const statusOptions = Object.values(PaymentStatusEnum).map((status) => ({
    label: status,
    value: status,
}))

const statusColors: Record<PaymentStatusEnum, string> = {
    [PaymentStatusEnum.PENDING]: "gold",
    [PaymentStatusEnum.SUCCEEDED]: "green",
    [PaymentStatusEnum.FAILED]: "red",
    [PaymentStatusEnum.CANCELED]: "default",
    [PaymentStatusEnum.EXPIRED]: "orange",
    [PaymentStatusEnum.REFUNDED]: "blue",
}

const formatAmount = (amount: string, currency: string) => {
    const amountInCents = Number(amount)

    if (Number.isNaN(amountInCents)) {
        return `${amount} ${currency}`
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amountInCents / 100)
}

const formatDate = (value: string) => new Date(value).toLocaleString()

const PaymentsTable = () => {
    const [page, setPage] = useState(1)
    const [ordering, setOrdering] = useState<string[]>(["-created_at"])
    const [filters, setFilters] = useState<ITableFilters>({})
    const searchInput = useRef<InputRef>(null)

    const setFiltersAndResetPage: Dispatch<SetStateAction<ITableFilters>> = (value) => {
        setPage(1)
        setFilters(value)
    }

    const { data, isLoading } = useTableDataQuery<IPayment, ITableFilters>({
        url: PAYMENTS_ADMIN_URL,
        queryKey: PAYMENTS_ADMIN_QUERY_KEY,
        page,
        pageSize: PAGE_SIZE,
        ordering,
        filters,
    })

    const getColumnSearchProps = (dataIndex: "user_id") => {
        const value = filters[dataIndex]

        return {
            filteredValue: value ? ([value as Key] as Key[]) : null,

            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                close,
            }: FilterDropdownProps) => (
                <div className={styles.searchFilterDropdown}>
                    <Input
                        ref={searchInput}
                        type="number"
                        min={1}
                        placeholder={`Search ${String(dataIndex)}`}
                        value={selectedKeys[0] as string}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => {
                            const selectedValue = Number(selectedKeys[0])
                            confirm()
                            setFilters((prev) => ({
                                ...prev,
                                [dataIndex]: selectedValue,
                            }))
                            setPage(1)
                            close()
                        }}
                    />

                    <div className={styles.searchFilterDropdownButtonContainer}>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                                const selectedValue = Number(selectedKeys[0])
                                confirm()
                                setFilters((prev) => ({
                                    ...prev,
                                    [dataIndex]: selectedValue,
                                }))
                                setPage(1)
                                close()
                            }}
                        >
                            Search
                        </Button>

                        <Button
                            size="small"
                            onClick={() => {
                                clearFilters?.()
                                setFilters((prev) => {
                                    const updated = { ...prev }
                                    delete updated[dataIndex]
                                    return updated
                                })
                                setPage(1)
                                confirm()
                                close()
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            ),
        }
    }

    const columns: ColumnsType<IPayment> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: true,
            sortOrder: getSortOrder("id", ordering),
        },
        {
            title: "User",
            dataIndex: "user_id",
            key: "user_id",
            sorter: true,
            sortOrder: getSortOrder("user_id", ordering),
            ...getColumnSearchProps("user_id"),
            render: (userId: number | null) =>
                userId === null ? (
                    "—"
                ) : (
                    <Link href={`/administration/users/${userId}`}>{userId}</Link>
                ),
        },
        {
            title: "Provider",
            dataIndex: "provider",
            key: "provider",
            render: (provider: PaymentProvider) => <Tag>{provider}</Tag>,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            sorter: true,
            sortOrder: getSortOrder("amount", ordering),
            render: (_: string, payment) => formatAmount(payment.amount, payment.currency),
        },
        {
            title: "Currency",
            dataIndex: "currency",
            key: "currency",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: true,
            sortOrder: getSortOrder("status", ordering),
            ...getSelectTableFilterDropdown(
                "status",
                filters,
                setFiltersAndResetPage,
                statusOptions,
            ),
            render: (status: PaymentStatusEnum) => <Tag color={statusColors[status]}>{status}</Tag>,
        },
        {
            title: "Purpose",
            dataIndex: "purpose",
            key: "purpose",
            ...getSelectTableFilterDropdown(
                "purpose",
                filters,
                setFiltersAndResetPage,
                purposeOptions,
            ),
            render: (purpose: PaymentPurposeEnum) => <Tag>{purpose}</Tag>,
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            sorter: true,
            sortOrder: getSortOrder("created_at", ordering),
            render: formatDate,
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            sorter: true,
            sortOrder: getSortOrder("updated_at", ordering),
            render: formatDate,
        },
    ]

    const handleTableChange = (
        pagination: TablePaginationConfig,
        _tableFilters: Record<string, FilterValue | null>,
        sorter: SorterResult<IPayment> | SorterResult<IPayment>[],
    ) => {
        setPage(pagination.current ?? 1)

        if (Array.isArray(sorter)) {
            return
        }

        const field = sorter.field as string | undefined

        if (!field || !sorter.order) {
            setOrdering([])
            return
        }

        setOrdering(sorter.order === "descend" ? [`-${field}`] : [field])
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
                pageSize: PAGE_SIZE,
                total: data?.count ?? 0,
                showSizeChanger: false,
            }}
            scroll={{ x: "max-content" }}
        />
    )
}

export default PaymentsTable
