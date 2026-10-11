import { Users, GraduationCap, Award, Network } from "lucide-react"
import styles from "./AboutInitiatives.module.scss"

const initiatives = [
    { icon: Users, text: "Unite Russian-speaking pathologists across the United States" },
    { icon: GraduationCap, text: "Launch high-quality educational programs" },
    { icon: Award, text: "Obtain the ability to offer CME credits" },
    { icon: Network, text: "Achieve recognition as a USCAP Companion Society" },
]

const AboutInitiatives = () => (
    <section className={styles.section}>
        <h2>Key initiatives</h2>
        <ul className={styles.grid}>
            {initiatives.map(({ icon: Icon, text }) => (
                <li className={styles.card} key={text}>
                    <span className={styles.icon}>
                        <Icon size={22} aria-hidden="true" />
                    </span>
                    <p>{text}</p>
                </li>
            ))}
        </ul>
    </section>
)
export default AboutInitiatives
