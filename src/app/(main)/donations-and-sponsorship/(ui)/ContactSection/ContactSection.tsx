import DonationContactForm from "@/features/DonationContactForm/DonationContactForm"
import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "./ContactSection.module.scss"

const ContactSection = () => (
    <PageSection className={styles.contactSection}>
        <div className={styles.sectionIntro}>
            <h2 className={styles.sectionLabel}>Contact</h2>
            <h3 className={styles.sectionHeading}>
                Donations, sponsorship, and partnership inquiries
            </h3>
            <p className={styles.sectionBody}>
                Tell us what you&apos;re looking for (individual donation, corporate sponsorship, or
                a custom idea) and we&apos;ll follow up.
            </p>
            <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                    <h4>Email</h4>
                    <p>admin@asrpath.org</p>
                </li>
                <li className={styles.contactItem}>
                    <h4>Typical response time</h4>
                    <p>We aim to respond within a few business days.</p>
                </li>
            </ul>
        </div>
        <DonationContactForm />
    </PageSection>
)

export default ContactSection
