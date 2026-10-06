import MembershipTypesCards from "../MembershipTypesCards/MembershipTypesCards"
import styles from "./MembershipCategories.module.scss"

const MembershipCategories = () => (
    <section className={styles.categoriesSection}>
        <h2 className={styles.centerCategoriesTitle}>Membership categories</h2>
        <p className={styles.categoriesInfo}>
            ASRP offers several membership categories to reflect different stages of training and
            professional involvement, while supporting a shared mission and community.
        </p>

        <MembershipTypesCards />
    </section>
)

export default MembershipCategories
