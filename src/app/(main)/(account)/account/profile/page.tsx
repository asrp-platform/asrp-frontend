"use client"

import styles from "@/app/(main)/(account)/account/profile/styles.module.scss"
import UserProfileCard from "@/app/(main)/(account)/account/profile/(ui)/UserProfileCard.tsx"
import ResidencyCard from "@/app/(main)/(account)/account/profile/(ui)/ResidencyCard.tsx"
import FellowshipCard from "@/app/(main)/(account)/account/profile/(ui)/FellowshipCard.tsx"
import JobCard from "@/app/(main)/(account)/account/profile/(ui)/JobCard"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

export default function ASRPAccountProfilePage() {
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()

    if (!currentUser) {
        return null
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Profile</h1>
                            <p className={styles.titleInfo}>
                                Manage your personal and professional information.
                            </p>
                        </div>
                    </div>
                    {isCurrentUserLoading ? (
                        <Loading />
                    ) : (
                        <div className={styles.cardsContainer}>
                            <UserProfileCard user={currentUser} />
                            <JobCard user={currentUser} />
                            <ResidencyCard user={currentUser} />
                            <FellowshipCard user={currentUser} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
