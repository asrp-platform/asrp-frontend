"use client"

import { useEffect } from "react"
import { Alert, Skeleton } from "antd"
import { EditorContent, useEditor } from "@tiptap/react"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import api from "@/axios.ts"
import { createEditorExtensions } from "@app/(main)/about/directors-board/(components)/ViewCard/helpers/editorExtenstions.tsx"
import type { News } from "@entities/News.ts"
import { getNewsDetailUrl } from "@shared/backend/restApiUrls/restApiUrls.ts"

import styles from "./styles.module.scss"

const articleExtensions = createEditorExtensions([1, 2, 3, 4, 5])

const NewsArticlePage = () => {
    const { slug } = useParams<{ slug: string }>()
    const {
        data: news,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["news", "detail", slug],
        queryFn: async () => {
            const response = await api.get<News>(getNewsDetailUrl(slug))
            return response.data
        },
        enabled: Boolean(slug),
    })

    const editor = useEditor({
        extensions: articleExtensions,
        immediatelyRender: false,
        editable: false,
        content: "",
    })

    useEffect(() => {
        if (news && editor) editor.commands.setContent(news.body)
    }, [editor, news])

    if (isLoading || !editor) {
        return (
            <main className={styles.page}>
                <Skeleton active paragraph={{ rows: 8 }} />
            </main>
        )
    }

    if (isError || !news) {
        return (
            <main className={styles.page}>
                <Alert
                    type="error"
                    showIcon
                    title="Article not found"
                    description="This article may have been removed or is not published yet."
                    action={<Link href="/news-and-events">Back to news</Link>}
                />
            </main>
        )
    }

    const publishedAt = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(news.created_at))

    return (
        <main className={styles.page}>
            <Link href="/news-and-events" className={styles.backLink}>
                <ArrowLeft size={17} /> Back to News &amp; Events
            </Link>

            <article className={styles.article}>
                <header className={styles.header}>
                    <h1>{news.title}</h1>
                    <div className={styles.meta}>
                        <span>
                            <CalendarDays size={16} /> {news.when || `Published ${publishedAt}`}
                        </span>
                        {news.where && (
                            <span>
                                <MapPin size={16} /> {news.where}
                            </span>
                        )}
                    </div>
                </header>

                {news.cover_key && (
                    <div className={styles.cover}>
                        <img src={news.cover_key} alt="" />
                    </div>
                )}

                <EditorContent editor={editor} className={styles.body} />
            </article>
        </main>
    )
}

export default NewsArticlePage
