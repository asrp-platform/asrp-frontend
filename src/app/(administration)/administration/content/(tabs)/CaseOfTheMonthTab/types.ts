import type { FormInstance } from "antd"
import type { JSONContent } from "@tiptap/react"
import type { Dayjs } from "dayjs"

export interface CaseTagFormValues {
    name: string
}

export type CaseTagForm = FormInstance<CaseTagFormValues>

export interface CaseOfTheMonthFormValues {
    title: string
    cover_key: string | null
    history: JSONContent
    case_findings: JSONContent
    publication_month: Dayjs
    virtual_slides: string[]
    questions: string[]
    answer: JSONContent
    tag_ids: number[]
}

export type CaseOfTheMonthForm = FormInstance<CaseOfTheMonthFormValues>
