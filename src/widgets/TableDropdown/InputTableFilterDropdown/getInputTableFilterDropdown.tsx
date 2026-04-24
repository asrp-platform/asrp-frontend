import type { Dispatch, Key, SetStateAction } from "react"
import type { FilterDropdownProps } from "antd/es/table/interface"
import { Input, Button, Flex } from "antd"

import SearchFilterDropdownLayout from "@/widgets/TableDropdown/SearchFilterDropdownLayout/SearchFilterDropdownLayout"

export const getInputColumnSearchProps = <TFilters extends Record<string, any>>(
    dataIndex: string,
    filters: TFilters,
    setFilters: Dispatch<SetStateAction<TFilters>>,
) => {
    const filterKey = `${String(dataIndex)}__startswith` as keyof TFilters
    const value = filters[filterKey]

    return {
        filteredValue: value ? ([value as Key] as Key[]) : null,

        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }: FilterDropdownProps) => (
            <SearchFilterDropdownLayout>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0] as string}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm()
                        setFilters((prev: TFilters) => ({
                            ...prev,
                            [filterKey]: selectedKeys[0] as string,
                        }))
                        close()
                    }}
                />

                <Flex justify="space-between" gap={20}>
                    <Button
                        type="primary"
                        onClick={() => {
                            confirm()
                            setFilters((prev: TFilters) => ({
                                ...prev,
                                [filterKey]: selectedKeys[0] as string,
                            }))
                            close()
                        }}
                    >
                        Search
                    </Button>

                    <Button
                        danger
                        onClick={() => {
                            clearFilters?.()

                            setFilters((prev: TFilters) => {
                                const updated = { ...prev }
                                delete updated[filterKey]
                                return updated
                            })

                            confirm()
                            close()
                        }}
                    >
                        Reset
                    </Button>
                </Flex>
            </SearchFilterDropdownLayout>
        ),
    }
}
