import type { JSONContent } from "@tiptap/react"

export interface News {
    id: number
    body: JSONContent
    created_at: string
    updated_at: string
    author_id: number
    is_published: boolean
    is_deleted: boolean
}
