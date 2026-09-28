import type { JSONContent } from "@tiptap/react"

import ArticleBody from "@app/(main)/news-and-events/[slug]/ArticleBody.tsx"

import styles from "../styles.module.scss"

interface IProps {
    number: string
    title: string
    content: JSONContent
}

const CaseContentSection = ({ number, title, content }: IProps) => (
    <section className={styles.contentSection}>
        <span className={styles.sectionNumber}>{number}</span>
        <h2>{title}</h2>
        <ArticleBody content={content} />
    </section>
)

export default CaseContentSection
