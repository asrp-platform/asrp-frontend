import styles from "./styles.module.scss"
import type { ReactNode } from "react"

interface IProps {
    children?: ReactNode
}

const SearchFilterDropdownLayout = ({ children }: IProps) => {
    return <div className={styles.searchFilterDropdown}>{children}</div>
}

export default SearchFilterDropdownLayout
