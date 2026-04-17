import styles from "./styles.module.scss"
import SocialNetLinks from "../../../shared/ui/social-net-links/SocialNetLinks.tsx"
import ContactForm from "../../../features/ContactForm/ContactForm.tsx"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <section>
                <div className={styles.mainHeadingContainer}>
                    <h1>Get in touch with ASRP</h1>
                    <p>
                        Whether you have questions, collaboration ideas, sponsorship inquiries, or
                        suggestions for new programs — we are here to listen and help.
                    </p>
                </div>
            </section>
            <section>
                <div className={styles.contactInformationContainer}>
                    <div className={styles.informationContainer}>
                        <h2>Contact information</h2>
                        <h3>We are always happy to connect</h3>
                        <div className={styles.informationCard}>
                            <div className={styles.contactItem}>
                                <h4 className={styles.contactLabel}>Email</h4>
                                <a href="mailto:admin@asrpath.org" className={styles.contactValue}>
                                    admin@asrpath.org
                                </a>
                            </div>
                            <div className={styles.contactItem}>
                                <h4 className={styles.contactLabel}>Mailing address</h4>
                                <address className={styles.contactValue}>
                                    American Society of Russian-Speaking Pathologists, Inc.
                                    <br />
                                    68 Harrison Ave Ste 605 PMB 972536
                                    <br />
                                    Boston, Massachusetts 02111-1929 US
                                </address>
                            </div>
                        </div>
                        <div className={styles.followUsContainer}>
                            <h4>Follow us</h4>
                            <SocialNetLinks />
                        </div>
                    </div>
                    <div className={styles.sendMessageFormContainer}>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
