import { Lightbulb, Handshake, BookOpen } from "lucide-react"
import styles from "./CommitteeParticipation.module.scss"

const opportunities = [
    { icon: Lightbulb, text: "Sharing ideas for future ASRP committees" },
    { icon: Handshake, text: "Volunteering to serve as a committee member or chair" },
    { icon: BookOpen, text: "Helping design educational or research programs" },
]

const CommitteeParticipation = () => (
    <div className={styles.content}>
        <h2>Get Involved in Future Committees</h2>
        <p>If you are interested in:</p>
        <ul className={styles.opportunities}>
            {opportunities.map(({ icon: Icon, text }) => (
                <li key={text}>
                    <span className={styles.icon}>
                        <Icon size={22} aria-hidden="true" />
                    </span>
                    <span>{text}</span>
                </li>
            ))}
        </ul>
        <p className={styles.note}>
            Please use the form to let us know how you would like to contribute.
        </p>
    </div>
)
export default CommitteeParticipation
