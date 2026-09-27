"use client"

import { Button, Table, Tag, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Pencil } from "lucide-react"
import { useState, type SetStateAction } from "react"

import EditWebinarModal from "@app/(administration)/administration/content/(tabs)/WebinarsTab/components/EditWebinarModal/EditWebinarModal.tsx"
import WebinarRegistrationsModal from "@app/(administration)/administration/content/(tabs)/WebinarsTab/components/WebinarRegistrationsModal.tsx"
import type { IWebinar } from "@entities/News.ts"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import { getSortOrder } from "@shared/helpers/getSortOrder.ts"
import { getInputColumnSearchProps } from "@widgets/TableDropdown/InputTableFilterDropdown/getInputTableFilterDropdown.tsx"

import type { WebinarFilterValues } from "../types.ts"

interface WebinarsTableProps {
    data: IWebinar[]
    filters: WebinarFilterValues
    page: number
    pageSize: number
    total: number
    ordering: string[]
    loading: boolean
    onPageChange: (page: number) => void
    onOrderingChange: (ordering: string[]) => void
    onFiltersChange: (filters: WebinarFilterValues) => void
}

const isPastWebinar = (webinar: IWebinar) =>
    new Date(webinar.ends_at || webinar.starts_at).getTime() <= Date.now()

const renderMemberOnlyTag = (value: boolean) =>
    value ? <Tag color="red">Member only</Tag> : <Tag>Public webinar</Tag>

const WebinarsTable = ({
    data,
    filters,
    page,
    pageSize,
    total,
    ordering,
    loading,
    onPageChange,
    onOrderingChange,
    onFiltersChange,
}: WebinarsTableProps) => {
    const [selectedWebinar, setSelectedWebinar] = useState<IWebinar | null>(null)

    const applyFilters = (next: SetStateAction<WebinarFilterValues>) => {
        onFiltersChange(typeof next === "function" ? next(filters) : next)
    }

    const applyOrdering = (next: SetStateAction<string[]>) => {
        onOrderingChange(typeof next === "function" ? next(ordering) : next)
    }

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
            width: 280,
            ...getInputColumnSearchProps("title", filters, applyFilters),
        },
        {
            title: "Status",
            key: "status",
            render: (_, webinar) =>
                isPastWebinar(webinar) ? <Tag>Past</Tag> : <Tag color="green">Upcoming</Tag>,
        },
        {
            title: "Starts at",
            dataIndex: "starts_at",
            key: "starts_at",
            sorter: true,
            sortOrder: getSortOrder("starts_at", ordering),
            render: (value: string, webinar) => formatDatetime(value, [], webinar.timezone),
        },
        {
            title: "Language",
            dataIndex: "language",
            key: "language",
            render: (value: string | null) => value || "-",
        },
        {
            title: "Access",
            dataIndex: "member_only",
            key: "member_only",
            render: renderMemberOnlyTag,
        },
        {
            title: "Archive",
            dataIndex: "archived",
            key: "archived",
            render: (value: boolean) =>
                value ? <Tag color="gold">Archived</Tag> : <Tag color="blue">Active</Tag>,
        },
        {
            title: "Registered users",
            key: "actions",
            fixed: "right",
            render: (_, webinar) => <WebinarRegistrationsModal webinar={webinar} />,
        },
        {
            title: "",
            key: "edit",
            fixed: "right",
            render: (record: IWebinar) => (
                <Tooltip title="Edit webinar">
                    <Button
                        aria-label={`Edit ${record.title}`}
                        icon={<Pencil size={15} />}
                        onClick={() => setSelectedWebinar(record)}
                    />
                </Tooltip>
            ),
        },
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    current: page,
                    pageSize,
                    total,
                    onChange: onPageChange,
                }}
                scroll={{ x: "max-content" }}
                rowKey="id"
                loading={loading}
                onChange={(pagination, tableFilters, sorter) =>
                    handleTableChange(pagination, tableFilters, sorter, applyOrdering)
                }
            />

            {selectedWebinar && (
                <EditWebinarModal
                    open
                    webinar={selectedWebinar}
                    onClose={() => setSelectedWebinar(null)}
                />
            )}
        </>
    )
}

export default WebinarsTable
