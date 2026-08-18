"use client"

import { message, Modal, Popconfirm, Tooltip } from "antd"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
    CalendarDays,
    Clock3,
    EyeOff,
    LoaderCircle,
    MapPin,
    Newspaper,
    Pencil,
    Trash2,
} from "lucide-react"
import type { JSONContent } from "@tiptap/react"
import clsx from "clsx"
import Link from "next/link"

import api from "@/axios.ts"
import type { News } from "@entities/News.ts"
import { getNewsDetailAdminUrl } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import CreateNews from "../CreateNews/CreateNews.tsx"

import styles from "./styles.module.scss"

interface IProps {
    news: News
    canUpdate: boolean
    canDelete: boolean
}

const getPlainText = (content: JSONContent | undefined): string => {
    if (!content) return ""
    const ownText = typeof content.text === "string" ? content.text : ""
    const childrenText = content.content?.map(getPlainText).filter(Boolean).join(" ") ?? ""
    return [ownText, childrenText].filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
}

const NewsCard = ({ news, canUpdate, canDelete }: IProps) => {
    const queryClient = useQueryClient()

    const invalidateNews = () => queryClient.invalidateQueries({ queryKey: ["news"] })

    const deleteMutation = useMutation({
        mutationFn: () => api.delete(getNewsDetailAdminUrl(news.id)),
        onSuccess: async () => {
            await invalidateNews()
            message.success("News deleted successfully.")
        },
        onError: (error) => handleApiError({ error }),
    })

    const unpublishMutation = useMutation({
        mutationFn: () => api.patch(getNewsDetailAdminUrl(news.id), { is_published: false }),
        onSuccess: async () => {
            await invalidateNews()
            message.success("News removed from publication.")
        },
        onError: (error) => handleApiError({ error }),
    })

    const summary = getPlainText(news.body)
    const readingMinutes = Math.max(1, Math.ceil(summary.split(/\s+/).filter(Boolean).length / 200))
    const displayDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(news.created_at))

    return (
        <article
            className={clsx(
                styles.card,
                !news.cover_url && (canUpdate || canDelete) && styles.cardWithUncoveredActions,
            )}
        >
            {news.cover_url && (
                <div className={styles.cover}>
                    <img src={news.cover_url} alt="" />
                    <div className={styles.coverCaption}>
                        <strong>{news.when || news.where || "Community update"}</strong>
                    </div>
                </div>
            )}

            {!news.is_published && <span className={styles.draftBadge}>Draft</span>}

            {(canUpdate || canDelete) && (
                <div
                    className={clsx(
                        styles.adminActions,
                        !news.cover_url && styles.adminActionsWithoutCover,
                    )}
                >
                    {canUpdate && (
                        <CreateNews
                            news={news}
                            renderTrigger={(openModal) => (
                                <Tooltip title="Edit news">
                                    <button
                                        type="button"
                                        className={`${styles.adminButton} ${styles.editButton}`}
                                        aria-label={`Edit news: ${news.title}`}
                                        onClick={openModal}
                                    >
                                        <Pencil size={17} />
                                    </button>
                                </Tooltip>
                            )}
                        />
                    )}

                    {canUpdate && news.is_published && (
                        <Popconfirm
                            title="Unpublish news?"
                            description="Readers will no longer see this post."
                            okText="Unpublish"
                            cancelText="Cancel"
                            onConfirm={() => unpublishMutation.mutate()}
                        >
                            <Tooltip title="Unpublish">
                                <button
                                    type="button"
                                    className={`${styles.adminButton} ${styles.unpublishButton}`}
                                    aria-label={`Unpublish news: ${news.title}`}
                                    disabled={unpublishMutation.isPending}
                                >
                                    {unpublishMutation.isPending ? (
                                        <LoaderCircle className={styles.spin} size={17} />
                                    ) : (
                                        <EyeOff size={17} />
                                    )}
                                </button>
                            </Tooltip>
                        </Popconfirm>
                    )}

                    {canDelete && (
                        <Tooltip title="Delete news">
                            <button
                                type="button"
                                className={`${styles.adminButton} ${styles.deleteButton}`}
                                aria-label={`Delete news: ${news.title}`}
                                onClick={() =>
                                    Modal.confirm({
                                        title: "Delete news?",
                                        content: `Are you sure you want to delete “${news.title}”? This action cannot be undone.`,
                                        okText: "Delete news",
                                        okButtonProps: { danger: true },
                                        cancelText: "Cancel",
                                        onOk: () => deleteMutation.mutateAsync(),
                                    })
                                }
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? (
                                    <LoaderCircle className={styles.spin} size={17} />
                                ) : (
                                    <Trash2 size={17} />
                                )}
                            </button>
                        </Tooltip>
                    )}
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.categoryRow}>
                    <span className={styles.categoryBadge}>
                        <Newspaper size={13} /> Community news
                    </span>
                    <span className={styles.readingTime}>
                        <Clock3 size={13} /> {readingMinutes} min read
                    </span>
                </div>
                <div className={styles.meta}>
                    <span>
                        <CalendarDays size={14} /> Posted on {displayDate}
                    </span>
                    {news.where && (
                        <span>
                            <MapPin size={15} /> {news.where}
                        </span>
                    )}
                </div>
                <h3>{news.title}</h3>
                {summary && <p>{summary}</p>}
                <Link href={`/news-and-events/${news.slug}`} className={styles.readMore}>
                    Read more <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    )
}

export default NewsCard
