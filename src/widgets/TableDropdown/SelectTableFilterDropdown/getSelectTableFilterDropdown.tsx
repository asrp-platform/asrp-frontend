import type { NameChangeRequestStatus } from "@/entities/NameChangeRequest.ts"
import type { Key } from "react"
import type { FilterDropdownProps } from "antd/es/table/interface"
import SearchFilterDropdownLayout from "@/widgets/TableDropdown/SearchFilterDropdownLayout/SearchFilterDropdownLayout.tsx"
import { Button, Flex, Select } from "antd"

interface IOption {
    label: string
    value: string
}

export const getSelectTableFilterDropdown = <TFilters extends Record<string, any>>(
    dataIndex: string,
    filters: TFilters,
    setFilters: (_prev: any) => void,
    options: IOption[],
) => {
    const filterKey = `${String(dataIndex)}` as keyof TFilters
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
                <Select
                    onChange={(value: string) => {
                        setSelectedKeys(value ? ([value] as Key[]) : [])
                        confirm()
                        setFilters((prev: TFilters) => ({
                            ...prev,
                            [filterKey]: value as NameChangeRequestStatus,
                        }))
                    }}
                    value={selectedKeys[0] as NameChangeRequestStatus}
                    options={options}
                />
                <Flex justify={"space-between"} gap={20}>
                    <Button
                        type={"primary"}
                        onClick={() => {
                            confirm()
                            setFilters((prev: TFilters) => ({
                                ...prev,
                                [filterKey]: selectedKeys[0] as NameChangeRequestStatus,
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
