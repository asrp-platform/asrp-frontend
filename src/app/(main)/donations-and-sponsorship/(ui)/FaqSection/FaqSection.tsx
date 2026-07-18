import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "./FaqSection.module.scss"

const questions = [
    {
        question: "Is my donation or sponsorship tax-deductible?",
        answer: "ASRP is a nonprofit organization. Tax treatment depends on your situation and the benefits received. Please consult your tax advisor; we can provide documentation upon request.",
    },
    {
        question: "Do sponsors influence educational content?",
        answer: "No. ASRP maintains full control over educational content, faculty, and materials. Sponsor recognition is acknowledgment only.",
    },
    {
        question: "Can our organization request a custom package?",
        answer: "Yes. If you have specific goals, we can tailor a simple package.",
    },
    {
        question: "Do you share member contact information?",
        answer: "No. We do not sell or share member email lists.",
    },
]

const FaqSection = () => (
    <PageSection className={styles.faqSection}>
        <div className={styles.sectionIntro}>
            <h2 className={styles.sectionLabel}>FAQ</h2>
            <h3 className={styles.sectionHeading}>Common questions</h3>
        </div>
        <ul className={styles.faqList}>
            {questions.map(({ question, answer }) => (
                <li key={question} className={styles.card} style={{ gap: 8, padding: 24 }}>
                    <h3 className={styles.faqQuestion}>{question}</h3>
                    <p className={styles.faqAnswer}>{answer}</p>
                </li>
            ))}
        </ul>
    </PageSection>
)

export default FaqSection
