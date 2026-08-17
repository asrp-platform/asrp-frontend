import type { JSONContent } from "@tiptap/react"

export interface News {
    id: number
    title: string
    slug: string
    cover_key: string | null
    body: JSONContent
    when: string | null
    where: string | null
    created_at: string
    updated_at: string
    author_id: number
    is_published: boolean
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

    join_link?: string | null
    bunny_video_id?: string | null

    starts_at: string
    ends_at: string
    location: string | null

    member_only: boolean
    archived: boolean
    timezone: string
    language: string | null

    is_registered: boolean
}

export interface IWebinarPlayback {
    embed_url: string | null
}
