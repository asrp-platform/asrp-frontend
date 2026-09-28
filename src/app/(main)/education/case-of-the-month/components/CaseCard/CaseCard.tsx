import type { JSONContent } from "@tiptap/react"

import type { CaseOfTheMonth } from "@entities/CaseOfTheMonth.ts"

import styles from "../../styles.module.scss"

interface IProps {
    caseItem: CaseOfTheMonth
}

const getPlainText = (content?: JSONContent): string => {
    if (!content) return ""

    const ownText = typeof content.text === "string" ? content.text : ""
    const childrenText = content.content?.map(getPlainText).filter(Boolean).join(" ") ?? ""

    return [ownText, childrenText].filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
}

const formatPublicationMonth = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(value))

const CaseCard = ({ caseItem }: IProps) => {
    const description = getPlainText(caseItem.history)

    return (
        <article className={styles.caseCard}>
            <div className={styles.cover}>
                {caseItem.cover_url ? (
                    <img src={caseItem.cover_url} alt="" />
                ) : (
                    <div className={styles.coverPlaceholder} aria-hidden="true" />
                )}
                <span className={styles.monthBadge}>
                    {formatPublicationMonth(caseItem.publication_month)}
                </span>
            </div>

            <div className={styles.cardContent}>
                {caseItem.tags.length > 0 && (
                    <div className={styles.tagList}>
                        {caseItem.tags.map((tag) => (
                            <span className={styles.tagBadge} key={tag.id}>
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}
                <h2>{caseItem.title}</h2>
                <span className={styles.seriesLabel}>
                    Case of the Month · {formatPublicationMonth(caseItem.publication_month)}
                </span>
                <p>{description || "Explore this educational pathology case."}</p>

                <div className={styles.cardFooter}>
                    {caseItem.virtual_slides.length > 0 && (
                        <span className={styles.slideStatus}>● Virtual slide available</span>
                    )}
                    <button type="button" className={styles.viewButton}>
                        View Case <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default CaseCard
