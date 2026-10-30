import Image from "next/image"
import styles from "./HomeCommunityVisual.module.scss"

const HomeCommunityVisual = () => (
    <div className={styles.visual} aria-hidden="true">
        <Image src="/logo/png/LogoDarkVertical.png" alt="" width={320} height={308} priority />
    </div>
)

export default HomeCommunityVisual
