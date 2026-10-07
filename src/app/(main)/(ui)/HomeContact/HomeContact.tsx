import ContactForm from "@/features/ContactForm/ContactForm"
import styles from "./HomeContact.module.scss"

const HomeContact = () => (
    <section>
        <div className={styles.connectContainer}>
            <div className={styles.connectInfoContainer}>
                <p className={styles.eyebrow}>Connect with us</p>
                <h2>Have a question or want to collaborate?</h2>
                <p>
                    Share your ideas for programming, sponsorship, or partnership opportunities. We
                    will follow up with next steps.
                </p>
            </div>
            <div className={styles.connectForm}>
                <ContactForm />
            </div>
        </div>
    </section>
)

export default HomeContact
