import { CalendarDays, Clock3 } from "lucide-react"

import type { CaseOfTheMonth } from "@entities/CaseOfTheMonth.ts"

import styles from "../styles.module.scss"
import clsx from "clsx"

interface IProps {
    caseItem: CaseOfTheMonth
    publicationMonth: string
    readingMinutes: number
}

const CaseDetailHeader = ({ caseItem, publicationMonth, readingMinutes }: IProps) => (
    <header className={styles.header}>
        <div className={styles.tags}>
            {caseItem.tags.map((tag) => (
                <span className={styles.tag} key={tag.id}>
                    {tag.name}
                </span>
            ))}
            {caseItem.virtual_slides.length > 0 && (
                <span className={clsx(styles.tag, styles.slidesTag)}>Virtual slide available</span>
            )}
        </div>
        <span className={styles.headerLabel}>Case of the Month · {publicationMonth}</span>
        <h1>{caseItem.title}</h1>
        <div className={styles.headerMeta}>
            <span>Contributed by ASRP Education Committee</span>
            <span>
                <CalendarDays size={16} /> {publicationMonth}
            </span>
            <span>
                <Clock3 size={16} /> {readingMinutes} min read
            </span>
        </div>
    </header>
)

export default CaseDetailHeader
