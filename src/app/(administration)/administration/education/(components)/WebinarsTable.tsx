"use client"

import { Button, Flex, Select, Space, Table, Tag, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Pencil } from "lucide-react"
import { useState } from "react"

import EditWebinarModal from "@app/(administration)/administration/education/(components)/EditWebinarModal.tsx"
import WebinarRegistrationsModal from "@app/(administration)/administration/education/(components)/WebinarRegistrationsModal.tsx"
import { type IWebinar, WebinarStatus } from "@entities/News.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { WEBINARS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import { getSortOrder } from "@shared/helpers/getSortOrder.ts"
import { getInputColumnSearchProps } from "@widgets/TableDropdown/InputTableFilterDropdown/getInputTableFilterDropdown.tsx"
import { DEFAULT_PAGE_SIZE } from "@shared/options.ts"

interface IFilters {
    status?: WebinarStatus
    title__startswith?: string
    archived?: boolean
}

const initialFilters: IFilters = {}

const isPastWebinar = (webinar: IWebinar) =>
    new Date(webinar.ends_at || webinar.starts_at).getTime() <= Date.now()

const renderMemberOnlyTag = (value: boolean) =>
    value ? <Tag color="red">Member only</Tag> : <Tag>Public webinar</Tag>

const WebinarsTable = () => {
    const [page, setPage] = useState(1)
    const [ordering, setOrdering] = useState<string[]>(["-id"])
    const [filters, setFilters] = useState<IFilters>(initialFilters)
    const [selectedWebinar, setSelectedWebinar] = useState<IWebinar | null>(null)
    const pageSize = DEFAULT_PAGE_SIZE

    const { data: webinars, isLoading } = useTableDataQuery<IWebinar, IFilters>({
        url: WEBINARS_ADMIN_URL,
        queryKey: ["admin-webinars"],
        page,
        pageSize,
        ordering,
        filters,
    })

    const updateFilters = (nextFilters: Partial<IFilters>) => {
        setPage(1)
        setFilters((current) => ({ ...current, ...nextFilters }))
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
            ...getInputColumnSearchProps("title", filters, setFilters),
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
            <Flex gap={12} wrap="wrap" justify="space-between" style={{ marginBottom: 16 }}>
                <Space wrap>
                    <Select
                        value={filters.status}
                        allowClear
                        placeholder="All statuses"
                        style={{ width: 180 }}
                        options={[
                            { label: "Upcoming", value: WebinarStatus.UPCOMING },
                            { label: "Past", value: WebinarStatus.PAST },
                        ]}
                        onChange={(status) => updateFilters({ status })}
                    />
                    <Select
                        value={filters.archived}
                        allowClear
                        placeholder="All archive states"
                        style={{ width: 190 }}
                        options={[
                            { label: "Active", value: false },
                            { label: "Archived", value: true },
                        ]}
                        onChange={(archived) => updateFilters({ archived })}
                    />
                </Space>
                <Tag>{webinars?.count ?? 0} webinars</Tag>
            </Flex>

            <Table
                columns={columns}
                dataSource={webinars?.data ?? []}
                pagination={{
                    current: page,
                    pageSize,
                    total: webinars?.count,
                    onChange: setPage,
                }}
                scroll={{ x: "max-content" }}
                rowKey="id"
                loading={isLoading}
                onChange={(pagination, tableFilters, sorter) =>
                    handleTableChange(pagination, tableFilters, sorter, setOrdering)
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
