import clsx from "clsx"

import styles from "@/shared/ui/Buttons/Buttons.module.scss"
import type { MouseEventHandler } from "react"

interface IProps {
    label: string
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    htmlType?: "button" | "submit" | "reset"
}

const PrimaryButton = ({ label, className, onClick, htmlType = "button" }: IProps) => {
    return (
        <button className={clsx(styles.primaryButton, className)} onClick={onClick} type={htmlType}>
            {label}
        </button>
    )
}

export default PrimaryButton
