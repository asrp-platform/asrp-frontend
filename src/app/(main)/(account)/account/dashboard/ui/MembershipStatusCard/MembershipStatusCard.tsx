"use client"

import { useCurrentUserMembershipRequestQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"

import MembershipRequestCard from "@app/(main)/(account)/account/(shared)/MembershipRequestCard/MembershipRequestCard.tsx"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ApplyMembershipCard from "@/app/(main)/(account)/account/dashboard/ui/ApplyMembershipCard/ApplyMembershipCard.tsx"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import MembershipStatus from "@app/(main)/(account)/account/membership/(ui)/MembershipStatus/MembershipStatus.tsx"
import {
    AccountMembershipStatus,
    resolveAccountMembershipStatus,
} from "@app/(main)/(account)/account/(shared)/membershipStatus.ts"
import type { ReactNode } from "react"

const MembershipStatusCard = () => {
    const { data: membershipRequest, isLoading: isMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery()

    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery()

    if (isMembershipRequestLoading || isMembershipLoading) {
        return <Loading />
    }

    const membershipStatus = resolveAccountMembershipStatus({ membership, membershipRequest })

    const renderers: Record<AccountMembershipStatus, () => ReactNode> = {
        [AccountMembershipStatus.NONE]: () => <ApplyMembershipCard />,
        [AccountMembershipStatus.REQUEST_PENDING]: () => (
            <MembershipRequestCard membershipRequest={membershipStatus.membershipRequest!} />
        ),
        [AccountMembershipStatus.REQUEST_REJECTED]: () => (
            <MembershipRequestCard membershipRequest={membershipStatus.membershipRequest!} />
        ),
        [AccountMembershipStatus.ACTIVE]: () => (
            <MembershipStatus membership={membershipStatus.membership!} />
        ),
        [AccountMembershipStatus.EXPIRED]: () => (
            <MembershipStatus membership={membershipStatus.membership!} />
        ),
    }

    return renderers[membershipStatus.status]()
}

export default MembershipStatusCard
