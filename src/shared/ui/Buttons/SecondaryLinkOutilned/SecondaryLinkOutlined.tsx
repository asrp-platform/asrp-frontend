import Link from "next/link"
import styles from "@/shared/ui/Buttons/SecondaryLinkOutilned/SecondaryLinkOutlined.module.scss"
import clsx from "clsx"

interface IProps {
    href: string
    children: string
    className?: string
}

const SecondaryLinkOutlined = ({ href, children, className }: IProps) => {
    return (
        <Link href={href} className={clsx(styles.secondaryLinkOutlined, className)}>
            {children}
        </Link>
    )
}

export default SecondaryLinkOutlined
