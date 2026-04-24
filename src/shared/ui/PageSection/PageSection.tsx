import styles from "@/shared/ui/PageSection/styles.module.scss"
import type { ReactNode } from "react"

import clsx from "clsx"

interface IProps {
    children: ReactNode
    className?: string
}

const PageSection = ({ children, className }: IProps) => {
    return <section className={clsx(styles.pageSection, className)}>{children}</section>
}

export default PageSection
