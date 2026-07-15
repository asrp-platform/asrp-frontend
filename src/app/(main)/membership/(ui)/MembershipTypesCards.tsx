"use client"

import Image from "next/image"
import MembershipInfoCard from "@/app/(main)/membership/(ui)/MembershipInfoCard.tsx"
import styles from "@/app/(main)/membership/styles.module.scss"
import { MembershipTypeEnum, type IMembershipType } from "@/entities/Membership.ts"
import { useMembershipTypesQuery } from "@/shared/backend/queries/membership/useMembershipTypesQuery.ts"

interface MembershipCardContent {
    title: string
    info: string
    votingStatus: string
    votingColor: "red" | "blue"
    subDescription: string
    price: number
    renderButton?: boolean
}

const membershipCards: Record<MembershipTypeEnum, MembershipCardContent> = {
    [MembershipTypeEnum.ACTIVE]: {
        title: "Full Member",
        info: "Any legally qualified Russian-speaking specialist (MD, DO, MBBS, PhD, or equivalent) who is actively practicing pathology in the United States.",
        votingStatus: "Voting Member",
        votingColor: "red",
        subDescription:
            "Ideal for: attending pathologists, practicing subspecialists, academic faculty, and community pathologists.",
        price: 120,
    },
    [MembershipTypeEnum.TRAINEE]: {
        title: "Trainee Member",
        info: "Russian-speaking residents or fellows in pathology or related disciplines training in the United States.",
        votingStatus: "Voting member • Trainee",
        votingColor: "blue",
        subDescription:
            "Ideal for: residents, fellows, and other pathology trainees seeking mentorship, education, and networking.",
        price: 60,
    },
    [MembershipTypeEnum.AFFILIATE]: {
        title: "Affiliate Member",
        info: "Russian-speaking pathologists, scientists, researchers, or allied professionals whose involvement is relevant and contributes meaningfully to the Society.",
        votingStatus: "Non-voting",
        votingColor: "blue",
        subDescription:
            "Ideal for: PhD scientists, laboratory professionals, industry partners, researchers, and educators.",
        price: 90,
    },
    [MembershipTypeEnum.HONORARY]: {
        title: "Honorary Member",
        info: "Individuals recognized for exceptional service to the field of pathology or outstanding contributions to the Society.",
        votingStatus: "Non-voting",
        votingColor: "blue",
        subDescription:
            "*This membership category is awarded by the Society and cannot be joined directly.*",
        price: 0,
        renderButton: false,
    },
    [MembershipTypeEnum.PATHWAY]: {
        title: "Pathway Member",
        info: "Russian-speaking individuals pursuing or transitioning into a medical career in the United States, including medical students and internationally trained medical graduates seeking mentorship.",
        votingStatus: "Non-voting • Pathway",
        votingColor: "blue",
        subDescription:
            "Ideal for: medical students, IMGs applying to U.S. pathology residencies, and those exploring pathology as a specialty.",
        price: 30,
    },
}

const membershipTypesOrder = Object.values(MembershipTypeEnum)

const mergeMembershipType = (membershipType: IMembershipType): MembershipCardContent => ({
    ...membershipCards[membershipType.type],
    title: membershipType.name,
    info: membershipType.description,
    price: membershipType.price_usd,
    renderButton: membershipType.is_purchasable,
})

const MembershipTypesCards = () => {
    const { data: membershipTypes } = useMembershipTypesQuery()

    const cards = membershipTypes
        ? membershipTypes
              .filter((membershipType) => membershipCards[membershipType.type])
              .sort(
                  (first, second) =>
                      membershipTypesOrder.indexOf(first.type) -
                      membershipTypesOrder.indexOf(second.type),
              )
              .map(mergeMembershipType)
        : membershipTypesOrder.map((type) => membershipCards[type])

    return (
        <div className={styles.cardsGrid}>
            {cards.map((card) => (
                <MembershipInfoCard
                    key={card.title}
                    {...card}
                    icon={
                        card.renderButton === false ? (
                            <Image src="/icons/honorary.svg" alt="" width={12} height={12} />
                        ) : undefined
                    }
                />
            ))}
        </div>
    )
}

export default MembershipTypesCards
