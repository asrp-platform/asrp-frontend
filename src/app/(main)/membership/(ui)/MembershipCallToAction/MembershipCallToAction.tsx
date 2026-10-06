import Link from "next/link"
import { getLoginUrl } from "@shared/helpers/authRedirect"
import actions from "../membershipActions.module.scss"
import styles from "./MembershipCallToAction.module.scss"

const MembershipCallToAction = () => (
    <section className={styles.ready}>
        <h2 className={styles.readyTitle}>Ready to shape the future of pathology together?</h2>
        <p className={styles.readyText}>
            Help build a lasting home for Russian-speaking professionals. Join a network committed
            to mentorship, advocacy, and research excellence.
        </p>
        <div className={styles.readyButtonsContainer}>
            <Link href="/membership/become-member" className={actions.primaryLink}>
                Become a Member
            </Link>
            <Link href={getLoginUrl("/membership")} className={actions.memberLoginLink}>
                Member Login
            </Link>
            <Link href={getLoginUrl("/account/membership")} className={actions.renewMembershipLink}>
                Renew Membership
            </Link>
        </div>
    </section>
)

export default MembershipCallToAction
