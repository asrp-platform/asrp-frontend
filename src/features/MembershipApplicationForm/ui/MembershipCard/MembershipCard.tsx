import { Form, Radio } from "antd"
import type { MembershipKey } from "../../types"
import styles from "./styles.module.scss"
import clsx from "clsx"

type MembershipCardProps = {
    value: MembershipKey
    title: string
    description: string
    price?: string
    disabled?: boolean
}

const MembershipCard = ({ value, title, description, price, disabled }: MembershipCardProps) => {
    const form = Form.useFormInstance()

    const handleClick = () => {
        if (disabled) return
        form.setFieldsValue({ membership: value })
    }

    return (
        <div
            className={clsx(
                styles.membershipCardContainer,
                !disabled && styles.activeMembershipCard,
                disabled && styles.disabledMembershipCard,
            )}
            onClick={handleClick}
            role="button"
            aria-disabled={disabled}
        >
            <Radio value={value} disabled={disabled}>
                <strong>{title}</strong>
                <p>{description}</p>
                {price && (
                    <p>
                        <b>{price}</b>
                    </p>
                )}
            </Radio>
        </div>
    )
}

export default MembershipCard
