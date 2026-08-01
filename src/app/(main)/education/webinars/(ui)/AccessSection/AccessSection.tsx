import PageSection from "@shared/ui/PageSection/PageSection.tsx"
import styles from "./styles.module.scss"
import { ArrowRight } from "lucide-react"
import CustomLink from "@shared/ui/Buttons/CustomLink/CustomLink.tsx"

const AccessSection = () => {
    return (
        <PageSection className={styles.ctaSection}>
            <div className={styles.descriptionContainer}>
                <span>MEMBER BENEFIT</span>
                <h2>Access live webinars and available recordings</h2>
                <p>
                    ASRP members receive access to webinar links, member materials, and the growing
                    educational recording archive.
                </p>
            </div>
            <CustomLink
                href="/membership/become-member"
                variant={"primary-filled"}
                className={styles.ctaLink}
            >
                <div className={styles.linkInnerContainer}>
                    <span>Explore membership</span>
                    <ArrowRight className={styles.icon} size={17} />
                </div>
            </CustomLink>
        </PageSection>
    )
}

export default AccessSection
