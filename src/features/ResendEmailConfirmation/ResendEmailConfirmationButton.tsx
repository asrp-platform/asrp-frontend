"use client"

import { Button } from "antd"
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"

import api from "@/axios.ts"
import { EMAIL_CONFIRMATION_RESEND_URL } from "@shared/backend/rest-api-urls/restApiUrls.ts"

interface IProps {
    email: string
    className?: string
    onSuccess?: (message: string) => void
    onError?: (message: string) => void
}

type ResendResponse = {
    detail?: string
    message?: string
}

const RESEND_COOLDOWN_SECONDS = 60

const getResponseMessage = (data: ResendResponse | undefined, fallback: string) =>
    data?.detail ?? data?.message ?? fallback

const ResendEmailConfirmationButton = ({ email, className, onSuccess, onError }: IProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [cooldown, setCooldown] = useState(0)

    useEffect(() => {
        if (cooldown === 0) {
            return
        }

        const timeoutId = window.setTimeout(() => {
            setCooldown((currentCooldown) => Math.max(currentCooldown - 1, 0))
        }, 1000)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [cooldown])

    const resendEmailConfirmation = async () => {
        try {
            setIsLoading(true)

            const response = await api.post<ResendResponse>(EMAIL_CONFIRMATION_RESEND_URL, {
                email,
            })

            setCooldown(RESEND_COOLDOWN_SECONDS)
            onSuccess?.(
                getResponseMessage(
                    response.data,
                    "If this email is registered and not confirmed, we sent a new confirmation link.",
                ),
            )
        } catch (error) {
            if (isAxiosError<ResendResponse>(error)) {
                onError?.(
                    getResponseMessage(
                        error.response?.data,
                        "We could not resend the confirmation email. Please try again later.",
                    ),
                )
            } else {
                onError?.("We could not resend the confirmation email. Please try again later.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            type="primary"
            className={className}
            loading={isLoading}
            disabled={cooldown > 0}
            onClick={resendEmailConfirmation}
        >
            {cooldown > 0 ? `Resend email in ${cooldown}s` : "Resend email"}
        </Button>
    )
}

export default ResendEmailConfirmationButton
