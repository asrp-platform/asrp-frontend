import styles from "./styles.module.scss"
import DirectorsBoard from "./(components)/DirectorsBoard/DirectorsBoard"
import PageHero from "@widgets/PageHero/PageHero"

const Page = () => (
    <div className={styles.pageContainer}>
        <div className={styles.hero}>
            <PageHero
                subTitle="LEADERSHIP"
                pageTitle="ASRP Board of Directors"
                contentMaxWidth={720}
            >
                The leadership team guiding the American Society of Russian-speaking Pathologists.
            </PageHero>
        </div>
        <section className={styles.boardSection} aria-label="Board members">
            <DirectorsBoard />
        </section>
    </div>
)

export default Page
