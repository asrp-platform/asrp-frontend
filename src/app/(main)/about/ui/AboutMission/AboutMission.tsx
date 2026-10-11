import { HeartHandshake } from "lucide-react"
import styles from "./AboutMission.module.scss"

const AboutMission = () => (
    <section className={styles.mission}>
        <div className={styles.heading}>
            <span className={styles.icon}>
                <HeartHandshake size={24} aria-hidden="true" />
            </span>
            <h2>Our Mission</h2>
        </div>
        <p>
            ASRP strives to build a dynamic, welcoming, and academically rich community for
            Russian-speaking pathologists, trainees, and pathology aspirants across the United
            States. Through mentorship, scientific collaboration, and educational events, we aim to
            promote professional growth and integration within the broader pathology community.
        </p>
        <p>
            We envision ASRP as a platform that connects members through shared values, mutual
            respect, and commitment to advancing pathology as a discipline.
        </p>
    </section>
)
export default AboutMission
