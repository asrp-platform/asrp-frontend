import Link from "next/link"
import styles from "./styles.module.scss"

const CaseOfTheMonth = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.caseOfMonthSection}>
                <div className={styles.caseOfMonthHeader}>
                    <span className={styles.featuredLabel}>Featured series</span>
                    <h2>Case of the Month (Public)</h2>
                    <p>
                        Interesting, challenging cases with practical workup pearls — open to the
                        broader pathology community.
                    </p>
                </div>
                <div className={styles.caseOfMonthCard}>
                    <p>
                        The ASRP Case of the Month series highlights educational pathology cases
                        contributed by practicing pathologists, residents, and fellows from across
                        the Russian-speaking and international pathology community. Each monthly
                        case showcases key diagnostic features, practical workup approaches,
                        differential diagnoses, and relevant ancillary studies—supported by
                        high-quality digital images.
                    </p>
                    <p>
                        The series promotes active learning across all subspecialties, including
                        surgical pathology, cytopathology, hematopathology, molecular diagnostics,
                        and laboratory medicine. It is useful for trainees preparing for board
                        examinations and for practicing pathologists who want to refresh or expand
                        their diagnostic skills.
                    </p>
                    <div className={styles.caseOfMonthButtons}>
                        <Link href="#" className={styles.viewCasesButton}>
                            View cases
                        </Link>
                        <Link href="#" className={styles.submitCaseButton}>
                            Submit a case
                        </Link>
                    </div>
                    <p className={styles.submissionNote}>
                        Want your case considered for publication? Email your draft to{" "}
                        <a href="#">admin@asrpath.org</a> and include{" "}
                        <strong>"Case of the Month: Submission"</strong> in the subject line.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CaseOfTheMonth
