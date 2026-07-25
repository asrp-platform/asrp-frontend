"use client"

import { message, Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
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

const renderBooleanTag = (value: boolean | undefined) =>
    value ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>

const renderTagList = (values: string[] | undefined) =>
    values?.length
        ? values.map((value) => (
              <Tag key={value} style={{ marginBottom: 4 }}>
                  {value}
              </Tag>
          ))
        : null

const messageContentColumnsByType: Record<ContactMessageType, ColumnsType<IContactMessage>> = {
    [ContactMessageType.Contact]: [
        {
            title: "Subject",
            render: (_: unknown, record) => record.message_content?.subject,
        },
        {
            title: "Message",
            render: (_: unknown, record) => record.message_content?.contact_message,
        },
    ],
    [ContactMessageType.GetInvolved]: [
        {
            title: "Current Role",
            render: (_: unknown, record) => record.message_content?.current_role,
        },
        {
            title: "Institution / Location",
            render: (_: unknown, record) => record.message_content?.institution_location,
        },
        {
            title: "Areas",
            render: (_: unknown, record) => renderTagList(record.message_content?.areas),
        },
        {
            title: "Ideas",
            render: (_: unknown, record) => record.message_content?.ideas,
        },
        {
            title: "Committee Work",
            render: (_: unknown, record) =>
                renderBooleanTag(record.message_content?.future_committee_working),
        },
        {
            title: "Leadership",
            render: (_: unknown, record) =>
                renderBooleanTag(record.message_content?.future_leadership_positions),
        },
        {
            title: "Updates",
            render: (_: unknown, record) =>
                renderBooleanTag(record.message_content?.receive_updates),
        },
    ],
    [ContactMessageType.GetInvolvedCommittees]: [
        {
            title: "Role / Affiliation",
            render: (_: unknown, record) => record.message_content?.role_affiliation,
        },
        {
            title: "Message",
            render: (_: unknown, record) => record.message_content?.get_involved_message,
        },
    ],
    [ContactMessageType.DonationSponsorship]: [
        {
            title: "Organization",
            render: (_: unknown, record) => record.message_content?.organization,
        },
        {
            title: "Donation Type",
            render: (_: unknown, record) => record.message_content?.donation_type,
        },
        {
            title: "Message",
            render: (_: unknown, record) => record.message_content?.message,
        },
    ],
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

    const columns: ColumnsType<IContactMessage> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getInputColumnSearchProps("name", filters, setFilters),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getInputColumnSearchProps("email", filters, setFilters),
        },
        ...messageContentColumnsByType[contactMessageType],
        {
            title: "Answered",
            render: (_: unknown, record: IContactMessage) => renderBooleanTag(record.answered),
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
            scroll={{ x: "max-content" }}
            rowKey="id"
        />
    )
}
