import type { IWebinar } from "@entities/News.ts"

export const WebinarAccessStatus = {
    AVAILABLE: "AVAILABLE",
    SIGN_IN_REQUIRED: "SIGN_IN_REQUIRED",
    MEMBERSHIP_REQUIRED: "MEMBERSHIP_REQUIRED",
    REGISTRATION_UNAVAILABLE: "REGISTRATION_UNAVAILABLE",
} as const

export type WebinarAccessStatus = (typeof WebinarAccessStatus)[keyof typeof WebinarAccessStatus]

interface IGetWebinarAccessStatusParams {
    webinar: IWebinar
    isAuthenticated: boolean
    hasActiveMembership: boolean
}

export const getWebinarAccessStatus = ({
    webinar,
    isAuthenticated,
    hasActiveMembership,
}: IGetWebinarAccessStatusParams): WebinarAccessStatus => {
    if (!isAuthenticated) {
        return WebinarAccessStatus.SIGN_IN_REQUIRED
    }

    if (webinar.member_only && !hasActiveMembership) {
        return WebinarAccessStatus.MEMBERSHIP_REQUIRED
    }

    return webinar.registration_link
        ? WebinarAccessStatus.AVAILABLE
        : WebinarAccessStatus.REGISTRATION_UNAVAILABLE
}
