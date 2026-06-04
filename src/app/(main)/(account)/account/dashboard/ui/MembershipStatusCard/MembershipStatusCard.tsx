"use client"

import { useCurrentUserMembershipRequestQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"

import MembershipRequestCard from "@app/(main)/(account)/account/(shared)/MembershipRequestCard/MembershipRequestCard.tsx"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ApplyMembershipCard from "@/app/(main)/(account)/account/dashboard/ui/ApplyMembershipCard/ApplyMembershipCard.tsx"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import MembershipCard from "@app/(main)/(account)/account/(shared)/MembershipCard/MembershipCard.tsx"
import MembershipTerminated from "@app/(main)/(account)/account/membership/(ui)/MembershipRestrictionStatus/MembershipTerminated.tsx"
import MembershipSuspended from "@app/(main)/(account)/account/membership/(ui)/MembershipRestrictionStatus/MembershipSuspended.tsx"

const MembershipStatusCard = () => {
    const { data: membershipRequest, isLoading: isMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery()

    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery()

    if (isMembershipRequestLoading || isMembershipLoading) {
        return <Loading />
    }

    if (membership) {
        if (membership.terminated) {
            return <MembershipTerminated membership={membership} variant="compact" />
        }

        if (membership.is_suspended) {
            return <MembershipSuspended membership={membership} variant="compact" />
        }

        return <MembershipCard membership={membership} variant={"compact"} />
    }

    if (!membership && membershipRequest) {
        return <MembershipRequestCard membershipRequest={membershipRequest} />
    }

    return <ApplyMembershipCard />
}

export default MembershipStatusCard
