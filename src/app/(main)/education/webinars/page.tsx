import AccessSection from "./(ui)/AccessSection/AccessSection"
import PastWebinarsSection from "./(ui)/PastWebinarsSection/PastWebinarsSection"
import UpcomingWebinarsSection from "./(ui)/UpcomingWebinarsSection/UpcomingWebinarsSection"
import styles from "./PageSection.module.scss"
import PageHero from "@widgets/PageHero/PageHero.tsx"

const Page = () => (
    <div className={styles.pageContainer}>
        <PageHero subTitle={"ASRP EDUCATION"} pageTitle={"Webinars"}>
            Learn from leading pathologists, explore timely topics, and connect with colleagues
            through live ASRP educational programs.
        </PageHero>
        <UpcomingWebinarsSection />
        <PastWebinarsSection />
        <AccessSection />
    </div>
)

export default Page
