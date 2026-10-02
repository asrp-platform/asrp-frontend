import { Skeleton } from "antd"
import styles from "./styles.module.scss"

const CasesSkeletonGrid = () => {
    return (
        <div className={styles.skeletonGrid}>
            {[0, 1, 2, 3].map((item) => (
                <div className={styles.skeletonCard} key={item}>
                    <Skeleton.Image active className={styles.skeletonImage} />
                    <Skeleton active paragraph={{ rows: 3 }} />
                </div>
            ))}
        </div>
    )
}

export default CasesSkeletonGrid
