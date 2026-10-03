"use client"

import { DatePicker, Flex, Select, Space, Tag } from "antd"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"

import type { NewsFilterValues } from "../types.ts"
import styles from "./NewsTable.module.scss"

interface NewsFiltersProps {
    filters: NewsFilterValues
    total: number
    onChange: (filters: NewsFilterValues) => void
}

const NewsFilters = ({ filters, total, onChange }: NewsFiltersProps) => {
    const updateFilters = (nextFilters: Partial<NewsFilterValues>) => {
        onChange({ ...filters, ...nextFilters })
    }

    const setCreatedRange = (dates: null | [Dayjs | null, Dayjs | null]) => {
        const next = { ...filters }

        if (dates?.[0] && dates[1]) {
            next.created_at__gte = dates[0].startOf("day").toISOString()
            next.created_at__lte = dates[1].endOf("day").toISOString()
        } else {
            delete next.created_at__gte
            delete next.created_at__lte
        }

        onChange(next)
    }

    const createdRange =
        filters.created_at__gte && filters.created_at__lte
            ? ([dayjs(filters.created_at__gte), dayjs(filters.created_at__lte)] as [Dayjs, Dayjs])
            : null

    return (
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
                    onChange={(is_published: boolean | undefined) =>
                        updateFilters({ is_published })
                    }
                />
                <DatePicker.RangePicker
                    value={createdRange}
                    allowClear
                    placeholder={["Created from", "Created to"]}
                    onChange={setCreatedRange}
                />
            </Space>
            <Tag>{total} articles</Tag>
        </Flex>
    )
}

export default NewsFilters
