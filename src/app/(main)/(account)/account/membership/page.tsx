"use client"

import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useCurrentUserMembershipRequestQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"

import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ProfileHeaderSection from "@app/(main)/(account)/account/(shared)/ProfileHeaderSection/ProfileHeaderSection.tsx"
import MembershipCard from "@app/(main)/(account)/account/(shared)/MembershipCard/MembershipCard.tsx"
import NoMembershipCard from "@app/(main)/(account)/account/membership/(ui)/NoMembershipCard/NoMembershipCard.tsx"
import MembershipRequestCard from "@app/(main)/(account)/account/(shared)/MembershipRequestCard/MembershipRequestCard.tsx"

import styles from "./styles.module.scss"
import MembershipTerminated from "@app/(main)/(account)/account/membership/(ui)/MembershipRestrictionStatus/MembershipTerminated.tsx"
import MembershipSuspended from "@app/(main)/(account)/account/membership/(ui)/MembershipRestrictionStatus/MembershipSuspended.tsx"

const Page = () => {
    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery()

    const shouldLoadMembershipRequest = !isMembershipLoading && !membership

    const { data: membershipRequest, isLoading: isMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery(shouldLoadMembershipRequest)

    if (isMembershipLoading || isMembershipRequestLoading) {
        return <Loading />
    }

    let content

    if (membership) {
        if (membership.terminated) {
            content = <MembershipTerminated membership={membership} />
        } else if (membership.is_suspended) {
            content = <MembershipSuspended membership={membership} />
        } else {
            content = <MembershipCard membership={membership} variant="detailed" />
        }
    } else if (membershipRequest) {
        content = <MembershipRequestCard membershipRequest={membershipRequest} />
    } else {
        content = <NoMembershipCard />
    }

    return (
        <div className={styles.pageContainer}>
            <ProfileHeaderSection title="Membership" subtitle="Manage your ASRP membership." />
            {content}
        </div>
    )
}

export default Page
