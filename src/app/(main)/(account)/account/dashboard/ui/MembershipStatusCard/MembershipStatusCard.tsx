"use client"

import { useCurrentUserMembershipRequestQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"

import MembershipRequestCard from "@/app/(main)/(account)/account/dashboard/ui/MembershipRequestCard/MembershipRequestCard.tsx"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ApplyMembershipCard from "@/app/(main)/(account)/account/dashboard/ui/ApplyMembershipCard/ApplyMembershipCard.tsx"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import MembershipCard from "@app/(main)/(account)/account/(shared)/MembershipCard/MembershipCard.tsx"

const MembershipStatusCard = () => {
    const { data: membershipRequest, isLoading: isMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery()

    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery()

    if (isMembershipRequestLoading || isMembershipLoading) {
        return <Loading />
    }

    if (membership) {
        return <MembershipCard membership={membership} variant={"compact"} />
    }

    if (!membership && membershipRequest) {
        return <MembershipRequestCard membershipRequest={membershipRequest} />
    }

    return <ApplyMembershipCard />
}

export default MembershipStatusCard
