import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react"
import styles from "@/app/(site)/membership/payment-success/styles.module.scss"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "Membership Payment Successful",
    description: "Your ASRP membership payment was completed successfully.",
    robots: {
        index: false,
        follow: false,
    },
}

const MembershipPaymentSuccessPage = () => {
    return (
        <main>
            <div className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.iconWrapper}>
                        <CheckCircle2 className={styles.icon} />
                    </div>

                    <div className={styles.badge}>
                        <ShieldCheck size={16} />
                        <span>Payment confirmed</span>
                    </div>

                    <h1>Thank you for joining ASRP</h1>

                    <p>
                        Your membership payment was successfully processed. Your application is now
                        with the ASRP team for review and activation.
                    </p>
                </section>

                <section className={styles.details}>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h2>What happens next</h2>
                            <p>
                                We will review your membership information and contact you if any
                                additional details are needed. You will receive updates by email.
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <h2>Need support?</h2>
                            <p>
                                If you have questions about your payment or membership status,
                                please contact the ASRP team.
                            </p>

                            <a href="mailto:admin@asrpath.org" className={styles.emailLink}>
                                <Mail size={16} />
                                <span>admin@asrpath.org</span>
                            </a>
                        </div>
                    </div>

                    <div className={styles.note}>
                        <p>
                            Member-only features may become available after your membership is
                            reviewed and activated.
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

export default MembershipPaymentSuccessPage
