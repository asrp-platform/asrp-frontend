import type { CaseTag } from "@entities/CaseOfTheMonth.ts"

import CaseTagFilter from "./CaseTagFilter.tsx"
import styles from "./LibraryHeader.module.scss"

interface LibraryHeaderProps {
    tags: CaseTag[]
    selectedTagId: number | undefined
    caseCount: number
    onTagChange: (tagId: number | undefined) => void
}

const LibraryHeader = ({ tags, selectedTagId, caseCount, onTagChange }: LibraryHeaderProps) => (
    <div className={styles.libraryHeader}>
        <CaseTagFilter tags={tags} selectedTagId={selectedTagId} onChange={onTagChange} />
        <span className={styles.caseCount}>{caseCount} cases</span>
    </div>
)

export default LibraryHeader
