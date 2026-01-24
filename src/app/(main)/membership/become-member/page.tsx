import PageTitleCard from "../../../../shared/ui/PageTitleCard/PageTitleCard.tsx"
import styles from "./styles.module.scss"

const Page = () => {
    const title = (
        <div className={styles.titleContainer}>
            <span>MEMEBERSHIP FORM</span>
            <h1>Join ASRP and become part of a growing community</h1>
        </div>
    )

    return (
        <div className={styles.page} id="top">
            <div className={styles.pageContainer}>
                <PageTitleCard
                    title={title}
                    content={
                        "Please complete the form below to apply for membership. Once your application and membership payment are received, your submission will undergo a brief review to ensure appropriate placement within our membership categories. If an application does not meet the eligibility criteria for any category, the Society reserves the right to decline membership; in such cases, the membership fee is not refundable. We aim to review all applications thoughtfully and accommodate applicants whenever possible."
                    }
                    className={styles.pageTitleContainer}
                    contentClassName={styles.pageTitleContent}
                />
            </div>
        </div>
    )
}

export default Page
