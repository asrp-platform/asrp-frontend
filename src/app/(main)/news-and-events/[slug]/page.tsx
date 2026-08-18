/* eslint-disable react-refresh/only-export-components */
import { cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock3, MapPin, Newspaper } from "lucide-react"
import Link from "next/link"

import { REST_API_URL } from "@/axios.ts"
import type { News } from "@entities/News.ts"
import { getNewsDetailUrl } from "@shared/backend/restApiUrls/restApiUrls.ts"
import ArticleBody, { getArticlePlainText } from "./ArticleBody.tsx"

import styles from "./styles.module.scss"

const SITE_URL = "https://asrpath.org"

interface PageProps {
    params: Promise<{ slug: string }>
}

const getNews = cache(async (slug: string): Promise<News | null> => {
    const response = await fetch(`${REST_API_URL}${getNewsDetailUrl(slug)}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
    })

    if (response.status === 404) return null
    if (!response.ok) throw new Error(`Unable to load news article: ${response.status}`)

    return (await response.json()) as News
})

const getDescription = (news: News) => {
    const text = getArticlePlainText(news.body)
    if (!text) return `Read ${news.title}, the latest news from ASRP.`
    return text.length > 157 ? `${text.slice(0, 157).trimEnd()}…` : text
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const { slug } = await params
    const news = await getNews(slug)

    if (!news) {
        return {
            title: "Article not found",
            robots: { index: false, follow: false },
        }
    }

    const description = getDescription(news)
    const canonicalPath = `/news-and-events/${news.slug}`
    const images = news.cover_url
        ? [{ url: news.cover_url, alt: news.title }]
        : [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ASRP" }]

    return {
        title: news.title,
        description,
        alternates: { canonical: canonicalPath },
        keywords: ["ASRP", "pathology", "pathology news", news.title],
        openGraph: {
            type: "article",
            url: canonicalPath,
            title: news.title,
            description,
            publishedTime: news.created_at,
            modifiedTime: news.updated_at,
            siteName: "ASRP",
            images,
        },
        twitter: {
            card: "summary_large_image",
            title: news.title,
            description,
            images: images.map(({ url }) => url),
        },
    }
}

const NewsArticlePage = async ({ params }: PageProps) => {
    const { slug } = await params
    const news = await getNews(slug)

    if (!news) notFound()

    const publishedAt = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(news.created_at))
    const description = getDescription(news)
    const articleText = getArticlePlainText(news.body)
    const readingMinutes = Math.max(
        1,
        Math.ceil(articleText.split(/\s+/).filter(Boolean).length / 200),
    )
    const articleUrl = `${SITE_URL}/news-and-events/${news.slug}`
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: news.title,
        description,
        datePublished: news.created_at,
        dateModified: news.updated_at,
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        ...(news.cover_url ? { image: [news.cover_url] } : {}),
        author: {
            "@type": "Organization",
            name: "American Society of Russian-Speaking Pathologists",
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: "ASRP",
            url: SITE_URL,
        },
    }

    return (
        <main className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />

            <Link href="/news-and-events" className={styles.backLink}>
                <ArrowLeft size={17} /> Back to News &amp; Events
            </Link>

            <div className={styles.articleLayout}>
                <aside className={styles.articleAside} aria-label="Article information">
                    <span className={styles.articleType}>
                        <Newspaper size={15} /> Article
                    </span>
                    <div className={styles.asideDetails}>
                        <span>
                            <Clock3 size={16} />
                            <span>
                                <small>Reading time</small>
                                <strong>{readingMinutes} min</strong>
                            </span>
                        </span>
                        <span>
                            <CalendarDays size={16} />
                            <span>
                                <small>Published</small>
                                <strong>{publishedAt}</strong>
                            </span>
                        </span>
                        {news.where && (
                            <span>
                                <MapPin size={16} />
                                <span>
                                    <small>Location</small>
                                    <strong>{news.where}</strong>
                                </span>
                            </span>
                        )}
                    </div>
                    <div className={styles.asideAccent} aria-hidden="true" />
                </aside>

                <article className={styles.article}>
                    <header className={styles.header}>
                        <span className={styles.headerLabel}>ASRP COMMUNITY UPDATE</span>
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

                    {news.cover_url && (
                        <div className={styles.cover}>
                            <img src={news.cover_url} alt={news.title} />
                        </div>
                    )}

                    <div className={styles.body}>
                        <ArticleBody content={news.body} />
                    </div>
                </article>
            </div>
        </main>
    )
}

export default NewsArticlePage
