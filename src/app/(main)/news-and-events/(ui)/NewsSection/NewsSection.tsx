"use client"

import { Alert, Skeleton } from "antd"
import { useInfiniteQuery } from "@tanstack/react-query"

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

const NEWS_PAGE_SIZE = 8

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
        data,
        isLoading,
        isError,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["news", canViewAdminNews ? "admin" : "public"],
        queryFn: async ({ pageParam }) => {
            const response = await api.get<IPaginatedBackendResponse<News>>(
                canViewAdminNews ? NEWS_ADMIN_URL : NEWS_URL,
                {
                    params: {
                        ordering: "-created_at",
                        page: pageParam,
                        page_size: NEWS_PAGE_SIZE,
                    },
                },
            )
            return response.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const loadedCount = lastPage.page * lastPage.page_size
            return loadedCount < lastPage.count ? lastPage.page + 1 : undefined
        },
        enabled: !isPermissionsLoading,
    })

    const news = data?.pages.flatMap((page) => page.data) ?? []
    const totalNews = data?.pages[0]?.count ?? 0

    return (
        <section className={styles.section}>
            <div className={styles.hero}>
                <span className={styles.heroEyebrow}>ASRP NEWSROOM</span>
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
                        <div className={styles.timelineItem} key={item.id}>
                            <span className={styles.timelineDot} aria-hidden="true" />
                            <NewsCard news={item} canUpdate={canUpdate} canDelete={canDelete} />
                        </div>
                    ))}
                    {hasNextPage && (
                        <div className={styles.loadMoreContainer}>
                            <span>
                                Showing {news.length} of {totalNews}
                            </span>
                            <CustomButton
                                variant="secondary"
                                loading={isFetchingNextPage}
                                onClick={() => void fetchNextPage()}
                            >
                                Load more
                            </CustomButton>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default NewsSection
