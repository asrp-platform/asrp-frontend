import { Info } from "lucide-react"
import styles from "./MembershipApplicationNotice.module.scss"

const MembershipApplicationNotice = () => (
    <div className={styles.notice}>
        <Info size={20} aria-hidden="true" />
        <p>
            <strong>Before you apply.</strong> Once your application and payment are received, the
            Society will review your eligibility. If you do not meet the criteria for any membership
            category, your application may be declined. If your application is declined, your
            membership fee will be refunded. We review each application thoughtfully and aim to
            accommodate applicants whenever possible.
        </p>
    </div>
)

export default MembershipApplicationNotice
