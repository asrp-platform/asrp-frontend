import styles from "./MembershipApplicationSteps.module.scss"

const MembershipApplicationSteps = () => (
    <ol className={styles.steps} aria-label="Application process">
        <li>
            <span className={styles.stepNumber}>1</span>
            <div>
                <h2>Apply</h2>
                <p>Share your professional background and select your membership category.</p>
            </div>
        </li>
        <li>
            <span className={styles.stepNumber}>2</span>
            <div>
                <h2>Complete payment</h2>
                <p>After submitting, continue to the membership payment page.</p>
            </div>
        </li>
        <li>
            <span className={styles.stepNumber}>3</span>
            <div>
                <h2>Application review</h2>
                <p>
                    We review your application and confirm your eligibility and membership category.
                </p>
            </div>
        </li>
    </ol>
)

export default MembershipApplicationSteps
