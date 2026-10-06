import styles from "./styles.module.scss"
import MembershipHeader from "./(ui)/MembershipHeader/MembershipHeader"
import MembershipBenefits from "./(ui)/MembershipBenefits/MembershipBenefits"
import MembershipCallToAction from "./(ui)/MembershipCallToAction/MembershipCallToAction"
import MembershipCategories from "./(ui)/MembershipCategories/MembershipCategories"

const MembershipPage = () => (
    <div className={styles.pageContainer} id="top">
        <MembershipHeader />
        <MembershipBenefits />
        <MembershipCallToAction />
        <MembershipCategories />
    </div>
)

export default MembershipPage
