import { CreditCard } from "lucide-react"

import type { IMembershipType } from "@entities/Membership.ts"

import { formatMembershipPrice } from "../../formatMembershipPrice.ts"
import styles from "./UpgradeSummary.module.scss"

interface UpgradeSummaryProps {
    selectedType: IMembershipType
    priceDifference: number
}

const UpgradeSummary = ({ selectedType, priceDifference }: UpgradeSummaryProps) => (
    <div className={styles.summary}>
        <div>
            <CreditCard size={20} aria-hidden />
            <span>Amount due now</span>
        </div>
        <strong>{formatMembershipPrice(priceDifference)}</strong>
        {selectedType.description && <p>{selectedType.description}</p>}
    </div>
)

export default UpgradeSummary
