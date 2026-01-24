import styles from "./styles.module.scss"
import type { ReactNode } from "react"
import clsx from "clsx"

interface IProps {
    title: string | ReactNode
    content?: string | ReactNode

    className?: string
    titleClassName?: string
    contentClassName?: string
}

const PageTitleCard = ({ title, content, className, titleClassName, contentClassName }: IProps) => {
    return (
        <section className={clsx(styles.cardTitleSection, className)}>
            <div>
                {typeof title === "string" ? (
                    <h1 className={clsx(styles.cardTitle, titleClassName)}>{title}</h1>
                ) : (
                    title
                )}
            </div>

            {content && (
                <div className={clsx(styles.cardContent, contentClassName)}>
                    {typeof content === "string" ? <p>{content}</p> : content}
                </div>
            )}
        </section>
    )
}

export default PageTitleCard
