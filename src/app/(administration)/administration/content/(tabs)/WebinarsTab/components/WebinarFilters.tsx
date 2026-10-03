"use client"

import { Select, Space } from "antd"

import { WebinarStatus } from "@entities/News.ts"

import type { WebinarFilterValues } from "../types.ts"

interface WebinarFiltersProps {
    filters: WebinarFilterValues
    onChange: (filters: WebinarFilterValues) => void
}

const WebinarFilters = ({ filters, onChange }: WebinarFiltersProps) => {
    const updateFilters = (nextFilters: Partial<WebinarFilterValues>) => {
        onChange({ ...filters, ...nextFilters })
    }

    return (
        <Space>
            <Select
                value={filters.status}
                allowClear
                placeholder="All statuses"
                style={{ width: 180 }}
                options={[
                    { label: "Upcoming", value: WebinarStatus.UPCOMING },
                    { label: "Past", value: WebinarStatus.PAST },
                ]}
                onChange={(status: WebinarStatus | undefined) => updateFilters({ status })}
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
                onChange={(archived: boolean | undefined) => updateFilters({ archived })}
            />
        </Space>
    )
}

export default WebinarFilters
