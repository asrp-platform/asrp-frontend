"use client"

import styles from "./styles.module.scss"
import { LockKeyhole } from "lucide-react"
import CustomLink from "@shared/ui/Buttons/CustomLink/CustomLink.tsx"
import { WebinarAccessStatus } from "./webinarAccess"
import { getWebinarRegistrationUrl } from "@shared/backend/restApiUrls/restApiUrls.ts"
import api from "@/axios.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import type { IWebinar } from "@entities/News.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"

interface IProps {
    compact?: boolean
    webinar: IWebinar
    status: WebinarAccessStatus
}

const MemberAccess = ({ compact = false, webinar, status }: IProps) => {
    const queryClient = useQueryClient()

    const registerMutation = useMutation({
        mutationFn: async (slug: string) => {
            await api.post(getWebinarRegistrationUrl(slug))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["upcomingWebinars"],
            })
            message.success("Successfully registered for the webinar")
        },
        onError: (error: unknown) => {
            handleApiError({ error })
        },
    })

    if (status === WebinarAccessStatus.AVAILABLE) {
        if (webinar.is_registered && webinar.join_link) {
            return (
                <div className={compact ? styles.registrationCompact : styles.registrationAction}>
                    <CustomLink href={webinar.join_link} variant="primary-filled">
                        Join webinar
                    </CustomLink>
                </div>
            )
        }

        return (
            <div className={compact ? styles.registrationCompact : styles.registrationAction}>
                <CustomButton
                    disabled={webinar.is_registered}
                    onClick={() => registerMutation.mutate(webinar.slug)}
                    loading={registerMutation.isPending}
                    variant="primary"
                >
                    {webinar.is_registered ? "Already registered" : "Register for the webinar"}
                </CustomButton>
            </div>
        )
    }

    const requiresSignIn = status === WebinarAccessStatus.SIGN_IN_REQUIRED

    return (
        <div className={`${styles.memberAccessCard} ${compact ? styles.memberAccessCompact : ""}`}>
            <div className={styles.lockIcon}>
                <LockKeyhole size={20} />
            </div>
            <div className={styles.memberAccessText}>
                <strong>An active ASRP membership is required</strong>
                <p>
                    {requiresSignIn
                        ? "Sign in or become a member to register for this webinar."
                        : "Activate your membership to register for this webinar."}
                </p>
            </div>
            <div className={styles.memberAccessActions}>
                {requiresSignIn && (
                    <CustomLink className={styles.signInButton} href="/login" variant="secondary">
                        Sign In
                    </CustomLink>
                )}
                <CustomLink
                    className={styles.joinButton}
                    href="/membership/become-member"
                    variant="primary-filled"
                >
                    Become a member
                </CustomLink>
            </div>
        </div>
    )
}

export default MemberAccess
