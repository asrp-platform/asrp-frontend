/* eslint-disable react-refresh/only-export-components */
import { cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { REST_API_URL } from "@/axios.ts"
import type { CaseOfTheMonth } from "@entities/CaseOfTheMonth.ts"
import { getCaseOfTheMonthDetailUrl } from "@shared/backend/restApiUrls/restApiUrls.ts"

import { getArticlePlainText } from "@app/(main)/news-and-events/[slug]/ArticleBody.tsx"
import CaseContentSection from "./components/CaseContentSection.tsx"
import CaseCover from "./components/CaseCover.tsx"
import CaseDetailHeader from "./components/CaseDetailHeader.tsx"
import CaseInterpretationSection from "./components/CaseInterpretationSection.tsx"
import VirtualSlidesSection from "./components/VirtualSlidesSection.tsx"
import styles from "./styles.module.scss"

const SITE_URL = "https://asrpath.org"

const getServerApiUrl = () => {
    const configuredUrl = process.env.SERVER_API_URL?.trim() || REST_API_URL

    return new URL(configuredUrl, SITE_URL).toString().replace(/\/$/, "")
}

interface PageProps {
    params: Promise<{ slug: string }>
}

const getCase = cache(async (slug: string): Promise<CaseOfTheMonth | null> => {
    const response = await fetch(`${getServerApiUrl()}${getCaseOfTheMonthDetailUrl(slug)}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
    })

    if (response.status === 404) return null
    if (!response.ok) throw new Error(`Unable to load case of the month: ${response.status}`)

    return (await response.json()) as CaseOfTheMonth
})

const formatPublicationMonth = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(value))

const getDescription = (caseItem: CaseOfTheMonth) => {
    const text = getArticlePlainText(caseItem.history)
    if (!text) return `Explore the ${caseItem.title} pathology case from ASRP.`

    return text.length > 157 ? `${text.slice(0, 157).trimEnd()}…` : text
}

const getReadingTime = (caseItem: CaseOfTheMonth) => {
    const text = [
        getArticlePlainText(caseItem.history),
        getArticlePlainText(caseItem.case_findings),
        getArticlePlainText(caseItem.answer),
        ...caseItem.questions,
    ].join(" ")

    return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const { slug } = await params
    const caseItem = await getCase(slug)

    if (!caseItem) {
        return {
            title: "Case not found",
            robots: { index: false, follow: false },
        }
    }

    const description = getDescription(caseItem)
    const canonicalPath = `/education/case-of-the-month/${caseItem.slug}`
    const images = caseItem.cover_url
        ? [{ url: caseItem.cover_url, alt: caseItem.title }]
        : [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ASRP Case of the Month" }]

    return {
        title: `${caseItem.title} | Case of the Month`,
        description,
        alternates: { canonical: canonicalPath },
        keywords: [
            "ASRP",
            "case of the month",
            "pathology case",
            "pathology education",
            caseItem.title,
            ...caseItem.tags.map((tag) => tag.name),
        ],
        openGraph: {
            type: "article",
            url: canonicalPath,
            title: caseItem.title,
            description,
            publishedTime: caseItem.publication_month,
            modifiedTime: caseItem.updated_at,
            siteName: "ASRP",
            images,
        },
        twitter: {
            card: "summary_large_image",
            title: caseItem.title,
            description,
            images: images.map(({ url }) => url),
        },
    }
}

const CaseOfTheMonthDetailPage = async ({ params }: PageProps) => {
    const { slug } = await params
    const caseItem = await getCase(slug)

    if (!caseItem) notFound()

    const publicationMonth = formatPublicationMonth(caseItem.publication_month)
    const caseUrl = `${SITE_URL}/education/case-of-the-month/${caseItem.slug}`
    const description = getDescription(caseItem)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: caseItem.title,
        description,
        datePublished: caseItem.publication_month,
        dateModified: caseItem.updated_at,
        mainEntityOfPage: caseUrl,
        url: caseUrl,
        ...(caseItem.cover_url ? { image: [caseItem.cover_url] } : {}),
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
        about: caseItem.tags.map((tag) => ({ "@type": "Thing", name: tag.name })),
    }

    return (
        <main className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />

            <Link href="/education/case-of-the-month" className={styles.backLink}>
                <ArrowLeft size={17} /> Back to all cases
            </Link>

            <CaseDetailHeader
                caseItem={caseItem}
                publicationMonth={publicationMonth}
                readingMinutes={getReadingTime(caseItem)}
            />

            <CaseCover caseItem={caseItem} />

            <div className={styles.content}>
                <CaseContentSection
                    number="01"
                    title="Clinical Presentation & History"
                    content={caseItem.history}
                />
                <CaseContentSection
                    number="02"
                    title="Case Findings"
                    content={caseItem.case_findings}
                />
                <VirtualSlidesSection slides={caseItem.virtual_slides} />
                <CaseInterpretationSection
                    questions={caseItem.questions}
                    answer={caseItem.answer}
                />
            </div>
        </main>
    )
}

export default CaseOfTheMonthDetailPage
