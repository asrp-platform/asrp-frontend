"use client"

import { useEffect, useState } from "react"
import {
    getUserPermissionsStuffUrl,
    PERMISSIONS_LIST_URL,
    STUFF_USERS_URL,
} from "../../../../../shared/backend/adminApiUrls.ts"
import type { IPaginatedBackendResponse } from "../../../../../shared/types/interfaces.ts"
import api from "../../../../../axios.ts"
import type { IUser } from "../../../../../entities/User.ts"
import Loading from "../../../../(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { Button, Flex, Table, Tag } from "antd"
import Link from "next/link"
import type { ColumnsType } from "antd/lib/table"
import { getInputColumnSearchProps } from "../../../../../widgets/TableDropdown/InputTableFilterDropdown/getInputTableFilterDropdown.tsx"
import AdminCard from "./ui/AdminCard.tsx"
import type { IPermission } from "../../../../../entities/Permission.ts"
import UserPermissionsCard from "./ui/AdminPermissionsCard.tsx"

interface ITableFilters {
    firstname__startswith?: string
    lastname__startswith?: string
    email__startswith?: string
    pending?: boolean
    stuff?: boolean
}

const AdministratorsPermissions = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [tableData, setTableData] = useState<IPaginatedBackendResponse<IUser> | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(10)
    const [filters, setFilters] = useState<ITableFilters>({ stuff: true })

    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

    const [allPermissions, setAllPermissions] = useState<IPermission[]>([])
    const [selectedUserPermissions, setSelectedUserPermissions] = useState<IPermission[]>([])
    const [checkedPermissions, setCheckedPermissions] = useState<number[]>([])
    const [permissionsLoading, setPermissionsLoading] = useState(false)

    const fetchPermissions = async (user: IUser) => {
        try {
            setPermissionsLoading(true)

            const response = await api.get<IPermission[]>(getUserPermissionsStuffUrl(user.id))

            setSelectedUserPermissions(response.data)

            setCheckedPermissions(response.data.map((p) => p.id))
        } catch (error) {
            console.error(error)
        } finally {
            setPermissionsLoading(false)
        }
    }

    const updatePermissions = async () => {
        if (!selectedUser) return

        try {
            await api.put(getUserPermissionsStuffUrl(selectedUser.id), checkedPermissions)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true)
                const response = await api.get<IPaginatedBackendResponse<IUser>>(
                    `${STUFF_USERS_URL}`,
                    {
                        params: {
                            page: currentPage,
                            page_size: pageSize,
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

        fetchUsers()
    }, [setTableData, pageSize, currentPage, filters])

    useEffect(() => {
        const fetchAllPermissions = async () => {
            try {
                const res = await api.get<IPermission[]>(PERMISSIONS_LIST_URL)
                setAllPermissions(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchAllPermissions()
    }, [])

    const columns: ColumnsType<IUser> = [
        {
            title: "",
            dataIndex: "id",
            key: "manage_column",
            width: 80,
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setSelectedUser(record)
                        fetchPermissions(record)
                    }}
                >
                    Manage
                </Button>
            ),
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
            render: (text, record: IUser) => (
                <Link href={`/users/${record.id}/profile`}>{text}</Link>
            ),
            ...getInputColumnSearchProps("email", filters, setFilters),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Stuff",
            key: "Stuff",
            render: (_, record) =>
                record.stuff ? <Tag color="volcano">Admin</Tag> : <Tag color="blue">Member</Tag>,
        },
    ]

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
            />
            {selectedUser && (
                <Flex gap={20} align="start">
                    <AdminCard user={selectedUser} />
                    <UserPermissionsCard
                        allPermissions={allPermissions}
                        selectedUserPermissions={selectedUserPermissions}
                        checkedPermissions={checkedPermissions}
                        setCheckedPermissions={setCheckedPermissions}
                        loading={permissionsLoading}
                        onSave={updatePermissions}
                    />
                </Flex>
            )}
        </>
    )
}

export default AdministratorsPermissions
