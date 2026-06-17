import PageSection from "@/shared/ui/PageSection/PageSection"
import HeroSection from "@/app/(main)/education/ui/HeroSection/HeroSection"
import EducationCatalog from "@/app/(main)/education/ui/EducationCatalog/EducationCatalog"
import CaseOfTheMonth from "@/app/(main)/education/ui/CaseOfTheMonth/CaseOfTheMonth"
import EducationalVideos from "@/app/(main)/education/ui/EducationalVideos/EducationalVideos"

const Page = () => {
    return (
        <>
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
        </>
    )
}

export default Page
