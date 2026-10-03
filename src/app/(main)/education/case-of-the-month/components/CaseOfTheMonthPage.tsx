"use client"

import { useQuery } from "@tanstack/react-query"
import { Empty, Pagination } from "antd"
import { useState } from "react"

import api from "@/axios.ts"
import type { CaseOfTheMonth, CaseTag } from "@entities/CaseOfTheMonth.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import {
    CASE_OF_THE_MONTH_CASES_URL,
    CASE_OF_THE_MONTH_TAGS_URL,
} from "@shared/backend/restApiUrls/restApiUrls.ts"
import { DEFAULT_PAGE_SIZE } from "@shared/options.ts"

import CaseCard from "./CaseCard.tsx"
import styles from "../styles.module.scss"
import ShareSection from "@app/(main)/education/case-of-the-month/components/ShareSection/ShareSection.tsx"
import CasesSkeletonGrid from "@app/(main)/education/case-of-the-month/components/CasesSkeletonGrid/CasesSkeletonGrid.tsx"
import LibraryHeader from "./LibraryHeader/LibraryHeader.tsx"

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

    const cases = casesQuery.data?.data ?? []
    const showSkeleton = casesQuery.isFetching
    const showCases = !showSkeleton && cases.length > 0
    const showEmpty = !showSkeleton && cases.length === 0

    return (
        <>
            <ShareSection />

            <section className={styles.librarySection}>
                <LibraryHeader
                    tags={tagsQuery.data ?? []}
                    selectedTagId={selectedTagId}
                    caseCount={casesQuery.data?.count ?? 0}
                    onTagChange={handleTagChange}
                />

                {showSkeleton && <CasesSkeletonGrid />}

                {showCases && (
                    <>
                        <div className={styles.casesGrid}>
                            {cases.map((caseItem) => (
                                <CaseCard key={caseItem.id} caseItem={caseItem} />
                            ))}
                        </div>
                        <Pagination
                            className={styles.pagination}
                            current={page}
                            pageSize={DEFAULT_PAGE_SIZE}
                            total={casesQuery.data?.count ?? 0}
                            showSizeChanger={false}
                            onChange={setPage}
                        />
                    </>
                )}

                {showEmpty && <Empty description="No cases found for this tag." />}
            </section>
        </>
    )
}

export default CaseOfTheMonthPage
