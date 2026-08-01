import PageSection from "@shared/ui/PageSection/PageSection.tsx"
import styles from "./PageSection.module.scss"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <PageSection className={styles.titleSection}>
                <h1 className={styles.pageTitle}>ASRP EDUCATION</h1>
                <h2 className={styles.WebinarsDescriptionTitle}>Webinars</h2>
                <span className={styles.pageDescription}>
                    Explore upcoming ASRP educational webinars and our growing archive of past
                    programs. Webinar access and recordings are available as a benefit of ASRP
                    membership.
                </span>
            </PageSection>

            <PageSection className={styles.upcomingWebinarsSection}>
                <div className={styles.sectionHeaderContainer}>
                    <div className={styles.sectionTitleContainer}>
                        <h3 className={styles.upcomingWebinarsTitle}>Upcoming Webinars</h3>
                        <span className={styles.upcomingWebinarsDescription}>
                            Live educational programs and upcoming member events.
                        </span>
                    </div>
                    <div className={styles.upcomingNumber}>3 upcoming</div>
                </div>
            </PageSection>
        </div>
    )
}

export default Page
