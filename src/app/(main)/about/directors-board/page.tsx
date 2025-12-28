import styles from "./styles.module.scss";
import DirectorsBoard from "./(components)/DirectorsBoard/DirectorsBoard.tsx";


const Page = async () => {

    return (
        <div className={styles.pageContainer}>
            <section>
                <div className={styles.headingCardContainer}>
                    <h1>ASRP Board of Directors</h1>
                    <p>The leadership team guiding the American Society of Russian-speaking Pathologists in its mission to foster community, mentorship, and excellence in pathology.</p>
                </div>
            </section>
            <section>
                <DirectorsBoard />
            </section>
        </div>
    );
};

export default Page;