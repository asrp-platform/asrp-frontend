"use client"

import styles from "@/app/(main)/(account)/account/communication-preferences/styles.module.scss"
import type { ICommunicationPreferences } from "@/entities/User.ts"
import { useEffect, useState } from "react"
import CommunicationSwitchCard from "@/app/(main)/(account)/account/communication-preferences/ui/CommunicationSwitchCard.tsx"
import Card from "@/widgets/Card/Card.tsx"
import { getUserUrl } from "@shared/backend/restApiUrls/restApiUrls.ts"
import api from "@/axios.ts"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import { message } from "antd"
import { isAxiosError } from "axios"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

type ChangablePreferences = Omit<
    ICommunicationPreferences,
    "user_id" | "membership_account_notifications"
>

const Page = () => {
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const [isCommunicationPreferencesLoading, setIsCommunicationPreferencesLoading] = useState(true)

    const [communicationPreferences, setCommunicationPreferences] = useState<ChangablePreferences>({
        newsletters: false,
        events_meetings: false,
        committees_leadership: false,
        volunteer_opportunities: false,
    })

    const setPreference = async (preferenceKey: string, checked: boolean) => {
        if (!currentUser) {
            return
        }
        try {
            await api.patch(`${getUserUrl(currentUser.id)}/communication-preferences`, {
                [preferenceKey]: checked,
            })
        } catch (error) {
            console.log(error)
        }
        setCommunicationPreferences((prev) => ({ ...prev, [preferenceKey]: checked }))
    }

    useEffect(() => {
        if (!currentUser) {
            return
        }

        const fetchCommunicationPreferences = async () => {
            try {
                setIsCommunicationPreferencesLoading(true)
                const response = await api.get<ChangablePreferences>(
                    `${getUserUrl(currentUser.id)}/communication-preferences`,
                )
                setCommunicationPreferences(response.data)
            } catch (error) {
                if (isAxiosError(error)) {
                    message.error(error.message)
                }
            } finally {
                setIsCommunicationPreferencesLoading(false)
            }
        }

        fetchCommunicationPreferences()
    }, [currentUser])

    if (isCurrentUserLoading || isCommunicationPreferencesLoading) {
        return <Loading />
    }

    return (
        <div>
            <section className={styles.titleContainer}>
                <h1 className={styles.title}>Communication preferences</h1>
                <p className={styles.titleInfo}>Manage how you receive communications from ASRP.</p>
            </section>

            <Card title="Required communications">
                <CommunicationSwitchCard
                    title="Membership & account notifications"
                    description="Includes renewal reminders, payment confirmations, policy updates, and other essential account-related messages."
                    defaultChecked={true}
                />
                <p className={styles.requiredInfo}>
                    These communications are required to maintain an active ASRP membership and
                    cannot be disabled.
                </p>
            </Card>

            <Card title="Optional communications">
                <CommunicationSwitchCard
                    title="Newsletters"
                    description="Periodic society newsletters with announcements, highlights, and educational content."
                    setSwitch={setPreference}
                    preferenceKey="newsletters"
                    defaultChecked={communicationPreferences.newsletters}
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
            </Card>
        </div>
    )
}

export default Page
