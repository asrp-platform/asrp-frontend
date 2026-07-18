import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "./WhyGiveSection.module.scss"

const cards = [
    {
        title: "Build core programs",
        desc: "Support the practical work of launching webinars, case sessions, and mentorship circles.",
    },
    {
        title: "Keep access affordable",
        desc: "Help us minimize barriers for trainees, IMGs, and early-career members.",
    },
    {
        title: "Strengthen community",
        desc: "Create a professional home where language and culture support clinical excellence.",
    },
]

const WhyGiveSection = () => (
    <PageSection className={styles.impactSection}>
        <div className={styles.sectionIntro}>
            <h2 className={styles.sectionLabel}>Why give</h2>
            <h3 className={styles.sectionHeading}>Early support has outsized impact</h3>
            <p className={styles.sectionBody}>
                Individual donations and early corporate support help us launch educational
                sessions, build mentorship pathways, and keep resources accessible to trainees and
                early-career colleagues.
            </p>
        </div>
        <ul className={styles.cardGrid}>
            {cards.map(({ title, desc }) => (
                <li key={title} className={styles.card}>
                    <h3 className={styles.cardSubtitle}>{title}</h3>
                    <p className={styles.cardBody}>{desc}</p>
                </li>
            ))}
        </ul>
    </PageSection>
)

export default WhyGiveSection
