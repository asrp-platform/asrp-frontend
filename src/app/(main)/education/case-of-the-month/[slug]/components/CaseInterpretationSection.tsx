import type { JSONContent } from "@tiptap/react"

import CaseAnswerReveal from "./CaseAnswerReveal.tsx"
import styles from "../styles.module.scss"

interface IProps {
    questions: string[]
    answer: JSONContent
}

const CaseInterpretationSection = ({ questions, answer }: IProps) => (
    <section className={styles.interpretation}>
        <span className={styles.interpretationLabel}>YOUR INTERPRETATION</span>
        <h2>Before revealing the answer</h2>
        <ol>
            {questions.map((question) => (
                <li key={question}>{question}</li>
            ))}
        </ol>
        <CaseAnswerReveal answer={answer} />
    </section>
)

export default CaseInterpretationSection
