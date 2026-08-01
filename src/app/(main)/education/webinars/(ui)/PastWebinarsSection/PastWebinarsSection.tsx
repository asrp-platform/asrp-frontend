import Link from "next/link"
import { ArrowRight, LockKeyhole } from "lucide-react"

import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "../../PageSection.module.scss"

const pastWebinars = [
    {
        date: "June 18, 2026",
        title: "Approach to Difficult Thyroid Cytology",
        speaker: "Presented by Anna Morozova, MD",
        description:
            "A case-based discussion of challenging thyroid cytology specimens and practical application of the Bethesda System.",
        recordingAvailable: true,
    },
    {
        date: "April 23, 2026",
        title: "Molecular Testing in Lung Cancer",
        speaker: "Presented by Sergey Volkov, MD, PhD",
        description:
            "A focused review of current molecular testing workflows and clinically relevant biomarkers in pulmonary adenocarcinoma.",
        recordingAvailable: true,
    },
    {
        date: "February 26, 2026",
        title: "From Fellowship to the First Job",
        speaker: "Presented by ASRP Career Panel",
        description:
            "Practical guidance on job searches, interviews, contract review, and the transition into independent practice.",
        recordingAvailable: false,
    },
]

const PastWebinarsSection = () => (
    <PageSection id="past-webinars" className={styles.pastSection}>
        <div className={styles.sectionHeader}>
            <div>
                <h2>Past Webinars</h2>
                <p>Browse previous ASRP educational programs and access available recordings.</p>
            </div>
            <Link href="#past-webinars" className={styles.pastLink}>
                View all past webinars <ArrowRight size={16} />
            </Link>
        </div>

        <div className={styles.pastWebinarsList}>
            {pastWebinars.map((webinar) => (
                <article className={styles.pastWebinarRow} key={webinar.title}>
                    <div className={styles.pastDate}>
                        <span>COMPLETED</span>
                        <time>{webinar.date}</time>
                    </div>
                    <div className={styles.pastInfo}>
                        <h3>{webinar.title}</h3>
                        <span>{webinar.speaker}</span>
                        <p>{webinar.description}</p>
                    </div>
                    {webinar.recordingAvailable ? (
                        <div className={styles.membersOnlyBadge}>
                            <LockKeyhole size={16} /> Members only
                        </div>
                    ) : (
                        <span className={styles.unavailableBadge}>Recording unavailable</span>
                    )}
                </article>
            ))}
        </div>
    </PageSection>
)

export default PastWebinarsSection
