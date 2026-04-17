import styles from "./Footer.module.scss"
import SocialNetLinks from "../../shared/ui/social-net-links/SocialNetLinks.tsx"
import Rights from "./ui/Rights.tsx"

const Footer = () => {
    return (
        <footer className={styles.footerElement}>
            <div className={styles.infoContainer}>
                <div className={styles.footerAddress}>
                    <span>American Society of Russian‑Speaking Pathologists, Inc.</span>
                    <span>68 Harrison Ave Ste 605 PMB 972536</span>
                    <span>Boston, Massachusetts 02111-1929 US</span>
                </div>
                <div className={styles.footerContacts}>
                    <div>
                        <a href="mailto:admin@asrpath.org" className={styles.contactValue}>
                            admin@asrpath.org
                        </a>
                    </div>
                    <div>
                        <SocialNetLinks />
                    </div>
                </div>
            </div>

            <div className={styles.footerRights}>
                <div className={styles.breakLine} />
                <Rights />
            </div>
        </footer>
    )
}

export default Footer
