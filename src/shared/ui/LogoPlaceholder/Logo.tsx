"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import styles from "./styles.module.scss"
import { useIsMobile } from "../../hooks/useIsMobile.ts"

interface IProps {
    clickable?: boolean
    width?: number
    height?: number
}

const Logo = ({ clickable = true, width = 48, height = 48 }: IProps) => {
    const router = useRouter()

    const isMobile = useIsMobile()

    const handleLogoClick = () => {
        if (window.location.pathname === "/") {
            window.location.reload()
        } else {
            router.push("/")
        }
    }

    return (
        <div className={styles.logoPlaceholder} onClick={clickable ? handleLogoClick : undefined}>
            {isMobile ? (
                <Image
                    height={height}
                    width={width}
                    src="/logo/png/LogoLightHorizontal.png"
                    alt="logo"
                />
            ) : (
                <Image
                    width={width}
                    height={height}
                    src="/logo/png/LogoLightVertical.png"
                    alt="logo"
                />
            )}
        </div>
    )
}

export default Logo
