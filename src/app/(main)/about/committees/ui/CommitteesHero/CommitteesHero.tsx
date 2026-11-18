import { GraduationCap, Users, Microscope, MessagesSquare, Landmark } from "lucide-react"
import PageHero from "@widgets/PageHero/PageHero"
import styles from "./CommitteesHero.module.scss"

const areas = [
    { icon: GraduationCap, label: "Education" },
    { icon: Users, label: "Membership" },
    { icon: Microscope, label: "Research" },
    { icon: MessagesSquare, label: "Communications" },
    { icon: Landmark, label: "Governance" },
]

const CommitteesHero = () => (
    <div className={styles.hero}>
        <PageHero
            subTitle="COMMITTEES & PARTICIPATION"
            pageTitle="ASRP Committees"
            contentMaxWidth={820}
        >
            Our committee structure is currently being developed. In the coming months, ASRP plans
            to establish dedicated committees in education, membership, research, communications,
            and governance.
        </PageHero>
        <p className={styles.invitation}>
            We warmly invite members and pathology trainees who are interested in building ASRP from
            the ground up to get involved.
        </p>
        <ul className={styles.areas} aria-label="Planned committee areas">
            {areas.map(({ icon: Icon, label }) => (
                <li key={label}>
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                </li>
            ))}
        </ul>
    </div>
)
export default CommitteesHero
