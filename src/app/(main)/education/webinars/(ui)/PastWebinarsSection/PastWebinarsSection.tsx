"use client"

import { Alert, Skeleton } from "antd"
import { useQuery } from "@tanstack/react-query"

import api from "@/axios.ts"
import PageSection from "@/shared/ui/PageSection/PageSection"
import { type IWebinar, WebinarStatus } from "@entities/News.ts"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import { WEBINARS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import type { IPaginatedBackendResponse } from "@shared/interfaces.ts"

import PastWebinarCard from "./components/PastWebinarCard/PastWebinarCard"
import PastWebinarsModal from "./components/PastWebinarsModal/PastWebinarsModal"
import styles from "./PastWebinarsSection.module.scss"

const DISPLAYED_WEBINARS_COUNT = 3

const PastWebinarsSection = () => {
    const {
        data,
        isLoading: isWebinarsLoading,
        isError,
    } = useQuery({
        queryKey: ["pastWebinars"],
        queryFn: async () => {
            const response = await api.get<IPaginatedBackendResponse<IWebinar>>(WEBINARS_URL, {
                params: {
                    status: WebinarStatus.PAST,
                    ordering: "-starts_at",
                    page_size: 100,
                    archived: false,
                },
            })
            return response.data
        },
    })
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery(
        Boolean(currentUser),
    )

    const webinars = data?.data ?? []
    const isAuthenticated = Boolean(currentUser)
    const canManageRecording = Boolean(currentUser?.admin)
    const hasActiveMembership = Boolean(membership?.is_active)
    const isAccessLoading = isCurrentUserLoading || (isAuthenticated && isMembershipLoading)
    const isLoading = isWebinarsLoading || isAccessLoading

    return (
        <PageSection id="past-webinars" className={styles.section}>
            <div className={styles.header}>
                <div>
                    <h2>Past Webinars</h2>
                    <p>Browse previous ASRP educational programs and available recordings.</p>
                </div>
                {webinars.length > 0 && (
                    <PastWebinarsModal
                        webinars={webinars}
                        isAuthenticated={isAuthenticated}
                        hasActiveMembership={hasActiveMembership}
                        canManageRecording={canManageRecording}
                    />
                )}
            </div>

            {isLoading ? (
                <div className={styles.list}>
                    {Array.from({ length: DISPLAYED_WEBINARS_COUNT }, (_, index) => (
                        <div className={styles.skeleton} key={index}>
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <Alert type="error" showIcon title="Unable to load past webinars" />
            ) : webinars.length === 0 ? (
                <Alert type="info" showIcon title="There are no past webinars yet" />
            ) : (
                <div className={styles.list}>
                    {webinars.slice(0, DISPLAYED_WEBINARS_COUNT).map((webinar) => (
                        <PastWebinarCard
                            key={webinar.id}
                            webinar={webinar}
                            isAuthenticated={isAuthenticated}
                            hasActiveMembership={hasActiveMembership}
                            canManageRecording={canManageRecording}
                        />
                    ))}
                </div>
            )}
        </PageSection>
    )
}

export default PastWebinarsSection
