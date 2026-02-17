import styles from "./styles.module.scss"
import Link from "next/link"
import ProfileHeaderSection from "../(shared)/ProfileHeaderSection.tsx"

const Page = () => {
    return (
        <div className={styles.container}>
            <ProfileHeaderSection
                title="Dashboard"
                subtitle="Manage your ASRP membership and account information."
            />

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Membership status</h2>
                    <span className={styles.badgeActive}>Active</span>
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.primaryText}>Active Member</div>
                    <div className={styles.mutedText}>Valid through December 31, 2026</div>
                </div>
                <div className={styles.cardActions}>
                    <Link href="/account/membership" className={styles.primaryLink}>
                        View membership
                    </Link>
                </div>
            </section>

            <section className={styles.card}>
                <h2 className={styles.cardTitle}>Quick actions</h2>
                <div className={styles.actionsRow}>
                    <Link href="/account/profile" className={styles.primaryLink}>
                        Edit profile
                    </Link>
                    <Link href="/account/payments" className={styles.secondaryLink}>
                        Payment history
                    </Link>
                    <Link
                        href="/account/communication-preferences"
                        className={styles.secondaryLink}
                    >
                        Communication preferences
                    </Link>
                </div>
            </section>

            <section className={styles.card}>
                <h2 className={styles.cardTitle}>Profile summary</h2>
                <div className={styles.profileRow}>
                    <div className={styles.avatar}>EM</div>
                    <div className={styles.profileInfo}>
                        <div className={styles.primaryText}>E. Member</div>
                        <div className={styles.mutedText}>member@email.com</div>
                        <div className={styles.mutedText}>Academic Medical Center</div>
                        <span className={styles.roleBadge}>Member</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
