import { CalendarDays, Clock3, MapPin } from "lucide-react"

import PageSection from "@/shared/ui/PageSection/PageSection"
import MemberAccess from "../MemberAccess/MemberAccess"
import styles from "../../PageSection.module.scss"

const upcomingWebinars = [
    {
        date: "OCT 15",
        title: "Updates in Molecular Diagnostics for Solid Tumors",
        speaker: "Dr. Elena Markova · Molecular Pathology",
        time: "7:00–8:00 PM ET",
    },
    {
        date: "NOV 12",
        title: "From Residency to Fellowship: Building Your Path in Pathology",
        speaker: "ASRP Trainee & Mentorship Committee",
        time: "7:00–8:00 PM ET",
    },
]

const UpcomingWebinarsSection = () => (
    <PageSection className={styles.upcomingSection}>
        <div className={styles.sectionHeader}>
            <div>
                <h2>Upcoming webinars</h2>
                <p>Live educational programs and upcoming member events.</p>
            </div>
            <span className={styles.countBadge}>3 upcoming</span>
        </div>

        <article className={styles.featuredCard}>
            <div className={styles.featuredVisual}>
                <div className={styles.visualContent}>
                    <div className={styles.slideMark} aria-hidden="true">
                        ASRP
                    </div>
                    <span className={styles.nextWebinarBadge}>Next webinar</span>
                </div>
            </div>
            <div className={styles.featuredContent}>
                <span className={styles.openBadge}>Registration open</span>
                <h2>Diagnostic Challenges in Soft Tissue Pathology</h2>
                <div className={styles.metaRow}>
                    <span>
                        <CalendarDays size={16} /> September 17, 2026
                    </span>
                    <span>
                        <Clock3 size={16} /> 7:00–8:00 PM ET
                    </span>
                    <span>
                        <MapPin size={16} /> Live virtual webinar
                    </span>
                </div>
                <div className={styles.divider} />
                <p className={styles.summary}>
                    Review a practical, pattern-based approach to challenging soft tissue tumors.
                    This interactive session will highlight common diagnostic pitfalls and the role
                    of ancillary studies in everyday practice.
                </p>
                <div className={styles.speaker}>
                    <div>
                        <strong>Dr. Natalia Volkova</strong>
                        <span>Professor of Pathology · Northwestern University</span>
                    </div>
                </div>
                <MemberAccess />
            </div>
        </article>

        <div className={styles.upcomingList}>
            {upcomingWebinars.map((webinar) => (
                <article className={styles.upcomingCard} key={webinar.title}>
                    <div className={styles.cardTopline}>
                        <time>{webinar.date}</time>
                        <span>Upcoming</span>
                    </div>
                    <div className={styles.upcomingInfo}>
                        <h3>{webinar.title}</h3>
                        <p>{webinar.speaker}</p>
                    </div>
                    <div className={styles.upcomingTime}>
                        <span>
                            <Clock3 size={15} /> {webinar.time}
                        </span>
                        <span>
                            <MapPin size={15} /> Live on Zoom
                        </span>
                    </div>
                    <MemberAccess compact />
                </article>
            ))}
        </div>
    </PageSection>
)

export default UpcomingWebinarsSection
