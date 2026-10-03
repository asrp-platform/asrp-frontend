"use client"

import { Button, Popconfirm, Table, Tag, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TablePaginationConfig } from "antd/es/table/interface"
import { EyeOff, ExternalLink, Trash2 } from "lucide-react"
import Link from "next/link"
import { type SetStateAction } from "react"

import type { News } from "@entities/News.ts"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import { getSortOrder } from "@shared/helpers/getSortOrder.ts"
import { getInputColumnSearchProps } from "@widgets/TableDropdown/InputTableFilterDropdown/getInputTableFilterDropdown.tsx"

import type { NewsFilterValues } from "../types.ts"
import styles from "./NewsTable.module.scss"

interface NewsTableProps {
    data: News[]
    filters: NewsFilterValues
    page: number
    pageSize: number
    total: number
    ordering: string[]
    loading: boolean
    canUpdate: boolean
    canDelete: boolean
    deletingId: number | null
    unpublishingId: number | null
    onPageChange: (page: number) => void
    onOrderingChange: (ordering: string[]) => void
    onFiltersChange: (filters: NewsFilterValues) => void
    onDelete: (news: News) => void
    onUnpublish: (news: News) => void
}

const NewsTable = ({
    data,
    filters,
    page,
    pageSize,
    total,
    ordering,
    loading,
    canUpdate,
    canDelete,
    deletingId,
    unpublishingId,
    onPageChange,
    onOrderingChange,
    onFiltersChange,
    onDelete,
    onUnpublish,
}: NewsTableProps) => {
    const applyFilters = (next: SetStateAction<NewsFilterValues>) => {
        onFiltersChange(typeof next === "function" ? next(filters) : next)
    }

    const applyOrdering = (next: SetStateAction<string[]>) => {
        onOrderingChange(typeof next === "function" ? next(ordering) : next)
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
            ...getInputColumnSearchProps("title", filters, applyFilters),
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
            ...getInputColumnSearchProps("when", filters, applyFilters),
            render: (value: string | null) => value || "—",
        },
        {
            title: "Where",
            dataIndex: "where",
            key: "where",
            width: 180,
            ...getInputColumnSearchProps("where", filters, applyFilters),
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
                                  onConfirm={() => onUnpublish(news)}
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
                              onConfirm={() => onDelete(news)}
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

    return (
        <div className={styles.tableCard}>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                scroll={{ x: "max-content" }}
                pagination={{
                    current: page,
                    pageSize,
                    total,
                    showSizeChanger: false,
                    showTotal: (rangeTotal, range) => `${range[0]}–${range[1]} of ${rangeTotal}`,
                    onChange: onPageChange,
                }}
                onChange={(pagination: TablePaginationConfig, tableFilters, sorter) =>
                    handleTableChange(pagination, tableFilters, sorter, applyOrdering)
                }
            />
        </div>
    )
}

export default NewsTable
