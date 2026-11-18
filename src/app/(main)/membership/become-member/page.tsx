import PageSection from "@/shared/ui/PageSection/PageSection.tsx"
import styles from "@/app/(main)/membership/become-member/styles.module.scss"
import MembershipApplicationForm from "@/features/MembershipApplicationForm/MembershipApplicationForm.tsx"
import MembershipApplicationHeader from "./ui/MembershipApplicationHeader"

const Page = () => {
    return (
        <div className={styles.page} id="top">
            <div className={styles.pageContainer}>
                <MembershipApplicationHeader />
                <PageSection className={styles.personalInformationSection}>
                    <MembershipApplicationForm />
                </PageSection>
            </div>
        </div>
    )
}

export default Page
