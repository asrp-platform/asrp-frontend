"use client"

import {
    Button,
    DatePicker,
    Flex,
    message,
    Popconfirm,
    Select,
    Space,
    Table,
    Tag,
    Tooltip,
} from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TablePaginationConfig } from "antd/es/table/interface"
import { useQueryClient } from "@tanstack/react-query"
import type { Dayjs } from "dayjs"
import { EyeOff, ExternalLink, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import api from "@/axios.ts"
import type { News } from "@entities/News.ts"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { getNewsDetailAdminUrl, NEWS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import { getSortOrder } from "@shared/helpers/getSortOrder.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import { DEFAULT_PAGE_SIZE } from "@shared/options.ts"
import PermissionGuard from "@shared/ui/PermissionGuard/PermissionGuard.tsx"
import { getInputColumnSearchProps } from "@widgets/TableDropdown/InputTableFilterDropdown/getInputTableFilterDropdown.tsx"

import styles from "./styles.module.scss"

interface NewsFilters {
    title__startswith?: string
    where__startswith?: string
    when__startswith?: string
    is_published?: boolean
    created_at__gte?: string
    created_at__lte?: string
}

const QUERY_KEY = ["admin-news-management"]

const NewsTable = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    const [ordering, setOrdering] = useState<string[]>(["-created_at"])
    const [filters, setFilters] = useState<NewsFilters>({})
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [unpublishingId, setUnpublishingId] = useState<number | null>(null)
    const { data: permissions = [], isLoading: permissionsLoading } =
        useCurrentUserPermissionsQuery()
    const permissionActions = useMemo(() => permissions.map(({ action }) => action), [permissions])
    const canView = permissionActions.includes("news.view")
    const canUpdate = permissionActions.includes("news.update")
    const canDelete = permissionActions.includes("news.delete")

    const { data, isLoading, isFetching } = useTableDataQuery<News, NewsFilters>({
        url: NEWS_ADMIN_URL,
        queryKey: QUERY_KEY,
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        ordering,
        filters,
        enabled: canView,
    })

    useEffect(() => setPage(1), [filters])

    const setCreatedRange = (dates: null | [Dayjs | null, Dayjs | null]) => {
        setFilters((current) => {
            const next = { ...current }
            if (dates?.[0] && dates[1]) {
                next.created_at__gte = dates[0].startOf("day").toISOString()
                next.created_at__lte = dates[1].endOf("day").toISOString()
            } else {
                delete next.created_at__gte
                delete next.created_at__lte
            }
            return next
        })
    }

    const deleteNews = async (news: News) => {
        setDeletingId(news.id)
        try {
            await api.delete(getNewsDetailAdminUrl(news.id))
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ["news"] }),
            ])
            message.success(`“${news.title}” deleted.`)
        } catch (error) {
            handleApiError({ error })
        } finally {
            setDeletingId(null)
        }
    }

    const unpublishNews = async (news: News) => {
        setUnpublishingId(news.id)
        try {
            await api.patch(getNewsDetailAdminUrl(news.id), { is_published: false })
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ["news"] }),
            ])
            message.success(`“${news.title}” is now a draft.`)
        } catch (error) {
            handleApiError({ error })
        } finally {
            setUnpublishingId(null)
        }
    }

    const columns: ColumnsType<News> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 76,
            sorter: true,
            sortOrder: getSortOrder("id", ordering),
        },
        {
            title: "Cover",
            dataIndex: "cover_url",
            key: "cover_url",
            width: 94,
            render: (coverUrl: string | null) =>
                coverUrl ? (
                    <img className={styles.cover} src={coverUrl} alt="" />
                ) : (
                    <span className={styles.coverPlaceholder}>No cover</span>
                ),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: 320,
            sorter: true,
            sortOrder: getSortOrder("title", ordering),
            ...getInputColumnSearchProps("title", filters, setFilters),
            render: (title: string) => <strong className={styles.title}>{title}</strong>,
        },
        {
            title: "Publication",
            dataIndex: "is_published",
            key: "is_published",
            width: 125,
            sorter: true,
            sortOrder: getSortOrder("is_published", ordering),
            render: (published: boolean) =>
                published ? <Tag color="green">Published</Tag> : <Tag color="gold">Draft</Tag>,
        },
        {
            title: "When",
            dataIndex: "when",
            key: "when",
            width: 180,
            ...getInputColumnSearchProps("when", filters, setFilters),
            render: (value: string | null) => value || "—",
        },
        {
            title: "Where",
            dataIndex: "where",
            key: "where",
            width: 180,
            ...getInputColumnSearchProps("where", filters, setFilters),
            render: (value: string | null) => value || "—",
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
            width: 175,
            sorter: true,
            sortOrder: getSortOrder("created_at", ordering),
            render: (value: string) => formatDatetime(value),
        },
        {
            title: "Updated",
            dataIndex: "updated_at",
            key: "updated_at",
            width: 175,
            sorter: true,
            sortOrder: getSortOrder("updated_at", ordering),
            render: (value: string) => formatDatetime(value),
        },
        {
            title: "Article",
            key: "article",
            fixed: "right",
            width: 115,
            render: (_, news) =>
                news.is_published ? (
                    <Link
                        href={`/news-and-events/${news.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.articleLink}
                    >
                        Open <ExternalLink size={14} />
                    </Link>
                ) : (
                    <Tooltip title="Publish the article to make its public page available">
                        <span className={styles.unavailableLink}>Draft</span>
                    </Tooltip>
                ),
        },
        ...(canUpdate
            ? [
                  {
                      title: "",
                      key: "unpublish",
                      fixed: "right" as const,
                      width: 58,
                      render: (_: unknown, news: News) =>
                          news.is_published ? (
                              <Popconfirm
                                  title="Unpublish this article?"
                                  description="The public article page will become unavailable."
                                  okText="Unpublish"
                                  cancelText="Cancel"
                                  okButtonProps={{ danger: true }}
                                  onConfirm={() => unpublishNews(news)}
                              >
                                  <Tooltip title="Unpublish article">
                                      <Button
                                          aria-label={`Unpublish ${news.title}`}
                                          icon={<EyeOff size={15} />}
                                          loading={unpublishingId === news.id}
                                      />
                                  </Tooltip>
                              </Popconfirm>
                          ) : null,
                  },
              ]
            : []),
        ...(canDelete
            ? [
                  {
                      title: "",
                      key: "delete",
                      fixed: "right" as const,
                      width: 58,
                      render: (_: unknown, news: News) => (
                          <Popconfirm
                              title="Delete this article?"
                              description="Its cover and content images will also be removed."
                              okText="Delete"
                              cancelText="Cancel"
                              okButtonProps={{ danger: true }}
                              onConfirm={() => deleteNews(news)}
                          >
                              <Tooltip title="Delete article">
                                  <Button
                                      danger
                                      aria-label={`Delete ${news.title}`}
                                      icon={<Trash2 size={15} />}
                                      loading={deletingId === news.id}
                                  />
                              </Tooltip>
                          </Popconfirm>
                      ),
                  },
              ]
            : []),
    ]

    if (!permissionsLoading && !canView) return <PermissionGuard allowed={false} />

    return (
        <div className={styles.tableCard}>
            <Flex gap={12} wrap="wrap" justify="space-between" className={styles.toolbar}>
                <Space wrap>
                    <Select
                        value={filters.is_published}
                        allowClear
                        placeholder="All publication states"
                        className={styles.statusFilter}
                        options={[
                            { label: "Published", value: true },
                            { label: "Draft", value: false },
                        ]}
                        onChange={(is_published) =>
                            setFilters((current) => ({ ...current, is_published }))
                        }
                    />
                    <DatePicker.RangePicker
                        allowClear
                        placeholder={["Created from", "Created to"]}
                        onChange={(dates) => setCreatedRange(dates)}
                    />
                </Space>
                <Tag>{data?.count ?? 0} articles</Tag>
            </Flex>

            <Table
                columns={columns}
                dataSource={data?.data ?? []}
                rowKey="id"
                loading={permissionsLoading || isLoading || isFetching}
                scroll={{ x: "max-content" }}
                pagination={{
                    current: page,
                    pageSize: DEFAULT_PAGE_SIZE,
                    total: data?.count,
                    showSizeChanger: false,
                    showTotal: (total, range) => `${range[0]}–${range[1]} of ${total}`,
                    onChange: setPage,
                }}
                onChange={(pagination: TablePaginationConfig, tableFilters, sorter) =>
                    handleTableChange(pagination, tableFilters, sorter, setOrdering)
                }
            />
        </div>
    )
}

export default NewsTable
