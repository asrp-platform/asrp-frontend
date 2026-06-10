import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react"
import styles from "@/app/(site)/membership/payment-success/styles.module.scss"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "Membership Renewal Successful",
    description: "Your ASRP membership renewal payment was completed successfully.",
    robots: {
        index: false,
        follow: false,
    },
}

const MembershipRenewalSuccessPage = () => {
    return (
        <main>
            <div className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.iconWrapper}>
                        <CheckCircle2 className={styles.icon} />
                    </div>

                    <div className={styles.badge}>
                        <ShieldCheck size={16} />
                        <span>Renewal confirmed</span>
                    </div>

                    <h1>Your ASRP membership has been renewed</h1>

                    <p>
                        Your renewal payment was successfully processed. Thank you for continuing to
                        support the ASRP community.
                    </p>
                </section>

                <section className={styles.details}>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h2>What changed</h2>
                            <p>
                                Your membership renewal has been recorded. Your active membership
                                access will continue according to the updated membership term.
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <h2>Need support?</h2>
                            <p>
                                If you have questions about your renewal, payment, or membership
                                dates, please contact the ASRP team.
                            </p>

                            <a href="mailto:admin@asrpath.org" className={styles.emailLink}>
                                <Mail size={16} />
                                <span>admin@asrpath.org</span>
                            </a>
                        </div>
                    </div>

                    <div className={styles.note}>
                        <p>
                            You can review your current membership details from your account
                            membership page.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/account/membership" className={styles.primaryButton}>
                            View membership
                        </Link>

                        <Link href="/membership" className={styles.secondaryButton}>
                            Explore ASRP membership
                        </Link>

                        <Link href="/" className={styles.secondaryButton}>
                            Go to homepage
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default MembershipRenewalSuccessPage
