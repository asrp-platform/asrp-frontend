"use client"

import {useRouter} from "next/navigation";
import Image from "next/image";

import logoPng from "../../../../public/logo/png/2.png"
import styles from "./styles.module.scss"


interface IProps {
    clickable?: boolean
}

const Logo = ({ clickable = true }: IProps) => {
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
            <Image src={logoPng} alt="logo" />
        </div>
    )
}

export default Logo
