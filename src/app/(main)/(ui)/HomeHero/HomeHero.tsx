import Link from "next/link"
import Image from "next/image"
import styles from "./HomeHero.module.scss"

const HomeHero = () => (
    <section className={styles.hero}>
        <div className={styles.mainTitleContainer}>
            <h1>A professional home for Russian-speaking pathologists in the U.S.</h1>
            <p className={styles.eyebrow}>OUR MISSION</p>
            <p>
                To create and support a platform for a professional community for Russian-speaking
                pathologists in the United States. Join our members in building a network dedicated
                to mentorship, education, and collaborative excellence.
            </p>
            <div className={styles.mainTitleButtonContainer}>
                <Link href="/membership/become-member" className={styles.becomeMemberButton}>
                    Become a member
                </Link>
                <Link href="/about" className={styles.learnMoreButton}>
                    Learn more
                </Link>
            </div>
        </div>
        <div className={styles.heroEmblem} aria-hidden="true">
            <Image src="/logo/png/LogoLightVertical.png" alt="" width={320} height={320} priority />
        </div>
    </section>
)

export default HomeHero
