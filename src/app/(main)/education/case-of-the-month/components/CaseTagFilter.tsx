import type { CaseTag } from "@entities/CaseOfTheMonth.ts"

import styles from "../styles.module.scss"

interface IProps {
    tags: CaseTag[]
    selectedTagId?: number
    onChange: (tagId: number | undefined) => void
}

const CaseTagFilter = ({ tags, selectedTagId, onChange }: IProps) => (
    <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Filter cases</span>
        <div className={styles.filterOptions} role="group" aria-label="Filter cases by tag">
            <button
                type="button"
                className={`${styles.filterButton} ${selectedTagId === undefined ? styles.active : ""}`}
                onClick={() => onChange(undefined)}
            >
                All cases
            </button>
            {tags.map((tag) => (
                <button
                    key={tag.id}
                    type="button"
                    className={`${styles.filterButton} ${selectedTagId === tag.id ? styles.active : ""}`}
                    onClick={() => onChange(tag.id)}
                >
                    {tag.name}
                </button>
            ))}
        </div>
    </div>
)

export default CaseTagFilter
