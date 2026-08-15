import { Skeleton } from "antd"

import styles from "./FormSkeleton.module.scss"

interface FormSkeletonProps {
    rows?: number
}

const FormSkeleton = ({ rows = 4 }: FormSkeletonProps) => {
    const rowsCount = Math.max(0, Math.floor(rows))

    return (
        <div className={styles.form} role="status" aria-label="Loading form">
            {Array.from({ length: rowsCount }, (_, index) => (
                <div className={styles.row} key={index}>
                    <Skeleton.Input active size="small" className={styles.label} />
                    <Skeleton.Input active block className={styles.input} />
                </div>
            ))}

            <Skeleton.Button active className={styles.button} />
        </div>
    )
}

export default FormSkeleton
