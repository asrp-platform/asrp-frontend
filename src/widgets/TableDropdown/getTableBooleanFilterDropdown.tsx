import type { FilterDropdownProps } from "antd/es/table/interface"
import { Button, Radio } from "antd"

import styles from "./styles.module.scss"
import type { Key } from "react"

const getFilteredValue = (value: any) => {
    if (value === null || value === undefined) return null
    return [value as Key] as Key[]
}

export const getBooleanColumnSearchProps = <TFilters extends Record<string, any>>(
    dataIndex: string,
    filters: TFilters,
    setFilters: (_prev: any) => void
) => {
    const value = filters[dataIndex]

    return {
        filterDropdown: ({ confirm, clearFilters, close }: FilterDropdownProps) => (
            <div className={styles.booleanColumnSearchDropdownContainer}>
                <Radio.Group
                    value={value}
                    className={styles.radioGroup}
                    onChange={(e) => {
                        setFilters((prev: any) => ({ ...prev, [dataIndex]: e.target.value }))
                        confirm()
                        close()
                    }}
                >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
                <Button
                    className={styles.booleanDropdownResetButton}
                    size="small"
                    onClick={() => {
                        clearFilters?.()
                        setFilters((prev: any) => {
                            const updated = { ...prev }
                            delete updated[dataIndex]
                            return updated
                        })
                        confirm()
                        close()
                    }}
                >
                    Reset
                </Button>
            </div>
        ),
        filteredValue: getFilteredValue(value),
    }
}
