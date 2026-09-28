"use client"

import { Button, Table, Tag, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Pencil } from "lucide-react"
import type { SetStateAction } from "react"

import type { CaseOfTheMonth } from "@entities/CaseOfTheMonth.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import { getSortOrder } from "@shared/helpers/getSortOrder.ts"
import { handleTableChange } from "@shared/helpers/antdTableHelpers.ts"

import styles from "./CasesTable.module.scss"

interface IProps {
    data: CaseOfTheMonth[]
    page: number
    pageSize: number
    total: number
    ordering: string[]
    loading: boolean
    onPageChange: (page: number) => void
    onOrderingChange: (ordering: string[]) => void
    onEdit: (caseItem: CaseOfTheMonth) => void
}

const formatPublicationMonth = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(value))

const CasesTable = ({
    data,
    page,
    pageSize,
    total,
    ordering,
    loading,
    onPageChange,
    onOrderingChange,
    onEdit,
}: IProps) => {
    const applyOrdering = (next: SetStateAction<string[]>) => {
        onOrderingChange(typeof next === "function" ? next(ordering) : next)
    }

    const columns: ColumnsType<CaseOfTheMonth> = [
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
            width: 110,
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
            width: 280,
            sorter: true,
            sortOrder: getSortOrder("title", ordering),
            render: (title: string) => <strong>{title}</strong>,
        },
        {
            title: "Publication month",
            dataIndex: "publication_month",
            key: "publication_month",
            width: 170,
            sorter: true,
            sortOrder: getSortOrder("publication_month", ordering),
            render: (value: string) => formatPublicationMonth(value),
        },
        {
            title: "Tags",
            key: "tags",
            render: (_, caseItem) =>
                caseItem.tags.length ? (
                    <div className={styles.tags}>
                        {caseItem.tags.map((tag) => (
                            <Tag key={tag.id}>{tag.name}</Tag>
                        ))}
                    </div>
                ) : (
                    "—"
                ),
        },
        {
            title: "Questions",
            key: "questions",
            width: 110,
            render: (_, caseItem) => caseItem.questions.length,
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
            title: "",
            key: "edit",
            fixed: "right",
            width: 58,
            render: (_, caseItem) => (
                <Tooltip title="Edit case">
                    <Button
                        aria-label={`Edit ${caseItem.title}`}
                        icon={<Pencil size={15} />}
                        onClick={() => onEdit(caseItem)}
                    />
                </Tooltip>
            ),
        },
    ]

    return (
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
            onChange={(pagination, tableFilters, sorter) =>
                handleTableChange(pagination, tableFilters, sorter, applyOrdering)
            }
        />
    )
}

export default CasesTable
