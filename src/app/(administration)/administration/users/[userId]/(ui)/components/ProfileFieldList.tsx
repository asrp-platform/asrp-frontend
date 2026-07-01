import type { ReactNode } from "react"

import styles from "@app/(administration)/administration/users/[userId]/(ui)/styles.module.scss"

export interface IProfileField {
    label: string
    value: ReactNode
    wide?: boolean
}

export type ProfileFieldListVariant =
    | "default"
    | "contact"
    | "professional"
    | "account"
    | "education"
    | "status"
    | "membership"
    | "membershipType"
    | "restrictions"
    | "references"

interface IProps {
    title: string
    fields: IProfileField[]
    variant?: ProfileFieldListVariant
}

const emptyValue = "-"

const getVariantClassName = (variant: ProfileFieldListVariant) => {
    const classNameByVariant: Record<ProfileFieldListVariant, string> = {
        default: "",
        contact: styles.profileSectionContact,
        professional: styles.profileSectionProfessional,
        account: styles.profileSectionAccount,
        education: styles.profileSectionEducation,
        status: styles.profileSectionStatus,
        membership: styles.profileSectionMembership,
        membershipType: styles.profileSectionMembershipType,
        restrictions: styles.profileSectionRestrictions,
        references: styles.profileSectionReferences,
    }

    return classNameByVariant[variant]
}

const ProfileFieldList = ({ title, fields, variant = "default" }: IProps) => {
    return (
        <section className={`${styles.profileSection} ${getVariantClassName(variant)}`}>
            <h3 className={styles.sectionTitle}>{title}</h3>

            <dl className={styles.fieldGrid}>
                {fields.map((field) => (
                    <div
                        key={field.label}
                        className={`${styles.fieldItem} ${field.wide ? styles.fieldItemWide : ""}`}
                    >
                        <dt>{field.label}</dt>
                        <dd>{field.value || emptyValue}</dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}

export default ProfileFieldList
