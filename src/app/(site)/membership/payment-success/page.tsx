import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react"
import styles from "@/app/(site)/membership/payment-success/styles.module.scss"

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
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.iconWrapper}>
                            <CheckCircle2 className={styles.icon} />
                        </div>

                        <div className={styles.badge}>
                            <ShieldCheck size={16} />
                            <span>Payment confirmed</span>
                        </div>

                        <h1 className={styles.title}>Thank you for joining ASRP</h1>

                        <p className={styles.description}>
                            Your membership payment was successfully processed. Your submission has
                            been received, and our team will review your membership information.
                        </p>
                    </div>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h2 className={styles.infoTitle}>What happens next</h2>
                            <p className={styles.infoText}>
                                We will process your membership request and contact you if any
                                additional information is needed. You will receive updates by email.
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <h2 className={styles.infoTitle}>Need support</h2>
                            <p className={styles.infoText}>
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
                            You may now return to the website. If your account includes member-only
                            access, some features may become available after your membership is
                            reviewed and activated.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/" className={styles.primaryButton}>
                            Go to homepage
                        </Link>

                        <Link href="/membership" className={styles.secondaryButton}>
                            <span>Back to membership</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MembershipPaymentSuccessPage
