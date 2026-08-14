"use client"

import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { type IWebinar, WebinarStatus } from "@entities/News.ts"
import { WEBINARS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { Button, Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import EditWebinarModal from "@app/(administration)/administration/education/(components)/EditWebinarModal.tsx"
import { getInputColumnSearchProps } from "@widgets/TableDropdown/InputTableFilterDropdown/getInputTableFilterDropdown.tsx"
import { getSortOrder } from "@shared/helpers/getSortOrder.ts"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"

interface IFilters {
    status?: WebinarStatus
    title__startswith?: string
}

const initialFilters = {}

const renderMemberOnlyTag = (value: boolean) => {
    if (value) return <Tag color={"red"}>Member only</Tag>

    return <Tag>Public webinar</Tag>
}

const WebinarsTable = () => {
    const [page, setPage] = useState<number>(1)
    const [ordering, setOrdering] = useState<string[]>(["-id"])
    const [filters, setFilters] = useState<IFilters>(initialFilters)
    const pageSize = 10

    const [selectedWebinar, setSelectedWebinar] = useState<IWebinar | null>(null)
    const [editingModalOpen, setEditingModalOpen] = useState(false)

    const { data: webinars, isLoading } = useTableDataQuery<IWebinar, IFilters>({
        url: WEBINARS_ADMIN_URL,
        queryKey: ["admin-webinars"],
        page,
        pageSize,
        ordering,
        filters,
    })

    const selectWebinarToEdit = (webinar: IWebinar) => {
        setSelectedWebinar(webinar)
        setEditingModalOpen(true)
    }

    const onClose = () => {
        setEditingModalOpen(false)
        setSelectedWebinar(null)
    }

    const tableData = webinars ? webinars.data : []

    const columns: ColumnsType<IWebinar> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            sorter: true,
            sortOrder: getSortOrder("id", ordering),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ...getInputColumnSearchProps("title", filters, setFilters),
        },
        {
            title: "Join link",
            dataIndex: "join_link",
            key: "join_link",
        },
        {
            title: "Bunny Video ID",
            dataIndex: "bunny_video_id",
            key: "bunny_video_id",
        },
        {
            title: "Starts at",
            dataIndex: "starts_at",
            key: "starts_at",
            render: (value: string) => formatDatetime(value),
        },
        {
            title: "Member only",
            dataIndex: "member_only",
            key: "member_only",
            render: renderMemberOnlyTag,
        },
        {
            title: "",
            key: "actions",
            render: (record: IWebinar) => (
                <Button onClick={() => selectWebinarToEdit(record)}>Edit webinar</Button>
            ),
        },
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={tableData}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: webinars?.count,
                    onChange: (page) => setPage(page),
                }}
                scroll={{ x: "max-content" }}
                rowKey="id"
                loading={isLoading}
                onChange={(pagination, filters, sorter) =>
                    handleTableChange(pagination, filters, sorter, setOrdering)
                }
            />
            {selectedWebinar && (
                <EditWebinarModal
                    open={editingModalOpen}
                    webinar={selectedWebinar}
                    onClose={onClose}
                />
            )}
        </>
    )
}

export default WebinarsTable
