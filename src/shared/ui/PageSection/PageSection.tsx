import styles from "@/shared/ui/PageSection/styles.module.scss"
import type { ReactNode } from "react"

import clsx from "clsx"

interface IProps {
    children: ReactNode
    className?: string
    id?: string
}

const PageSection = ({ children, className, id }: IProps) => {
    return (
        <section id={id} className={clsx(styles.pageSection, className)}>
            {children}
        </section>
    )
}

export default PageSection
