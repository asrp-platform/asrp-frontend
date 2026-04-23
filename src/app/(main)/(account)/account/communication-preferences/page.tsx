"use client"

import styles from "./styles.module.scss"
import type { ICommunicationPreferences } from "../../../../../entities/User.ts"
import { useEffect, useState } from "react"
import CommunicationSwitchCard from "./ui/CommunicationSwitchCard.tsx"
import Card from "../../../../../widgets/Card/Card.tsx"
import { getUserUrl } from "../../../../../shared/backend/rest-api-urls/restApiUrls.ts"
import { useAuth } from "../../../../../context/AuthProvider.tsx"
import api from "../../../../../axios.ts"

type ChangablePreferences = Omit<
    ICommunicationPreferences,
    "user_id" | "membership_account_notifications"
>

const Page = () => {
    // TODO: current user url
    const { user } = useAuth()

    const [communicationPreferences, setCommunicationPreferences] = useState<ChangablePreferences>({
        newsletters: false,
        events_meetings: false,
        committees_leadership: false,
        volunteer_opportunities: false,
    })

    const setPreference = async (preferenceKey: string, checked: boolean) => {
        if (!user) {
            return
        }
        try {
            await api.patch(`${getUserUrl(user.id)}/communication-preferences`, {
                [preferenceKey]: checked,
            })
        } catch (error) {
            console.log(error)
        }
        setCommunicationPreferences((prev) => ({ ...prev, [preferenceKey]: checked }))
    }

    useEffect(() => {
        if (!user) {
            return
        }

        const fetchCommunicationPreferences = async () => {
            try {
                const response = await api.get<ChangablePreferences>(
                    `${getUserUrl(user.id)}/communication-preferences`,
                )
                setCommunicationPreferences(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCommunicationPreferences()
    }, [user])

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
