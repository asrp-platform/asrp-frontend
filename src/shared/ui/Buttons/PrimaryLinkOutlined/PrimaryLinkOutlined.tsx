import Link from "next/link"
import styles from "@/shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.module.scss"
import clsx from "clsx"

interface IProps {
    href: string
    children: string
    className?: string
}

const PrimaryLinkOutlined = ({ href, children, className }: IProps) => {
    return (
        <Link href={href} className={clsx(styles.primaryLinkOutlined, className)}>
            {children}
        </Link>
    )
}

export default PrimaryLinkOutlined
