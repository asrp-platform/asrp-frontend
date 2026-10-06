import styles from "./MembershipHeader.module.scss"

const MembershipHeader = () => (
    <header className={styles.header}>
        <span className={styles.eyebrow}>ASRP membership</span>
        <h1>
            Membership in the American Society
            <br />
            of Russian-Speaking Pathologists (ASRP)
        </h1>
        <p>
            By becoming a member, you connect with colleagues who share similar educational,
            cultural, and language backgrounds and who understand the unique challenges you face.
            Joining our community means having a supportive space where you can grow professionally
            at every stage of your training and career.
        </p>
    </header>
)

export default MembershipHeader
