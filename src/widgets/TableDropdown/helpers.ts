import type { Key } from "react"

export const getFilteredValue = (value: any) => {
    if (value === null || value === undefined) return null
    return [value as Key] as Key[]
}
