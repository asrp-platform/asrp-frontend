"use client"

import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ProfileHeaderSection from "@app/(main)/(account)/account/(shared)/ProfileHeaderSection/ProfileHeaderSection.tsx"

import styles from "./styles.module.scss"
import MembershipCard from "@app/(main)/(account)/account/(shared)/MembershipCard/MembershipCard.tsx"
import NoMembershipCard from "@app/(main)/(account)/account/membership/(ui)/NoMembershipCard/NoMembershipCard.tsx"
import { useCurrentUserMembershipRequestQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"
import MembershipRequestCard from "@app/(main)/(account)/account/(shared)/MembershipRequestCard/MembershipRequestCard.tsx"

const Page = () => {
    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery()

    const enableMembershipRequestLoading = !isMembershipLoading && !membership

    const { data: membershipRequest, isLoading: isMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery(enableMembershipRequestLoading)

    if (isMembershipLoading || isMembershipRequestLoading) {
        return <Loading />
    }

    if (!membership) {
        if (membershipRequest) {
            return <MembershipRequestCard membershipRequest={membershipRequest} />
        }
        return <NoMembershipCard />
    }

    return (
        <div className={styles.pageContainer}>
            <ProfileHeaderSection title="Membership" subtitle="Manage your ASRP membership." />
            <MembershipCard membership={membership} variant={"detailed"} />
        </div>
    )
}

export default Page
