import Link from "next/link"
import styles from "@/shared/ui/Buttons/SecondaryLinkOutilned/SecondaryLinkOutlined.module.scss"

interface IProps {
    href: string
    children: string
}

const SecondaryLinkOutlined = ({ href, children }: IProps) => {
    return (
        <Link href={href} className={styles.secondaryLinkOutlined}>
            {children}
        </Link>
    )
}

export default SecondaryLinkOutlined
