import type { WebinarStatus } from "@entities/News.ts"

export interface WebinarFilterValues {
    status?: WebinarStatus
    title__startswith?: string
    archived?: boolean
}
