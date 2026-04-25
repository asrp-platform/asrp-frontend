"use client"

import { useEffect, useRef, useState } from "react"
import { ADMIN_USERS_URL } from "@/shared/backend/rest-api-urls/admin/adminApiUrls.ts"
import type { IPaginatedBackendResponse } from "@/shared/types/interfaces.ts"
import api from "@/axios.ts"
import type { IUser } from "@/entities/User.ts"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { Button, Input, type InputRef, Table, Tag } from "antd"
import type {
    FilterDropdownProps,
    FilterValue,
    SorterResult,
    TablePaginationConfig,
} from "antd/es/table/interface"

import styles from "@/app/(administration)/administration/users/styles.module.scss"
import type { Key } from "react"
import type { ColumnsType } from "antd/lib/table"
import { getSortOrder } from "@/shared/helpers/getSortOrder.ts"
import { getBooleanColumnSearchProps } from "@/widgets/TableDropdown/BooleanTableFilterDropdown/getTableBooleanFilterDropdown.tsx"
import { usePermissions } from "@/context/PermissionsProvider.tsx"
import RoleTag from "@/app/(administration)/administration/users/tabs/ui/tags/RoleTag.tsx"

interface ITableFilters {
    firstname__startswith?: string
    lastname__startswith?: string
    email__startswith?: string
    pending?: boolean
    admin?: string
}

const UsersTable = () => {
    const { permissions } = usePermissions()

    const [isLoading, setIsLoading] = useState(true)
    const [tableData, setTableData] = useState<IPaginatedBackendResponse<IUser> | null>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(10)

    const [filters, setFilters] = useState<ITableFilters>({})
    const [ordering, setOrdering] = useState<string[]>([])
    const searchInput = useRef<InputRef>(null)

    const canPromoteAdminRole = permissions.includes("admin.create")
    const canRevokeAdminRole = permissions.includes("admin.delete")

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true)
                console.log(ordering)
                const response = await api.get<IPaginatedBackendResponse<IUser>>(
                    `${ADMIN_USERS_URL}`,
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

        fetchUsers()
    }, [setTableData, pageSize, currentPage, filters, ordering])

    const getColumnSearchProps = <T extends keyof IUser>(dataIndex: T) => {
        const filterKey = `${String(dataIndex)}__startswith` as keyof ITableFilters
        const value = filters[filterKey]

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
                        placeholder={`Search ${String(dataIndex)}`}
                        value={selectedKeys[0] as string}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => {
                            confirm()
                            setFilters((prev) => ({
                                ...prev,
                                [filterKey]: selectedKeys[0] as string,
                            }))
                            close()
                        }}
                    />

                    <div className={styles.searchFilterDropdownButtonContainer}>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                                confirm()
                                setFilters((prev) => ({
                                    ...prev,
                                    [filterKey]: selectedKeys[0] as string,
                                }))
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
                                    delete updated[filterKey]
                                    return updated
                                })
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

    const columns: ColumnsType<IUser> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Firstname",
            dataIndex: "firstname",
            key: "firstname",
            sorter: true,
            sortOrder: getSortOrder("firstname", ordering),
            ...getColumnSearchProps("firstname"),
        },
        {
            title: "Middlename",
            dataIndex: "middlename",
            key: "middlename",
            render: (value) => value ?? "—",
        },
        {
            title: "Lastname",
            dataIndex: "lastname",
            key: "lastname",
            sorter: true,
            sortOrder: getSortOrder("lastname", ordering),
            ...getColumnSearchProps("lastname"),
        },
        {
            title: "Suffix",
            dataIndex: "suffix",
            key: "suffix",
            render: (value) => value ?? "—",
        },
        {
            title: "Credentials",
            dataIndex: "credentials",
            key: "credentials",
            render: (value) => value ?? "—",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Phone",
            dataIndex: "phone_number",
            key: "phone_number",
            render: (value) => value ?? "—",
        },
        {
            title: "Telegram",
            dataIndex: "telegram_username",
            key: "telegram_username",
            render: (value) => (value ? `@${value}` : "—"),
        },
        {
            title: "Institution",
            dataIndex: "institution",
            key: "institution",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
        },
        {
            title: "State",
            dataIndex: "state",
            key: "state",
            render: (value) => value ?? "—",
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "Admin",
            key: "Admin",
            render: (_, record) =>
                record.admin ? (
                    <RoleTag
                        canAssignRole={canRevokeAdminRole}
                        targetUserId={record.id}
                        role={"admin"}
                    >
                        Admin
                    </RoleTag>
                ) : (
                    <RoleTag
                        canAssignRole={canPromoteAdminRole}
                        targetUserId={record.id}
                        role={"member"}
                    >
                        Member
                    </RoleTag>
                ),
            ...getBooleanColumnSearchProps<ITableFilters>("admin", filters, setFilters),
        },
        {
            title: "Pending",
            dataIndex: "pending",
            key: "pending",
            render: (value: boolean) =>
                value ? <Tag color="gold">Yes</Tag> : <Tag color="green">No</Tag>,
            ...getBooleanColumnSearchProps<ITableFilters>("pending", filters, setFilters),
        },

        {
            title: "Email Confirmed",
            dataIndex: "email_confirmed",
            key: "email_confirmed",
            render: (value: boolean) =>
                value ? <Tag color="green">Confirmed</Tag> : <Tag color="red">Not Confirmed</Tag>,
            ...getBooleanColumnSearchProps<ITableFilters>("email_confirmed", filters, setFilters),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            sorter: true,
            sortOrder: getSortOrder("created_at", ordering),
            render: (value: string) => new Date(value).toLocaleString(),
        },
        {
            title: "Last Password Change",
            dataIndex: "last_password_change",
            key: "last_password_change",
            render: (value: string | null) => (value ? new Date(value).toLocaleString() : "—"),
        },
    ]

    const handleTableChange = (
        _pagination: TablePaginationConfig,
        _filters: Record<string, FilterValue | null>,
        sorter: SorterResult<IUser> | SorterResult<IUser>[],
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
            // сортировка сброшена (кликнули 3-й раз)
            setOrdering([])
        }
    }

    if (isLoading || !tableData) {
        return <Loading />
    }

    return (
        <>
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
            {/*<PromoteToAdminModal />*/}
        </>
    )
}

export default UsersTable
