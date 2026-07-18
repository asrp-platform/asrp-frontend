import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Mail, ReceiptText, ShieldCheck } from "lucide-react"

import styles from "./styles.module.scss"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "Donation Payment Successful",
    description: "Your one-time donation to ASRP was completed successfully.",
    robots: {
        index: false,
        follow: false,
    },
}

const DonationPaymentSuccessPage = () => (
    <div className={styles.page}>
        <section className={styles.hero}>
            <div className={styles.iconWrapper}>
                <CheckCircle2 className={styles.icon} aria-hidden />
            </div>

            <div className={styles.badge}>
                <ShieldCheck size={16} aria-hidden />
                <span>Donation confirmed</span>
            </div>

            <h1>Thank you for supporting ASRP</h1>
            <p>
                Your one-time donation was successfully processed. Your support helps us expand
                education, mentorship, bilingual access, and community programming.
            </p>
        </section>

        <section className={styles.details}>
            <div className={styles.infoGrid}>
                <article className={styles.infoCard}>
                    <ReceiptText size={24} aria-hidden />
                    <h2>Your payment receipt</h2>
                    <p>
                        A payment confirmation will be sent to the email address provided during
                        checkout. Please also check your spam folder if you do not see it.
                    </p>
                </article>

                <article className={styles.infoCard}>
                    <Mail size={24} aria-hidden />
                    <h2>Need support?</h2>
                    <p>
                        If you have questions about your donation or receipt, contact the ASRP team
                        and include the email address used for payment.
                    </p>
                    <a href="mailto:admin@asrpath.org" className={styles.emailLink}>
                        admin@asrpath.org
                    </a>
                </article>
            </div>

            <div className={styles.note}>
                <p>
                    Please keep your payment confirmation for your records. Tax treatment depends on
                    your circumstances and ASRP&apos;s applicable tax status.
                </p>
            </div>

            <div className={styles.actions}>
                <Link href="/donations-and-sponsorship" className={styles.primaryButton}>
                    Return to donations
                </Link>
                <Link href="/" className={styles.secondaryButton}>
                    Go to homepage
                </Link>
            </div>
        </section>
    </div>
)

export default DonationPaymentSuccessPage
