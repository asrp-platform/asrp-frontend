"use client"

import { Alert, Empty, Pagination, Result, Skeleton } from "antd"
import { Users } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { MembershipTypeEnum } from "@/entities/Membership.ts"
import { useCountriesQuery } from "@/shared/backend/queries/useCountriesQuery.ts"
import { useCurrentUserMembershipQuery } from "@/shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useMembersDirectoryQuery } from "@/shared/backend/queries/membership/useMembersDirectoryQuery.ts"
import ProfileHeaderSection from "@/app/(main)/(account)/account/(shared)/ProfileHeaderSection/ProfileHeaderSection.tsx"
import DirectoryFilters from "./(ui)/DirectoryFilters/DirectoryFilters"
import MemberCard from "./(ui)/MemberCard/MemberCard"
import styles from "./styles.module.scss"

const PAGE_SIZE = 12

const Page = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [country, setCountry] = useState<string>()
    const [membershipType, setMembershipType] = useState<MembershipTypeEnum>()

    const { data: membership, isLoading: isMembershipLoading } = useCurrentUserMembershipQuery()
    const hasDirectoryAccess = Boolean(
        membership?.is_active && !membership.is_suspended && !membership.terminated,
    )
    const { data: countries = [], isLoading: isCountriesLoading } = useCountriesQuery()

    useEffect(() => {
        const timeout = window.setTimeout(() => setDebouncedSearch(search.trim()), 350)
        return () => window.clearTimeout(timeout)
    }, [search])

    const filters = useMemo(
        () => ({
            ...(debouncedSearch ? { search: debouncedSearch } : {}),
            ...(country ? { country } : {}),
            ...(membershipType ? { membership_type: membershipType } : {}),
        }),
        [country, debouncedSearch, membershipType],
    )

    const { data, isLoading, isFetching, isError } = useMembersDirectoryQuery({
        page,
        pageSize: PAGE_SIZE,
        filters,
        enabled: hasDirectoryAccess,
    })

    const updateFilter = (update: () => void) => {
        setPage(1)
        update()
    }

    const resetFilters = () => {
        setPage(1)
        setSearch("")
        setDebouncedSearch("")
        setCountry(undefined)
        setMembershipType(undefined)
    }

    if (isMembershipLoading) {
        return (
            <div className={styles.pageContainer}>
                <Skeleton active paragraph={{ rows: 8 }} />
            </div>
        )
    }

    if (!hasDirectoryAccess) {
        return (
            <div className={styles.pageContainer}>
                <ProfileHeaderSection
                    title="Member directory"
                    subtitle="Connect with members of the ASRP community."
                />
                <Result
                    status="403"
                    title="Active membership required"
                    subTitle="The member directory is available only to users with an active ASRP membership."
                />
            </div>
        )
    }

    const members = data?.data ?? []
    const resultCount = data?.count ?? 0

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                <ProfileHeaderSection
                    title="Member directory"
                    subtitle="Discover and connect with members of the ASRP community."
                />
                <div className={styles.memberCount}>
                    <Users size={17} aria-hidden />
                    <span>
                        {resultCount} {resultCount === 1 ? "member" : "members"}
                    </span>
                </div>
            </div>

            <DirectoryFilters
                search={search}
                country={country}
                membershipType={membershipType}
                countries={countries}
                isCountriesLoading={isCountriesLoading}
                onSearchChange={(value) => updateFilter(() => setSearch(value))}
                onCountryChange={(value) => updateFilter(() => setCountry(value))}
                onMembershipTypeChange={(value) => updateFilter(() => setMembershipType(value))}
                onReset={resetFilters}
            />

            {isError && (
                <Alert
                    type="error"
                    showIcon
                    title="We could not load the member directory"
                    description="Please refresh the page or try again later."
                />
            )}

            {!isError && isLoading ? (
                <div className={styles.cardsGrid}>
                    {Array.from({ length: 6 }, (_, index) => (
                        <div className={styles.cardSkeleton} key={index}>
                            <Skeleton active avatar paragraph={{ rows: 4 }} />
                        </div>
                    ))}
                </div>
            ) : (
                !isError && (
                    <section className={styles.results} aria-busy={isFetching}>
                        {members.length > 0 ? (
                            <div className={styles.cardsGrid}>
                                {members.map((member) => (
                                    <MemberCard member={member} key={member.id} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <Empty description="No members match the selected filters" />
                            </div>
                        )}
                    </section>
                )
            )}

            {!isError && resultCount > PAGE_SIZE && (
                <Pagination
                    current={page}
                    pageSize={PAGE_SIZE}
                    total={resultCount}
                    showSizeChanger={false}
                    hideOnSinglePage
                    onChange={setPage}
                    className={styles.pagination}
                />
            )}
        </div>
    )
}

export default Page
