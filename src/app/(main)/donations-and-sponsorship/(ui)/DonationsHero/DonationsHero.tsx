import LinkButton from "@/shared/ui/Buttons/LinkButton"
import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "./DonationsHero.module.scss"
import SponsorsList from "../SponsorsList/SponsorsList"

const DonationsHero = () => (
    <PageSection className={styles.heroSection}>
        <div className={styles.heroWrapper}>
            <div>
                <h2 className={styles.heroTitle}>Donations & Sponsorship</h2>
                <h3 className={styles.heroSubtitle}>
                    Partner with ASRP to support education, mentorship, and community
                </h3>
                <p className={styles.heroDescription}>
                    ASRP connects Russian-speaking pathologists, trainees, and laboratory
                    professionals through high-quality education and mentorship. Your support helps
                    us build accessible programming while giving partners a mission-aligned way to
                    engage a focused professional audience.
                </p>
                <div className={styles.heroButtons}>
                    <LinkButton href="#individual_donors" variant="red">
                        Individual Donors
                    </LinkButton>
                    <LinkButton href="#corporate_sponsors" variant="default">
                        Corporate Sponsors
                    </LinkButton>
                </div>
                <p className={styles.heroDisclaimer}>
                    ASRP maintains independence over educational content. Support does not imply
                    endorsement of any product, service, or clinical approach.
                </p>
            </div>
            <div className={styles.sponsorsSection}>
                <h3 className={styles.sponsorsTitle}>Our Sponsors</h3>
                <SponsorsList />
            </div>
        </div>
    </PageSection>
)

export default DonationsHero
