"use client"

import { Alert, Skeleton } from "antd"
import { useQuery } from "@tanstack/react-query"

import api from "@/axios.ts"
import type { News } from "@entities/News.ts"
import type { IPaginatedBackendResponse } from "@shared/interfaces.ts"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
import { NEWS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { NEWS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import CreateNews from "../CreateNews/CreateNews.tsx"
import NewsCard from "../NewsCard/NewsCard.tsx"

import styles from "./styles.module.scss"

const NewsSection = () => {
    const {
        data: permissions = [],
        isAdmin,
        isLoading: isPermissionsLoading,
    } = useCurrentUserPermissionsQuery()
    const hasPermission = (action: string) =>
        isAdmin && permissions.some((permission) => permission.action === action)

    const canViewAdminNews = hasPermission("news.view")
    const canCreate = hasPermission("news.create")
    const canUpdate = hasPermission("news.update")
    const canDelete = hasPermission("news.delete")

    const {
        data: news = [],
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["news", canViewAdminNews ? "admin" : "public"],
        queryFn: async () => {
            const response = await api.get<IPaginatedBackendResponse<News>>(
                canViewAdminNews ? NEWS_ADMIN_URL : NEWS_URL,
                { params: { ordering: "-created_at", page_size: 100 } },
            )
            return response.data.data
        },
        enabled: !isPermissionsLoading,
    })

    return (
        <section className={styles.section}>
            <div className={styles.hero}>
                <h1>News &amp; Events</h1>
                <div className={styles.heroBottomline}>
                    <p>
                        ASRP is pleased to share updates from our professional community and
                        announce upcoming events, educational activities, and opportunities for
                        engagement.
                    </p>
                    {canCreate && <CreateNews />}
                </div>
            </div>

            {isPermissionsLoading || isLoading ? (
                <div className={styles.grid} aria-label="Loading news">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div className={styles.skeletonCard} key={index}>
                            <Skeleton.Image active className={styles.skeletonImage} />
                            <Skeleton active paragraph={{ rows: 3 }} />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <Alert
                    type="error"
                    showIcon
                    title="Unable to load news"
                    description="Please check your connection and try again."
                    action={
                        <CustomButton
                            loading={isFetching}
                            onClick={() => void refetch()}
                            variant="primary"
                        >
                            Try again
                        </CustomButton>
                    }
                />
            ) : news.length === 0 ? (
                <div className={styles.emptyState}>
                    <h3>No news yet</h3>
                    <p>New community updates and events will appear here.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {news.map((item) => (
                        <NewsCard
                            key={item.id}
                            news={item}
                            canUpdate={canUpdate}
                            canDelete={canDelete}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default NewsSection
