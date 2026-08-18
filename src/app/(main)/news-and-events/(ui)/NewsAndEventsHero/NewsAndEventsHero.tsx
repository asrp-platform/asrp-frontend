import PageSection from "@shared/ui/PageSection/PageSection.tsx"
import styles from "./styles.module.scss"

const NewsAndEventsHero = () => {
    return (
        <PageSection className={styles.titleSection}>
            <h1>News & Events</h1>
            <p className={styles.pageDescription}>
                ASRP is pleased to share updates from our professional community and announce
                upcoming events, educational activities, and opportunities for engagement.
            </p>
        </PageSection>
    )
}

export default NewsAndEventsHero
