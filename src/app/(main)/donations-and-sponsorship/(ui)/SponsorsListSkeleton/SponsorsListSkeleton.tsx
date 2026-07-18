import styles from "./SponsorsListSkeleton.module.scss"

const SponsorsListSkeleton = () => (
    <ul className={styles.sponsorsList}>
        {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className={styles.sponsorItemSkeleton} aria-hidden />
        ))}
    </ul>
)

export default SponsorsListSkeleton
