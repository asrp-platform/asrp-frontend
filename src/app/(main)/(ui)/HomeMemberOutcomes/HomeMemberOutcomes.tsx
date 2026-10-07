import { GraduationCap, Users, BookOpen } from "lucide-react"
import styles from "./HomeMemberOutcomes.module.scss"

const HomeMemberOutcomes = () => (
    <section>
        <div>
            <div className={styles.memberOutcomesInfoContainer}>
                <p className={styles.eyebrow}>Member outcomes</p>
                <h2>Support that meets you at every stage</h2>
                <p>
                    Whether you are stepping into training, advancing subspecialty skills, or
                    leading a laboratory, ASRP programs provide the structure and community to
                    thrive.
                </p>
            </div>
            <div className={styles.memberOutcomesCardContainer}>
                <div className={styles.memberOutcomesCard}>
                    <GraduationCap className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Professional development</h3>
                    <p>
                        Advance your experience with workshops, certification support, and
                        faculty-led discussions.
                    </p>
                </div>
                <div className={styles.memberOutcomesCard}>
                    <Users className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Networking & Mentorship</h3>
                    <p>
                        Build meaningful relationships through curated mentorship circles and peer
                        forums.
                    </p>
                </div>
                <div className={styles.memberOutcomesCard}>
                    <BookOpen className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Educational Resources</h3>
                    <p>
                        Access webinars, case libraries, and bilingual learning materials from
                        leading experts.
                    </p>
                </div>
            </div>
        </div>
    </section>
)

export default HomeMemberOutcomes
