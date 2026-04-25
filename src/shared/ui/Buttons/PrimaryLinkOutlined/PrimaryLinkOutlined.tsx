import Link from "next/link"
import styles from "@/shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.module.scss"

interface IProps {
    href: string
    children: string
}

const PrimaryLinkOutlined = ({ href, children }: IProps) => {
    return (
        <Link href={href} className={styles.primaryLinkOutlined}>
            {children}
        </Link>
    )
}

export default PrimaryLinkOutlined
