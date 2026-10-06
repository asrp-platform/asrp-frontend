import styles from "./MembershipApplicationIntro.module.scss"

const MembershipApplicationIntro = () => (
    <>
        <span className={styles.eyebrow}>ASRP membership</span>
        <h1 className={styles.title}>
            Join a growing community
            <br />
            of pathology professionals
        </h1>
        <p className={styles.intro}>
            Apply for ASRP membership and connect with colleagues who share your interests. Complete
            the form below to get started.
        </p>
    </>
)

export default MembershipApplicationIntro
