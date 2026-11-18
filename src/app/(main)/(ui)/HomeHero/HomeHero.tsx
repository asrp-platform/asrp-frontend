import Link from "next/link"
import HomeCommunityVisual from "./HomeCommunityVisual"
import styles from "./HomeHero.module.scss"

const HomeHero = () => (
    <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.intro}>
            <p className={styles.identity}>American Society of Russian-Speaking Pathologists</p>
            <h1 id="home-title">
                A <span>professional home</span> for Russian-speaking pathologists in the U.S.
            </h1>
            <div className={styles.actions}>
                <Link href="/membership/become-member" className={styles.primaryLink}>
                    Become a member
                </Link>
                <Link href="/about" className={styles.secondaryLink}>
                    Learn more
                </Link>
            </div>
        </div>
        <HomeCommunityVisual />
        <div className={styles.mission}>
            <p className={styles.eyebrow}>OUR MISSION</p>
            <p className={styles.missionText}>
                To create and support a platform for a professional community for Russian-speaking
                pathologists in the United States. Join our members in building a network dedicated
                to mentorship, education, and collaborative excellence.
            </p>
        </div>
    </section>
)

export default HomeHero
