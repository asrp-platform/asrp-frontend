import styles from "./styles.module.scss"
import GetInvolvedForm from "../../../../features/GetInvolvedForm/GetInvolvedForm.tsx"

export default function ASRPCommitteesPage() {
    return (
        <div className={styles.pageContainer} id="top">
            <section className={styles.headingCardContainer}>
                <h1>ASRP Committees</h1>
                <p>
                    Our committee structure is currently being developed. In the coming months, ASRP
                    plans to establish dedicated committees in education, membership, research,
                    communications, and governance.
                </p>
                <p>
                    We warmly invite members and pathology trainees who are interested in building
                    ASRP from the ground up to get involved.
                </p>
            </section>

            <section className={styles.involved}>
                <div className={styles.involvedGrid}>
                    <div className={styles.involvedText}>
                        <h2>Get Involved in Future Committees</h2>
                        <p>If you are interested in:</p>
                        <ul>
                            <li>Sharing ideas for future ASRP committees</li>
                            <li>Volunteering to serve as a committee member or chair</li>
                            <li>Helping design educational or research programs</li>
                        </ul>
                        <p>Please use the form to let us know how you would like to contribute.</p>
                    </div>
                    <GetInvolvedForm />
                </div>
            </section>
        </div>
    )
}
