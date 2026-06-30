import { SettingOutlined } from "@ant-design/icons"
import styles from "@/widgets/ComingSoon/styles.module.scss"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"

interface ComingSoonProps {
    title?: string
    description?: string
    showBackButton?: boolean
}

const ComingSoon = ({
    title = "Coming Soon",
    description = "This page is currently under development.",
    showBackButton = false,
}: ComingSoonProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <SettingOutlined className={styles.icon} />

                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>

                {showBackButton && <PrimaryLinkOutlined href={"/"}>Go back</PrimaryLinkOutlined>}
            </div>
        </div>
    )
}

export default ComingSoon
