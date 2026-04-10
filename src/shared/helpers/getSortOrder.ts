import type { SortOrder } from "antd/es/table/interface"

export const getSortOrder = (
    columnName: string,
    ordering: Array<string>,
): SortOrder | undefined => {
    if (ordering[0] === columnName) {
        return "ascend"
    }

    if (ordering[0] === `-${columnName}`) {
        return "descend"
    }

    return undefined
}
