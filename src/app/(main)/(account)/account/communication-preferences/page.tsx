"use client"

import styles from "./styles.module.scss"
import type { ICommunicationPreferences } from "../../../../../entities/User.ts"
import { useState } from "react"
import CommunicationSwitchCard from "./ui/CommunicationSwitchCard.tsx"

const Page = () => {
    const [communicationPreferences, setCommunicationPreferences] = useState<
        Omit<ICommunicationPreferences, "user_id" | "membership_account_notifications">
    >({
        newsletters: false,
        events_meetings: false,
        committees_leadership: false,
        volunteer_opportunities: false,
    })

    const setPreference = (preferenceKey: string, checked: boolean) => {
        setCommunicationPreferences((prev) => ({ ...prev, [preferenceKey]: checked }))

        console.log(communicationPreferences)
    }

    return (
        <div>
            <section className={styles.titleContainer}>
                <h1 className={styles.title}>Communication preferences</h1>
                <p className={styles.titleInfo}>Manage how you receive communications from ASRP.</p>
            </section>

            <section className={styles.communicationsContainer}>
                <h2 className={styles.communicationsContainerTitle}>Required communications</h2>
                <CommunicationSwitchCard
                    title="Membership & account notifications"
                    description="Includes renewal reminders, payment confirmations, policy updates, and other essential account-related messages."
                    defaultChecked={true}
                />
                <p className={styles.requiredInfo}>
                    These communications are required to maintain an active ASRP membership and
                    cannot be disabled.
                </p>
            </section>

            <section className={styles.communicationsContainer}>
                <h2 className={styles.communicationsContainerTitle}>Optional communications</h2>
                <CommunicationSwitchCard
                    title="Newsletters"
                    description="Periodic society newsletters with announcements, highlights, and educational content."
                    setSwitch={setPreference}
                    preferenceKey="newsletters"
                    defaultChecked={communicationPreferences["newsletters"]}
                />
                <CommunicationSwitchCard
                    title="Events & meetings"
                    description="Notifications about upcoming conferences, webinars, workshops, and ASRP events."
                    setSwitch={setPreference}
                    preferenceKey="events_meetings"
                    defaultChecked={communicationPreferences["events_meetings"]}
                />
                <CommunicationSwitchCard
                    title="Committees & leadership opportunities"
                    description="Invitations to participate in committees, working groups, or leadership initiatives."
                    setSwitch={setPreference}
                    preferenceKey="committees_leadership"
                    defaultChecked={communicationPreferences["committees_leadership"]}
                />
                <CommunicationSwitchCard
                    title="Volunteer opportunities"
                    description="Requests for volunteer participation in educational, research, or community activities."
                    setSwitch={setPreference}
                    preferenceKey="volunteer_opportunities"
                    defaultChecked={communicationPreferences["volunteer_opportunities"]}
                />
            </section>
        </div>
    )
}

export default Page
