"use client"

import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "./UpcomingWebinarsSection.module.scss"
import { useQuery } from "@tanstack/react-query"
import { WEBINARS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import api from "@/axios.ts"
import { type IWebinar, WebinarStatus } from "@entities/News.ts"
import type { IPaginatedBackendResponse } from "@shared/interfaces.ts"
import NextWebinar from "@app/(main)/education/webinars/(ui)/UpcomingWebinarsSection/components/NextWebinar/NextWebinar.tsx"
import { Alert } from "antd"
import UpcomingWebinarsSkeleton from "./components/UpcomingWebinarsSkeleton/UpcomingWebinarsSkeleton"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { getWebinarAccessStatus } from "../MemberAccess/webinarAccess"
import UpcomingWebinarCard from "./components/UpcomingWebinarCard/UpcomingWebinarCard"
import UpcomingWebinarsSectionHeader from "./components/UpcomingWebinarsSectionHeader/UpcomingWebinarsSectionHeader"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

const UpcomingWebinarsSection = () => {
    const {
        data: upcomingWebinars = [],
        isLoading: isWebinarsLoading,
        isError: isWebinarsError,
        isFetching: isWebinarsFetching,
        refetch: refetchWebinars,
    } = useQuery({
        queryKey: ["upcomingWebinars"],
        queryFn: async () => {
            const response = await api.get<IPaginatedBackendResponse<IWebinar>>(WEBINARS_URL, {
                params: {
                    status: WebinarStatus.UPCOMING,
                    ordering: "starts_at",
                },
            })
            return response.data.data
        },
    })
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const { data: membership, isLoading: isMembershipLoading } =
        useCurrentUserMembershipQuery(!!currentUser)

    const showCreateButton = !isCurrentUserLoading && currentUser && currentUser.admin
    const hasActiveMembership = Boolean(membership?.is_active)
    const isAccessLoading = isCurrentUserLoading || (Boolean(currentUser) && isMembershipLoading)

    const [nextWebinar, ...otherUpcomingWebinars] = upcomingWebinars

    if (isWebinarsLoading || isAccessLoading) {
        return <UpcomingWebinarsSkeleton />
    }

    return (
        <PageSection className={styles.upcomingSection}>
            <UpcomingWebinarsSectionHeader
                webinarsCount={upcomingWebinars.length}
                showCreateButton={Boolean(showCreateButton)}
            />

            {isWebinarsError ? (
                <Alert
                    type="error"
                    showIcon
                    title="Unable to load upcoming webinars"
                    description="Please check your connection and try again."
                    action={
                        <CustomButton
                            loading={isWebinarsFetching}
                            onClick={() => void refetchWebinars()}
                            variant="primary"
                        >
                            Try again
                        </CustomButton>
                    }
                />
            ) : upcomingWebinars.length === 0 ? (
                <Alert
                    type="info"
                    showIcon
                    title="There are no upcoming webinars"
                    description="No webinars are currently scheduled. Please check back later for new events."
                />
            ) : (
                <>
                    <NextWebinar
                        webinar={nextWebinar}
                        canDelete={Boolean(showCreateButton)}
                        accessStatus={getWebinarAccessStatus({
                            webinar: nextWebinar,
                            isAuthenticated: Boolean(currentUser),
                            hasActiveMembership,
                        })}
                    />

                    <div className={styles.upcomingList}>
                        {otherUpcomingWebinars.map((webinar) => {
                            const accessStatus = getWebinarAccessStatus({
                                webinar,
                                isAuthenticated: Boolean(currentUser),
                                hasActiveMembership,
                            })

                            return (
                                <UpcomingWebinarCard
                                    key={webinar.id}
                                    webinar={webinar}
                                    accessStatus={accessStatus}
                                    canDelete={Boolean(showCreateButton)}
                                />
                            )
                        })}
                    </div>
                </>
            )}
        </PageSection>
    )
}

export default UpcomingWebinarsSection
