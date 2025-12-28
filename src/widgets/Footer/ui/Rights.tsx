import styles from "../Footer.module.scss"
// import Divider from "../../../shared/((ui))/Divider.tsx"
import Link from "next/link";


const Rights = () => {
    return (
        <div className={styles.privacyContainer}>
            <div>
                <Link href="/policies">All rights reserved</Link>
            </div>
            <div className={styles.policies}>
                <Link href="/policies">Terms of use</Link>
                <Link href="/policies">Privacy Policy</Link>
                <Link href="/policies">Cookie Notice</Link>
            </div>
        </div>
    )
}

export default Rights
