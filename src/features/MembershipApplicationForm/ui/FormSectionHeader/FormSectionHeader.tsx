import type { ReactNode } from "react"
import styles from "../../styles.module.scss"
const FormSectionHeader = ({ title, children }: { title: string; children?: ReactNode }) => (
    <div className={styles.blockInfoContainer}>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
    </div>
)
export default FormSectionHeader
