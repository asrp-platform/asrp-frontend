import { ArrowRight } from "lucide-react"

import type { IMembershipType } from "@entities/Membership.ts"

import { formatMembershipPrice } from "../../formatMembershipPrice.ts"
import styles from "./MembershipComparison.module.scss"

interface MembershipComparisonProps {
    currentType: IMembershipType
    selectedType?: IMembershipType
}

const MembershipComparison = ({ currentType, selectedType }: MembershipComparisonProps) => (
    <div className={styles.comparison}>
        <div className={styles.membershipCard}>
            <span>Current membership</span>
            <strong>{currentType.name}</strong>
            <p>{formatMembershipPrice(currentType.price_usd)}</p>
        </div>

        <ArrowRight className={styles.arrow} size={22} aria-hidden />

        <div className={`${styles.membershipCard} ${styles.targetCard}`}>
            <span>New membership</span>
            <strong>{selectedType?.name ?? "Select a type"}</strong>
            <p>{selectedType ? formatMembershipPrice(selectedType.price_usd) : "Not selected"}</p>
        </div>
    </div>
)

export default MembershipComparison
