import styles from "./GuidesListCard.module.scss"
import Link from "next/link"

const GUIDES_ITEMS = [
    { id: 1, text: "Elevating clinical quality through shared expertise" },
    { id: 2, text: "Championing bilingual education and inclusive mentorship" },
    { id: 3, text: "Advocating for members in national professional forums" },
]

const GuidesListCard = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>What guides our work</h3>
            <ul className={styles.guidingWorkList}>
                {GUIDES_ITEMS.map(({ text, id }) => (
                    <li key={id} className={styles.guidingWorkItem}>
                        {text}
                    </li>
                ))}
            </ul>
            <Link type="button" href="/about" className={styles.aboutLinkButton}>
                Learn about ASRP
            </Link>
        </div>
    )
}

export default GuidesListCard
