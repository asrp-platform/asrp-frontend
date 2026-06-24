"use client"

import { message, Table, Tag } from "antd"
import { useEffect, useMemo, useState } from "react"
import { isAxiosError } from "axios"
import api from "@/axios.ts"
import type { IPaginatedBackendResponse } from "@/shared/types/interfaces.ts"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { CONTACT_MESSAGES_ADMIN_URL } from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import { ContactMessageType, type IContactMessage } from "@/entities/ContactMessage.ts"
import { getInputColumnSearchProps } from "@/widgets/TableDropdown/InputTableFilterDropdown/getInputTableFilterDropdown.tsx"
import ContactMessageReplyButton from "../ContactMessageReply/ContactMessageReplyButton"
import PermissionGuard from "@/shared/ui/PermissionGuard/PermissionGuard.tsx"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"

interface ITableFilters {
    name__startswith?: string
    email__startswith?: string
    type: ContactMessageType
}

interface IProps {
    contactMessageType: ContactMessageType
}

const initialData: IPaginatedBackendResponse<IContactMessage> = {
    count: 0,
    page: 0,
    page_size: 10,
    data: [],
}

export const ContactMessageTable = ({ contactMessageType }: IProps) => {
    const { data: permissions = [], isLoading: isPermissionsLoading } =
        useCurrentUserPermissionsQuery()

    const [isDataLoading, setIsDataLoading] = useState<boolean>(true)
    const [data, setData] = useState<IPaginatedBackendResponse<IContactMessage>>(initialData)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(10)
    const [filters, setFilters] = useState<ITableFilters>({ type: contactMessageType })

    const permissionsActions = useMemo(() => {
        return permissions.map((p) => p.action)
    }, [permissions])

    const canView = permissionsActions.includes("feedback.view")
    const canUpdate = canView && permissionsActions.includes("feedback.update")

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsDataLoading(true)
                const response = await api.get(CONTACT_MESSAGES_ADMIN_URL, {
                    params: {
                        page: currentPage,
                        page_size: pageSize,
                        ...filters,
                    },
                })
                setData(response.data)
            } catch (error) {
                if (isAxiosError(error)) {
                    const errorMessage =
                        error.response?.data?.detail || "Failed to load contact messages"

                    message.error(errorMessage)
                } else {
                    message.error("Unexpected error occurred")
                }
            } finally {
                setIsDataLoading(false)
            }
        }

        if (canView) {
            fetchData()
        }
    }, [canView, currentPage, pageSize, filters])

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getInputColumnSearchProps("email", filters, setFilters),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getInputColumnSearchProps("email", filters, setFilters),
        },
        {
            title: "Subject",
            render: (_: string, record: IContactMessage) => record.message_content?.subject,
        },
        {
            title: "Message",
            render: (_: string, record: IContactMessage) => record.message_content?.contact_message,
        },
        {
            title: "Answered",
            render: (_: unknown, record: IContactMessage) =>
                record.answered ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
        },
        { title: "Created", dataIndex: "created_at" },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, record: IContactMessage) => (
                <ContactMessageReplyButton
                    messageId={record.id}
                    disabled={record.answered || !canUpdate}
                />
            ),
        },
    ]

    if (isPermissionsLoading) {
        return <Loading />
    }

    if (!canView) {
        return <PermissionGuard allowed={false} />
    }

    if (isDataLoading) {
        return <Loading />
    }

    return (
        <Table
            columns={columns}
            dataSource={data.data}
            pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: data?.count,
                onChange: (page) => setCurrentPage(page),
            }}
            rowKey="id"
        />
    )
}
