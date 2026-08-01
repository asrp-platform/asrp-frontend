import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "../../PageSection.module.scss"

const WebinarsHero = () => (
    <PageSection className={styles.titleSection}>
        <p className={styles.eyebrow}>ASRP EDUCATION</p>
        <h1>Webinars</h1>
        <p className={styles.pageDescription}>
            Learn from leading pathologists, explore timely topics, and connect with colleagues
            through live ASRP educational programs.
        </p>
    </PageSection>
)

export default WebinarsHero
