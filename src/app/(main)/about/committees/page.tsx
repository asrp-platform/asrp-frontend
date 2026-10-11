import styles from "./styles.module.scss"
import CommitteesHero from "./ui/CommitteesHero/CommitteesHero"
import CommitteeParticipation from "./ui/CommitteeParticipation/CommitteeParticipation"
import GetInvolvedCommitteesForm from "@/features/GetInvolvedCommitteesForm/GetInvolvedCommitteesForm"

export default function ASRPCommitteesPage() {
    return (
        <div className={styles.pageContainer} id="top">
            <CommitteesHero />
            <section className={styles.involved}>
                <CommitteeParticipation />
                <GetInvolvedCommitteesForm />
            </section>
        </div>
    )
}
