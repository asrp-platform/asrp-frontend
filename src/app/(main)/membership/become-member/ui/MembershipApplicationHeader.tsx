import styles from "./MembershipApplicationHeader.module.scss"
import MembershipApplicationIntro from "./MembershipApplicationIntro/MembershipApplicationIntro"
import MembershipApplicationSteps from "./MembershipApplicationSteps/MembershipApplicationSteps"
import MembershipApplicationNotice from "./MembershipApplicationNotice/MembershipApplicationNotice"

const MembershipApplicationHeader = () => (
    <header className={styles.header}>
        <MembershipApplicationIntro />
        <MembershipApplicationSteps />
        <MembershipApplicationNotice />
    </header>
)

export default MembershipApplicationHeader
