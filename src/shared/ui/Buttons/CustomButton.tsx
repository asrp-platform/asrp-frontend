import clsx from "clsx"

import styles from "@/shared/ui/Buttons/Buttons.module.scss"
import type { MouseEventHandler, ReactNode } from "react"
import CircularProgress from "@mui/material/CircularProgress"

interface IProps {
    children: ReactNode | string
    loading?: boolean
    disabled?: boolean
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    htmlType?: "button" | "submit" | "reset"
    variant?: "primary" | "secondary"
}

const CustomButton = ({
    children,
    loading,
    disabled,
    className,
    onClick,
    htmlType = "button",
    variant = "primary",
}: IProps) => {
    return (
        <button
            className={clsx(styles.button, variant && styles[variant], className)}
            onClick={onClick}
            type={htmlType}
            disabled={disabled || loading}
        >
            <div className={styles.innerContainer}>
                <span className={clsx(styles.loaderSlot, loading && styles.loaderSlot_visible)}>
                    <CircularProgress size={12} />
                </span>
                {children}
            </div>
        </button>
    )
}

export default CustomButton
