import Link from "next/link"
import actions from "../membershipActions.module.scss"
import styles from "./MembershipBenefits.module.scss"

const MembershipBenefits = () => (
    <section className={styles.whySection}>
        <div className={styles.whyGrid}>
            <div className={styles.whyTextBlock}>
                <h2>Why become a member?</h2>
                <p>
                    By joining ASRP, you become part of a community that supports your development
                    as a pathologist, trainee, or aspiring physician in the United States.
                    Membership helps you maintain a supportive environment while growing
                    professionally, no matter where you are in your training and career.
                </p>
                <ul>
                    <li>Connect with peers who understand the realities of your work</li>
                    <li>Build a reliable professional support system</li>
                    <li>Develop long-term professional and mentoring relationships</li>
                    <li>Find community and stability during uncertain times</li>
                    <li>Advance your career and professional growth</li>
                    <li>Access educational resources and learning opportunities</li>
                </ul>
            </div>

            <div className={styles.joinCard}>
                <h3>Ready to join ASRP?</h3>
                <p>
                    Choose the membership category that best reflects your current professional
                    status and complete a brief online form to become part of our community.
                </p>
                <Link href="/membership/become-member" className={actions.primaryLink}>
                    Fill out membership form
                </Link>
                <p className={styles.determinedInfo}>
                    Membership dues and categories are determined by the Society and support
                    educational, mentorship, and networking initiatives.
                </p>
            </div>
        </div>
    </section>
)

export default MembershipBenefits
