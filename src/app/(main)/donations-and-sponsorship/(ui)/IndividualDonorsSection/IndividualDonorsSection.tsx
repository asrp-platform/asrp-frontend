import DonationCheckoutForm from "@/features/DonationCheckoutForm/DonationCheckoutForm"
import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "./IndividualDonorsSection.module.scss"

const options = [
    {
        title: "Give once",
        desc: "Support ASRP with a one-time donation—any amount helps build programming and community.",
    },
    {
        title: "Become a monthly supporter",
        desc: "Reliable monthly gifts help us plan webinars, mentorship activities, and community resources.",
    },
    {
        title: "Support a focus area",
        desc: "Direct support toward education, mentorship, bilingual access, or community communications.",
    },
]

const IndividualDonorsSection = () => (
    <PageSection className={styles.donateSection}>
        <div className={styles.sectionIntro}>
            <h2 className={styles.sectionLabel} id="individual_donors">
                Individual donors
            </h2>
            <h3 className={styles.sectionHeading}>Support ASRP through individual giving</h3>
            <p className={styles.sectionBody}>
                Whether you give once or become a monthly supporter, your contribution helps build
                education and mentorship for our community.
            </p>
            <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>Confirmation/receipt for your records</li>
                <li className={styles.bulletItem}>Optional donor acknowledgment (opt-in)</li>
                <li className={styles.bulletItem}>
                    Periodic impact updates (new webinars, mentorship circles, resources)
                </li>
            </ul>
        </div>

        <ul className={styles.cardGrid}>
            {options.map(({ title, desc }) => (
                <li key={title} className={styles.card}>
                    <h3 className={styles.cardSubtitle}>{title}</h3>
                    <p className={styles.cardBody}>{desc}</p>
                </li>
            ))}
        </ul>

        <div className={styles.cardElevated}>
            <div className={styles.sectionIntro}>
                <h3 className={styles.cardTitle}>Personal donations</h3>
                <p className={styles.sectionBody}>
                    One-time gifts help us launch education, mentorship, bilingual access, and
                    community programming.
                </p>
            </div>
            <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>One-time personal donations at any level</li>
                <li className={styles.bulletItem}>
                    Optional acknowledgment (with your permission)
                </li>
                <li className={styles.bulletItem}>
                    Direct support of education, mentorship, access, and community programs
                </li>
            </ul>
            <DonationCheckoutForm />
        </div>
    </PageSection>
)

export default IndividualDonorsSection
