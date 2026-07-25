"use client"

import { useMemo, useRef, useState } from "react"
import { ADMIN_USERS_URL } from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import type { IUserPrivate } from "@/entities/User.ts"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { Button, Input, type InputRef, Table, Tag } from "antd"
import type { FilterDropdownProps } from "antd/es/table/interface"

import styles from "@/app/(administration)/administration/users/styles.module.scss"
import type { Key } from "react"
import type { ColumnsType } from "antd/lib/table"
import { getSortOrder } from "@/shared/helpers/getSortOrder.ts"
import { getBooleanColumnSearchProps } from "@/widgets/TableDropdown/BooleanTableFilterDropdown/getTableBooleanFilterDropdown.tsx"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"
import RoleTag from "./ui/tags/RoleTag"
import Link from "next/link"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { useQueryClient } from "@tanstack/react-query"

interface ITableFilters {
    firstname__startswith?: string
    lastname__startswith?: string
    email__startswith?: string
    pending?: boolean
    banned?: boolean
    admin?: string
}

const USERS_ADMIN_QUERY_KEY = ["users-admin"]

const UsersTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(10)
    const [filters, setFilters] = useState<ITableFilters>({})
    const [ordering, setOrdering] = useState<string[]>(["-id"])
    const searchInput = useRef<InputRef>(null)

    const queryClient = useQueryClient()

    const { data: permissions = [] } = useCurrentUserPermissionsQuery()
    const { data: tableData, isLoading } = useTableDataQuery<IUserPrivate, ITableFilters>({
        url: ADMIN_USERS_URL,
        queryKey: USERS_ADMIN_QUERY_KEY,
        page: currentPage,
        pageSize,
        ordering,
        filters,
    })

    const permissionsActions = useMemo(() => {
        return permissions.map((p) => p.action)
    }, [permissions])
    const canPromoteAdminRole = permissionsActions.includes("admin.create")
    const canRevokeAdminRole = permissionsActions.includes("admin.delete")

    const getColumnSearchProps = <T extends keyof IUserPrivate>(dataIndex: T) => {
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

    const columns: ColumnsType<IUserPrivate> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            sorter: true,
            sortOrder: getSortOrder("id", ordering),
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
                        onRoleChanged={() =>
                            queryClient.invalidateQueries({ queryKey: USERS_ADMIN_QUERY_KEY })
                        }
                    >
                        Admin
                    </RoleTag>
                ) : (
                    <RoleTag
                        canAssignRole={canPromoteAdminRole}
                        targetUserId={record.id}
                        role={"user"}
                        onRoleChanged={() =>
                            queryClient.invalidateQueries({ queryKey: USERS_ADMIN_QUERY_KEY })
                        }
                    >
                        User
                    </RoleTag>
                ),
            ...getBooleanColumnSearchProps<ITableFilters>("admin", filters, setFilters),
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
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
            render: (value: string, record: IUserPrivate) => (
                <Link href={`/administration/users/${record.id}`}>{value}</Link>
            ),
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
            title: "Pending",
            dataIndex: "pending",
            key: "pending",
            render: (value: boolean) =>
                value ? <Tag color="gold">Yes</Tag> : <Tag color="green">No</Tag>,
            ...getBooleanColumnSearchProps<ITableFilters>("pending", filters, setFilters),
        },
        {
            title: "Banned",
            dataIndex: "banned",
            key: "banned",
            render: (value: boolean | undefined, record) =>
                value ? (
                    <Tag color="red" title={record.ban_reason ?? undefined}>
                        Yes
                    </Tag>
                ) : (
                    <Tag color="green">No</Tag>
                ),
            ...getBooleanColumnSearchProps<ITableFilters>("banned", filters, setFilters),
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

    if (isLoading || !tableData) {
        return <Loading />
    }

    return (
        <>
            <Table
                tableLayout="auto"
                dataSource={tableData.data}
                columns={columns}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: tableData?.count,
                    onChange: (page) => setCurrentPage(page),
                }}
                rowKey="id"
                rowClassName={(record) => (record.banned ? styles.bannedUserRow : "")}
                onChange={(pagination, filters, sorter) =>
                    handleTableChange(pagination, filters, sorter, setOrdering)
                }
                scroll={{ x: "max-content" }}
            />
        </>
    )
}

export default UsersTable
