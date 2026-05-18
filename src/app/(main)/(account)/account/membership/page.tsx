"use client"

import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useCurrentUserMembershipRequestQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ProfileHeaderSection from "@app/(main)/(account)/account/(shared)/ProfileHeaderSection/ProfileHeaderSection.tsx"

import styles from "./styles.module.scss"
import MembershipCard from "@app/(main)/(account)/account/(shared)/MembershipCard/MembershipCard.tsx"
import NoMembershipCard from "@app/(main)/(account)/account/membership/(ui)/NoMembershipCard/NoMembershipCard.tsx"
import MembershipRequestCard from "@/app/(main)/(account)/account/dashboard/ui/MembershipRequestCard/MembershipRequestCard.tsx"

const Page = () => {
    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery()
    const { data: membershipRequest, isLoading: isMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery()

    // Show loading while any query is in progress
    if (isMembershipLoading || isMembershipRequestLoading) {
        return <Loading />
    }

    // If the user has an active membership, display it
    if (membership) {
        return (
            <div className={styles.pageContainer}>
                <ProfileHeaderSection title="Membership" subtitle="Manage your ASRP membership." />
                <MembershipCard membership={membership} variant={"detailed"} />
            </div>
        )
    }

    // If there is no active membership but a membership request exists, show its status
    if (!membership && membershipRequest) {
        return (
            <div className={styles.pageContainer}>
                <ProfileHeaderSection title="Membership" subtitle="Manage your ASRP membership." />
                <MembershipRequestCard membershipRequest={membershipRequest} />
            </div>
        )
    }

    // Fallback – no membership and no request
    return <NoMembershipCard />
}

export default Page
