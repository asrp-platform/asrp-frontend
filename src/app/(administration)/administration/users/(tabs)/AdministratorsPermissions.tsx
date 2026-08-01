"use client"

import { useState } from "react"
import {
    getAdminUserPermissionsUrl,
    PERMISSIONS_LIST_URL,
    ADMIN_USERS_URL,
} from "@shared/backend/restApiUrls/adminApiUrls.ts"
import api from "@/axios.ts"
import type { IUserPrivate } from "@/entities/User.ts"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { Button, Card, Flex, message, Table, Tag } from "antd"
import Link from "next/link"
import type { ColumnsType } from "antd/lib/table"
import { getInputColumnSearchProps } from "@/widgets/TableDropdown/InputTableFilterDropdown/getInputTableFilterDropdown.tsx"
import type { IPermission } from "@/entities/Permission.ts"
import AdminCard from "@app/(administration)/administration/users/(tabs)/ui/AdminCard.tsx"
import UserPermissionsCard from "@app/(administration)/administration/users/(tabs)/ui/AdminPermissionsCard.tsx"
import styles from "@app/(administration)/administration/users/(tabs)/ui/AdminCards.module.scss"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
import { handleRequestError } from "@shared/helpers/handleStatusError.ts"
import { CloseOutlined } from "@ant-design/icons"

interface ITableFilters {
    firstname__startswith?: string
    lastname__startswith?: string
    email__startswith?: string
    admin?: boolean
}

const AdministratorsPermissions = () => {
    const { data: currentUserPermissions = [], isLoading: isCurrentUserPermissionsLoading } =
        useCurrentUserPermissionsQuery()

    const [page, setPage] = useState<number>(1)
    const [pageSize] = useState<number>(10)
    const [ordering] = useState<string[]>([])
    const [filters, setFilters] = useState<ITableFilters>({ admin: true })

    const [selectedUser, setSelectedUser] = useState<IUserPrivate | null>(null)

    const [checkedPermissions, setCheckedPermissions] = useState<number[]>([])

    const canManagePermissions = currentUserPermissions
        .map((p) => p.action)
        .includes("permissions.update")

    const { data: allPermissions = [], isLoading: isPermissionsLoading } = useQuery({
        queryKey: ["all-permissions-list"],
        queryFn: async () => {
            const result = await api.get<IPermission[]>(PERMISSIONS_LIST_URL)
            return result.data
        },
    })

    const { data: tableData, isLoading: isTableDataLoading } = useTableDataQuery<
        IUserPrivate,
        ITableFilters
    >({
        url: ADMIN_USERS_URL,
        queryKey: ["permissions"],
        page,
        pageSize,
        ordering,
        filters,
    })

    const fetchPermissions = async (user: IUserPrivate) => {
        try {
            const response = await api.get<IPermission[]>(getAdminUserPermissionsUrl(user.id))
            setCheckedPermissions(response.data.map((p) => p.id))
        } catch (error) {
            handleRequestError(error, {
                404: "User with provided ID not found",
            })
        }
    }

    const { mutate: updatePermissions, isPending } = useMutation({
        mutationFn: async () => {
            if (!selectedUser) return
            await api.put(getAdminUserPermissionsUrl(selectedUser.id), checkedPermissions)
        },
        onSuccess: () => message.success("Permissions updated successfully."),
        onError: (error) => {
            handleRequestError(error, {
                404: "User with provided ID not found",
            })
        },
    })

    const columns: ColumnsType<IUserPrivate> = [
        {
            title: "",
            dataIndex: "id",
            key: "manage_column",
            width: 80,
            render: (_, record) => {
                if (isCurrentUserPermissionsLoading) return
                return (
                    <Button
                        disabled={!canManagePermissions}
                        onClick={() => {
                            setSelectedUser(record)
                            fetchPermissions(record)
                        }}
                    >
                        Manage
                    </Button>
                )
            },
        },
        {
            title: "Firstname",
            dataIndex: "firstname",
            key: "firstname",
            sorter: true,
            ...getInputColumnSearchProps("firstname", filters, setFilters),
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
            ...getInputColumnSearchProps("lastname", filters, setFilters),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (value, record: IUserPrivate) => (
                <Link href={`/administration/users/${record.id}`}>{value}</Link>
            ),
            ...getInputColumnSearchProps("email", filters, setFilters),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Admin",
            key: "admin",
            render: (_, record) =>
                record.admin ? <Tag color="volcano">Admin</Tag> : <Tag color="blue">Member</Tag>,
        },
    ]

    if (isTableDataLoading || !tableData) {
        return <Loading />
    }

    return (
        <>
            <Table
                dataSource={tableData.data}
                columns={columns}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: tableData?.count,
                    onChange: (page) => setPage(page),
                }}
                rowKey="id"
            />
            {selectedUser && (
                <Card
                    extra={
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={() => setSelectedUser(null)}
                            aria-label="Close permissions card"
                        />
                    }
                >
                    <Flex gap={20} align="start" wrap className={styles.adminPermissionsPanel}>
                        <AdminCard user={selectedUser} />
                        <UserPermissionsCard
                            allPermissions={allPermissions}
                            checkedPermissions={checkedPermissions}
                            setCheckedPermissions={setCheckedPermissions}
                            loading={isPermissionsLoading}
                            onSave={updatePermissions}
                            isPermissionsUpdating={isPending}
                        />
                    </Flex>
                </Card>
            )}
        </>
    )
}

export default AdministratorsPermissions
