"use client"

import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useCurrentUserMembershipRequestQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"

import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ProfileHeaderSection from "@app/(main)/(account)/account/(shared)/ProfileHeaderSection/ProfileHeaderSection.tsx"
import MembershipCard from "@app/(main)/(account)/account/(shared)/MembershipCard/MembershipCard.tsx"
import NoMembershipCard from "@app/(main)/(account)/account/membership/(ui)/NoMembershipCard/NoMembershipCard.tsx"
import MembershipRequestCard from "@app/(main)/(account)/account/(shared)/MembershipRequestCard/MembershipRequestCard.tsx"

import styles from "./styles.module.scss"
import QuickActions from "@app/(main)/(account)/account/membership/(ui)/QuickActions/QuickActions.tsx"
import {
    AccountMembershipStatus,
    resolveAccountMembershipStatus,
} from "@app/(main)/(account)/account/(shared)/membershipStatus.ts"
import type { ReactNode } from "react"

const Page = () => {
    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery()

    const shouldLoadMembershipRequest = !isMembershipLoading && !membership

    const { data: membershipRequest, isLoading: isMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery(shouldLoadMembershipRequest)

    if (isMembershipLoading || isMembershipRequestLoading) {
        return <Loading />
    }

    const membershipStatus = resolveAccountMembershipStatus({ membership, membershipRequest })

    const renderers: Record<AccountMembershipStatus, () => ReactNode> = {
        [AccountMembershipStatus.NONE]: () => <NoMembershipCard />,
        [AccountMembershipStatus.REQUEST_PENDING]: () => (
            <MembershipRequestCard membershipRequest={membershipStatus.membershipRequest!} />
        ),
        [AccountMembershipStatus.REQUEST_REJECTED]: () => (
            <MembershipRequestCard membershipRequest={membershipStatus.membershipRequest!} />
        ),
        [AccountMembershipStatus.ACTIVE]: () => (
            <>
                <MembershipCard membership={membershipStatus.membership!} variant="detailed" />
                <QuickActions variant="active" />
            </>
        ),
        [AccountMembershipStatus.EXPIRED]: () => (
            <>
                <MembershipCard membership={membershipStatus.membership!} variant="detailed" />
                <QuickActions variant="expired" />
            </>
        ),
    }

    return (
        <div className={styles.pageContainer}>
            <ProfileHeaderSection title="Membership" subtitle="Manage your ASRP membership." />
            {renderers[membershipStatus.status]()}
        </div>
    )
}

export default Page
