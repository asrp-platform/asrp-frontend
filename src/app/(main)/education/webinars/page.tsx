import AccessSection from "./(ui)/AccessSection/AccessSection"
import PastWebinarsSection from "./(ui)/PastWebinarsSection/PastWebinarsSection"
import UpcomingWebinarsSection from "./(ui)/UpcomingWebinarsSection/UpcomingWebinarsSection"
import WebinarsHero from "./(ui)/WebinarsHero/WebinarsHero"
import styles from "./PageSection.module.scss"

const Page = () => (
    <div className={styles.pageContainer}>
        <WebinarsHero />
        <UpcomingWebinarsSection />
        <PastWebinarsSection />
        <AccessSection />
    </div>
)

export default Page
