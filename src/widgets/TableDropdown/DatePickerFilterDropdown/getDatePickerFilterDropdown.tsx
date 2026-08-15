import type { Dispatch, Key, SetStateAction } from "react"
import type { FilterDropdownProps } from "antd/es/table/interface"
import { Button, Flex, DatePicker } from "antd"
import SearchFilterDropdownLayout from "../SearchFilterDropdownLayout/SearchFilterDropdownLayout"

import dayjs from "dayjs"

export const getDatePickerColumnSearchProps = <TFilters extends Record<string, any>>(
    dataIndex: string | string[],
    filters: TFilters,
    setFilters: Dispatch<SetStateAction<TFilters>>,
) => {
    const lteFilterKey = `${dataIndex}__lte`
    const gteFilterKey = `${dataIndex}__gte`

    const value = filters[lteFilterKey] && filters[gteFilterKey]

    return {
        filteredValue: value ? [dataIndex as Key] : null,

        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }: FilterDropdownProps) => (
            <SearchFilterDropdownLayout>
                <DatePicker.RangePicker
                    value={
                        selectedKeys.length === 2
                            ? [dayjs(selectedKeys[0] as string), dayjs(selectedKeys[1] as string)]
                            : null
                    }
                    onChange={(dates) => {
                        if (!dates || !dates[0] || !dates[1]) {
                            setSelectedKeys([])
                            return
                        }
                        setSelectedKeys([
                            dates[0]?.format("YYYY-MM-DD"),
                            dates[1]?.format("YYYY-MM-DD"),
                        ])
                    }}
                />

                <Flex justify="space-between" gap={20}>
                    <Button
                        type="primary"
                        onClick={() => {
                            confirm()
                            setFilters((prev: TFilters) => ({
                                ...prev,
                                [gteFilterKey]: selectedKeys[0] as string,
                                [lteFilterKey]: selectedKeys[1] as string,
                            }))
                            close()
                        }}
                    >
                        Фильтровать
                    </Button>

                    <Button
                        danger
                        onClick={() => {
                            clearFilters?.()

                            setFilters((prev: TFilters) => {
                                const updated = { ...prev }
                                delete updated[lteFilterKey]
                                delete updated[gteFilterKey]
                                return updated
                            })

                            confirm()
                            close()
                        }}
                    >
                        Сбросить
                    </Button>
                </Flex>
            </SearchFilterDropdownLayout>
        ),
    }
}
