import { MessagesSquare, Microscope, Network, Compass } from "lucide-react"
import styles from "./HomePrograms.module.scss"

const HomePrograms = () => (
    <section>
        <div className={styles.programsContainer}>
            <h2>Programs and opportunities</h2>
            <p>
                Our activities mirror larger pathology associations while focusing on the needs of
                Russian-speaking colleagues.
            </p>
            <div className={styles.programsCardContainer}>
                <div className={styles.programCard}>
                    <MessagesSquare className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Mentorship circles</h3>
                    <p>
                        Structured pairings and small groups connecting trainees and early-career
                        pathologists with experienced mentors.
                    </p>
                </div>
                <div className={styles.programCard}>
                    <Microscope className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Case-based education</h3>
                    <p>
                        Virtual case conferences, journal clubs, and subspecialty-focused sessions
                        with bilingual-friendly discussion.
                    </p>
                </div>
                <div className={styles.programCard}>
                    <Network className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Community & networking</h3>
                    <p>
                        Online spaces and in-person meetups at national meetings for informal
                        support and collaboration.
                    </p>
                </div>
                <div className={styles.programCard}>
                    <Compass className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Support for trainees & IMGs</h3>
                    <p>
                        Peer advice on exams, applications, visas, and adapting to practice and life
                        in the United States.
                    </p>
                </div>
            </div>
        </div>
    </section>
)

export default HomePrograms
