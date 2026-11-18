import type { ReactNode } from "react"
import styles from "../../styles.module.scss"
const FormFieldsGrid = ({ children }: { children: ReactNode }) => (
    <div className={styles.grid}>{children}</div>
)
export default FormFieldsGrid
