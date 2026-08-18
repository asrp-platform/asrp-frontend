import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpCircle, CheckCircle2, Mail, ShieldCheck } from "lucide-react"

import styles from "@/app/(site)/membership/payment-success/styles.module.scss"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "Membership Upgrade Successful",
    description: "Your ASRP membership upgrade payment was completed successfully.",
    robots: {
        index: false,
        follow: false,
    },
}

const MembershipUpgradeSuccessPage = () => {
    return (
        <main>
            <div className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.iconWrapper}>
                        <CheckCircle2 className={styles.icon} aria-hidden />
                    </div>

                    <div className={styles.badge}>
                        <ShieldCheck size={16} aria-hidden />
                        <span>Upgrade confirmed</span>
                    </div>

                    <h1>Your membership has been upgraded</h1>
                    <p>
                        Your payment was successfully processed and your new ASRP membership level
                        is now active.
                    </p>
                </section>

                <section className={styles.details}>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h2>What changed</h2>
                            <p>
                                Your account now reflects the upgraded membership type and its
                                associated member benefits.
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <h2>Need support?</h2>
                            <p>
                                If your new membership level is not visible or you have a question
                                about the payment, contact the ASRP team.
                            </p>

                            <a href="mailto:admin@asrpath.org" className={styles.emailLink}>
                                <Mail size={16} aria-hidden />
                                <span>admin@asrpath.org</span>
                            </a>
                        </div>
                    </div>

                    <div className={styles.note}>
                        <ArrowUpCircle size={20} aria-hidden />
                        <p>
                            Visit your account to review the current membership type, expiration
                            date, and available benefits.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/account/membership" className={styles.primaryButton}>
                            View membership
                        </Link>
                        <Link href="/membership" className={styles.secondaryButton}>
                            Explore membership benefits
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

export default MembershipUpgradeSuccessPage
