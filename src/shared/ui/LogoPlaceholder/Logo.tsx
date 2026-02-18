"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import verticalLogoSVG from "../../../../public/logo/png/LogoLightVertical.png"
import horizontalLogoSVG from "../../../../public/logo/png/LogoLightHorizontal.png"

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
                <Image height={height} src={horizontalLogoSVG} alt="logo" />
            ) : (
                <Image width={width} height={height} src={verticalLogoSVG} alt="logo" />
            )}
        </div>
    )
}

export default Logo
