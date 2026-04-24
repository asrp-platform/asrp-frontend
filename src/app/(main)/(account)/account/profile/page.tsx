"use client"

import styles from "@/app/(main)/(account)/account/profile/styles.module.scss"
import UserProfileCard from "@/app/(main)/(account)/account/profile/(ui)/UserProfileCard.tsx"
import { useAuth } from "@/context/AuthProvider.tsx"
import ResidencyCard from "@/app/(main)/(account)/account/profile/(ui)/ResidencyCard.tsx"
import FellowshipCard from "@/app/(main)/(account)/account/profile/(ui)/FellowshipCard.tsx"
import JobCard from "@/app/(main)/(account)/account/profile/(ui)/JobCard"

export default function ASRPAccountProfilePage() {
    const { user } = useAuth()

    if (!user) {
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
                    <UserProfileCard user={user} />
                    <JobCard user={user} />
                    <ResidencyCard user={user} />
                    <FellowshipCard user={user} />
                </section>
            </div>
        </div>
    )
}
