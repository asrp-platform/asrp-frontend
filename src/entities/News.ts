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

/* eslint-disable */
// @ts-ignore
export enum WebinarStatus {
    UPCOMING = "UPCOMING",
    PAST = "PAST",
    ALL = "ALL",
}

export interface IWebinar {
    id: number
    created_at: string
    updated_at: string
    title: string
    description: string
    learning_objectives: string[]
    slug: string

    speaker_name: string
    speaker_description: string | null

    registration_link?: string | null
    join_link?: string | null
    recording_link?: string | null

    starts_at: string
    location: string | null

    member_only: boolean
}
