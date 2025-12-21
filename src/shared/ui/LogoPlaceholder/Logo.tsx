"use client"

import {useRouter} from "next/navigation";
import Image from "next/image";

import logoPng from "../../../../public/logo/png/2.png"
import styles from "./styles.module.scss"


interface IProps {
    clickable?: boolean
    width?: number
    height?: number
}

const Logo = ({ clickable = true, width = 48, height = 48 }: IProps) => {
    const router = useRouter();

    const handleLogoClick = () => {
        if (window.location.pathname === "/") {
            window.location.reload()
        } else {
            router.push("/")
        }
    }

    return (
        <div className={styles.logoPlaceholder} onClick={clickable ? handleLogoClick : undefined}>
            <Image width={width} height={height} src={logoPng} alt="logo" />
        </div>
    )
}

export default Logo
