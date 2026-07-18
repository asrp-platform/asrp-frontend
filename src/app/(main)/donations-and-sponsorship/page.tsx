import styles from "./styles.module.scss"
import {
    ContactSection,
    CorporateSponsorsSection,
    DonationsHero,
    FaqSection,
    IndividualDonorsSection,
    WhyGiveSection,
} from "./(ui)"

const Page = () => (
    <div className={styles.pageContainer}>
        <h1 className="visually-hidden">Donations and Sponsorship page</h1>
        <DonationsHero />
        <WhyGiveSection />
        <IndividualDonorsSection />
        <CorporateSponsorsSection />
        <FaqSection />
        <ContactSection />
    </div>
)

export default Page
