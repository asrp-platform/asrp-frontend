import GuidesListCard from "../GuidesListCard/GuidesListCard"
import styles from "./HomeVision.module.scss"

const HomeVision = () => (
    <section className={styles.visionInnerContainer}>
        <div className={styles.visionInfoContainer}>
            <p className={styles.eyebrow}>Our vision</p>
            <h2>Creating a professional home for Russian-speaking pathologists</h2>
            <p>
                As a 501(c)(3) nonprofit, ASRP is building a trusted hub where language and culture
                amplify professional excellence. We champion continuous learning, mentorship across
                generations, and collaborative leadership in pathology.
            </p>
            <p>
                Your participation helps establish the practices, educational pathways, and advocacy
                efforts that will serve future clinicians and scientists.
            </p>
        </div>
        <GuidesListCard />
    </section>
)

export default HomeVision
