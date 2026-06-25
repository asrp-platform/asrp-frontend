import styles from "./MembershipTypeTag.module.scss"
import { MembershipTypeEnum } from "@entities/Membership.ts"

const membershipLabels: Record<MembershipTypeEnum, string> = {
    [MembershipTypeEnum.ACTIVE]: "Full Member", // Changed FULL member
    [MembershipTypeEnum.TRAINEE]: "Trainee",
    [MembershipTypeEnum.AFFILIATE]: "Affiliate",
    [MembershipTypeEnum.HONORARY]: "Honorary",
    [MembershipTypeEnum.PATHWAY]: "Pathway",
}

const membershipClassNames: Record<MembershipTypeEnum, string> = {
    [MembershipTypeEnum.ACTIVE]: styles.active,
    [MembershipTypeEnum.TRAINEE]: styles.trainee,
    [MembershipTypeEnum.AFFILIATE]: styles.affiliate,
    [MembershipTypeEnum.HONORARY]: styles.honorary,
    [MembershipTypeEnum.PATHWAY]: styles.pathway,
}

interface MembershipTypeTagProps {
    type: MembershipTypeEnum
}

const MembershipTypeTag = ({ type }: MembershipTypeTagProps) => {
    return (
        <span className={`${styles.tag} ${membershipClassNames[type]}`}>
            {membershipLabels[type]}
        </span>
    )
}

export default MembershipTypeTag
