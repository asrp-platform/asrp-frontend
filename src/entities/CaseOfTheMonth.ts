import type { JSONContent } from "@tiptap/react"

export interface CaseTag {
    id: number
    created_at: string
    updated_at: string
    name: string
}

export interface CaseOfTheMonth {
    id: number
    created_at: string
    updated_at: string
    title: string
    slug: string
    cover_key: string | null
    cover_url: string | null
    history: JSONContent
    case_findings: JSONContent
    virtual_slides: string[]
    questions: string[]
    publication_month: string
    answer: JSONContent
    tags: CaseTag[]
}
