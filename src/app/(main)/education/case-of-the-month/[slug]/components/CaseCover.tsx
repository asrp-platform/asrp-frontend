import type { CaseOfTheMonth } from "@entities/CaseOfTheMonth.ts"

import styles from "../styles.module.scss"

interface IProps {
    caseItem: CaseOfTheMonth
}

const CaseCover = ({ caseItem }: IProps) => {
    if (!caseItem.cover_url) return null

    return (
        <div className={styles.cover}>
            <img src={caseItem.cover_url} alt={caseItem.title} />
        </div>
    )
}

export default CaseCover
