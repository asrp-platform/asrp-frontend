import { FileText, MessagesSquare } from "lucide-react"
import SocialNetLinks from "@shared/ui/SocialNetLinks/SocialNetLinks"
import BylawsLink from "../BylawsLink"
import styles from "./AboutLinks.module.scss"

const AboutLinks = () => (
    <aside className={styles.panel} aria-labelledby="about-quick-links">
        <div className={styles.heading}>
            <FileText size={22} aria-hidden="true" />
            <h2 id="about-quick-links">Quick Links</h2>
        </div>
        <BylawsLink className={styles.bylawsLink} />
        <div className={styles.social}>
            <div className={styles.heading}>
                <MessagesSquare size={20} aria-hidden="true" />
                <h3>Our Social Media:</h3>
            </div>
            <SocialNetLinks withLabels />
        </div>
    </aside>
)
export default AboutLinks
