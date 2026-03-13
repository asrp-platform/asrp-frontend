import type { SorterResult, TablePaginationConfig } from "antd/es/table/interface"
import type { Dispatch, SetStateAction } from "react"

export const handleTableChange = <T>(
    _pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<T> | SorterResult<T>[],
    setOrdering: Dispatch<SetStateAction<string[]>>
) => {
    if (Array.isArray(sorter)) return

    const field = sorter.field as string | undefined
    const order = sorter.order

    if (!field) {
        setOrdering([])
        return
    }

    if (order === "ascend") {
        setOrdering([field])
    } else if (order === "descend") {
        setOrdering([`-${field}`])
    } else {
        setOrdering([])
    }
}
