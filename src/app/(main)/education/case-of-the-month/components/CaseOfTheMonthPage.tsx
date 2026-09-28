"use client"

import { useQuery } from "@tanstack/react-query"
import { Empty, Pagination, Skeleton } from "antd"
import { useState } from "react"

import api from "@/axios.ts"
import type { CaseOfTheMonth, CaseTag } from "@entities/CaseOfTheMonth.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import {
    CASE_OF_THE_MONTH_CASES_URL,
    CASE_OF_THE_MONTH_TAGS_URL,
    SUBMISSION_GUIDELINES_URL,
} from "@shared/backend/restApiUrls/restApiUrls.ts"
import { DEFAULT_PAGE_SIZE } from "@shared/options.ts"
import LegalDocumentLink from "@shared/ui/LegalDocumentLink/LegalDocumentLink.tsx"

import CaseCard from "./CaseCard.tsx"
import CaseTagFilter from "./CaseTagFilter.tsx"
import styles from "../styles.module.scss"

interface CaseFilters {
    tag_id?: number
}

const CaseOfTheMonthPage = () => {
    const [page, setPage] = useState(1)
    const [selectedTagId, setSelectedTagId] = useState<number | undefined>()

    const tagsQuery = useQuery({
        queryKey: ["case-of-the-month-tags"],
        queryFn: async () => {
            const response = await api.get<CaseTag[]>(CASE_OF_THE_MONTH_TAGS_URL)
            return response.data
        },
    })

    const casesQuery = useTableDataQuery<CaseOfTheMonth, CaseFilters>({
        url: CASE_OF_THE_MONTH_CASES_URL,
        queryKey: ["case-of-the-month-cases"],
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        ordering: ["-publication_month", "-id"],
        filters: { tag_id: selectedTagId },
    })

    const handleTagChange = (tagId: number | undefined) => {
        setPage(1)
        setSelectedTagId(tagId)
    }

    return (
        <>
            <section className={styles.shareCard}>
                <div>
                    <h2>Have an interesting case to share?</h2>
                    <p>We welcome educational pathology cases from ASRP members.</p>
                </div>
                <LegalDocumentLink
                    endpoint={SUBMISSION_GUIDELINES_URL}
                    label="View Case Preparation & Submission Guidelines ↗"
                    className={styles.guidelinesButton}
                />
            </section>

            <section className={styles.librarySection}>
                <div className={styles.libraryHeader}>
                    <CaseTagFilter
                        tags={tagsQuery.data ?? []}
                        selectedTagId={selectedTagId}
                        onChange={handleTagChange}
                    />
                    <span className={styles.caseCount}>{casesQuery.data?.count ?? 0} cases</span>
                </div>

                {casesQuery.isFetching ? (
                    <div className={styles.skeletonGrid}>
                        {[0, 1].map((item) => (
                            <div className={styles.skeletonCard} key={item}>
                                <Skeleton.Image active className={styles.skeletonImage} />
                                <Skeleton active paragraph={{ rows: 3 }} />
                            </div>
                        ))}
                    </div>
                ) : casesQuery.data?.data.length ? (
                    <>
                        <div className={styles.casesGrid}>
                            {casesQuery.data.data.map((caseItem) => (
                                <CaseCard key={caseItem.id} caseItem={caseItem} />
                            ))}
                        </div>
                        <Pagination
                            className={styles.pagination}
                            current={page}
                            pageSize={DEFAULT_PAGE_SIZE}
                            total={casesQuery.data.count}
                            showSizeChanger={false}
                            onChange={setPage}
                        />
                    </>
                ) : (
                    <Empty description="No cases found for this tag." />
                )}
            </section>
        </>
    )
}

export default CaseOfTheMonthPage
