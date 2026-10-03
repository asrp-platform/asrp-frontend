import styles from "./styles.module.scss"
import LegalDocumentLink from "@shared/ui/LegalDocumentLink/LegalDocumentLink.tsx"
import { SUBMISSION_GUIDELINES_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

const ShareSection = () => {
    return (
        <section className={styles.shareCard}>
            <div>
                <h2>Have an interesting case to share?</h2>
                <p>We welcome educational pathology cases from ASRP members.</p>
            </div>
            <LegalDocumentLink
                endpoint={SUBMISSION_GUIDELINES_URL}
                label="View Case Preparation & Submission Guidelines ↗"
                className={styles.guidelinesButton}
            />
        </section>
    )
}

export default ShareSection
