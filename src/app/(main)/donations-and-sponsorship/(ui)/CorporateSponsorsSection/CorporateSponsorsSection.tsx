import LinkButton from "@/shared/ui/Buttons/LinkButton"
import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "./CorporateSponsorsSection.module.scss"

const options = [
    {
        title: "Recognition",
        desc: "Logo + link placement on this page (and other agreed acknowledgments). Recognition is acknowledgment only.",
    },
    {
        title: "Alignment",
        desc: "Support can align to education, mentorship, recruiting visibility, or a specific program—without influencing content.",
    },
]

const CorporateSponsorsSection = () => (
    <PageSection className={styles.corporateSection}>
        <div className={styles.sectionIntro}>
            <h2 className={styles.sectionLabel} id="corporate_sponsors">
                Corporate sponsors
            </h2>
            <h3 className={styles.sectionHeading}>Mission-aligned corporate support</h3>
            <p className={styles.sectionBody}>
                We keep sponsorship straightforward. Typical sponsor recognition includes a logo +
                link on this page and agreed acknowledgments.
            </p>
            <ul className={styles.bulletList}>
                <li className={styles.bulletItemGreen}>
                    Logo + link placement (hero sponsor strip + sponsor section)
                </li>
                <li className={styles.bulletItemGreen}>Single point of contact for coordination</li>
                <li className={styles.bulletItemGreen}>
                    Mission-aligned visibility (education/mentorship support)
                </li>
            </ul>
        </div>

        <div className={styles.card} style={{ gap: 20, padding: 24 }}>
            <div className={styles.corporateCardContentWrapper}>
                <div className={styles.sectionIntro}>
                    <h3 className={styles.cardTitle}>Corporate sponsorship</h3>
                    <p className={styles.cardBody}>
                        Interested in supporting ASRP&apos;s education, mentorship, or community
                        programming? We&apos;ll propose a simple annual sponsorship level based on
                        your goals.
                    </p>
                </div>
                <LinkButton className={styles.corporateCardLink} href="#" variant="red">
                    Contact&nbsp;us
                </LinkButton>
            </div>
            <ul className={styles.corporateOptionsList}>
                {options.map(({ title, desc }) => (
                    <li key={title} className={styles.cardMuted}>
                        <h3 className={styles.cardSubtitle}>{title}</h3>
                        <p className={styles.cardBody}>{desc}</p>
                    </li>
                ))}
            </ul>
        </div>
    </PageSection>
)

export default CorporateSponsorsSection
