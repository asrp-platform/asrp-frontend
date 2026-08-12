import PageSection from "@/shared/ui/PageSection/PageSection"
import HeroSection from "@/app/(main)/education/ui/HeroSection/HeroSection"
import EducationCatalog from "@/app/(main)/education/ui/EducationCatalog/EducationCatalog"
import CaseOfTheMonth from "@/app/(main)/education/ui/CaseOfTheMonth/CaseOfTheMonth"
import EducationalVideos from "@/app/(main)/education/ui/EducationalVideos/EducationalVideos"
import { Alert } from "antd"
import styles from "@/app/(main)/education/styles.module.scss"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <PageSection>
                <Alert
                    type="info"
                    showIcon
                    message="Educational content is under development"
                    description="Please note that the educational sections listed below are currently under development. We are actively working on adding content and making these resources available. Thank you for your patience."
                />
            </PageSection>

            <PageSection>
                <HeroSection />
            </PageSection>

            <PageSection id="catalog">
                <EducationCatalog />
            </PageSection>

            <PageSection id="case-of-month">
                <CaseOfTheMonth />
            </PageSection>

            <PageSection id="videos">
                <EducationalVideos />
            </PageSection>
        </div>
    )
}

export default Page
