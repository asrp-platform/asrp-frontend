import styles from "./styles.module.scss"
import type { Metadata } from "next"
import PageHero from "@widgets/PageHero/PageHero"
import AboutMission from "./ui/AboutMission/AboutMission"
import AboutInitiatives from "./ui/AboutInitiatives/AboutInitiatives"
import AboutLinks from "./ui/AboutLinks/AboutLinks"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    metadataBase: new URL("https://asrpath.org"),
    title: "About Us",
}

const Page = () => (
    <div className={styles.pageContainer}>
        <div className={styles.hero}>
            <PageHero subTitle="ABOUT THE SOCIETY" pageTitle="About ASRP" contentMaxWidth={880}>
                The American Society of Russian-Speaking Pathologists (ASRP) is a not-for-profit
                professional organization established in 2025 to create a supportive environment
                fostering networking, collaboration, and professional development. Our goal is to
                unite pathologists in the United States with similar educational, cultural, and
                language backgrounds.
            </PageHero>
        </div>
        <div className={styles.content}>
            <AboutMission />
            <AboutLinks />
        </div>
        <AboutInitiatives />
    </div>
)
export default Page
