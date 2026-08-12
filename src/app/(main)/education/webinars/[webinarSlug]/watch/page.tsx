"use client"

import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import {
    ArrowLeft,
    CalendarDays,
    CircleAlert,
    LoaderCircle,
    RotateCcw,
    UserRound,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import api from "@/axios.ts"
import type { IWebinar, IWebinarPlayback } from "@entities/News.ts"
import {
    getWebinarDetailUrl,
    getWebinarPlaybackUrl,
} from "@shared/backend/restApiUrls/restApiUrls.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import CustomLink from "@shared/ui/Buttons/CustomLink/CustomLink.tsx"

import styles from "./styles.module.scss"

const WebinarWatchPage = () => {
    const { webinarSlug } = useParams<{ webinarSlug: string }>()
    const slug = decodeURIComponent(webinarSlug)

    const { data: webinar, isError: isWebinarError } = useQuery({
        queryKey: ["webinar", slug],
        queryFn: async () => {
            const response = await api.get<IWebinar>(getWebinarDetailUrl(slug))
            return response.data
        },
        retry: false,
    })

    const {
        data: playback,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["webinarPlayback", slug],
        queryFn: async () => {
            const response = await api.get<IWebinarPlayback>(getWebinarPlaybackUrl(slug))
            return response.data
        },
        retry: false,
    })

    const isUnavailable = !isLoading && !isError && !playback?.embed_url
    const errorStatus = isAxiosError(error) ? error.response?.status : undefined
    const requiresSignIn = errorStatus === 401
    const requiresMembership = errorStatus === 403
    const playbackNotFound = errorStatus === 404

    const errorMessage = requiresSignIn
        ? "Sign in to access this webinar recording."
        : requiresMembership
          ? "An active ASRP membership is required to watch this webinar."
          : playbackNotFound
            ? "This webinar recording could not be found."
            : "We could not load this webinar. Please try again later."

    return (
        <main className={styles.page}>
            <Link href="/education/webinars#past-webinars" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to webinars
            </Link>

            <div className={styles.heading}>
                <span>WEBINAR PLAYBACK</span>
                <h1>{webinar?.title ?? "Watch webinar"}</h1>
                {webinar && (
                    <div className={styles.meta}>
                        <span>
                            <UserRound size={17} /> Presented by {webinar.speaker_name}
                        </span>
                        <span>
                            <CalendarDays size={17} />
                            {formatDatetime(webinar.starts_at)}
                        </span>
                    </div>
                )}
                {isWebinarError && (
                    <p className={styles.detailsNotice}>Webinar details could not be loaded.</p>
                )}
            </div>

            {isLoading && (
                <div className={styles.status} role="status">
                    <LoaderCircle className={styles.spinner} size={32} />
                    <p>Loading webinar...</p>
                </div>
            )}

            {(isError || isUnavailable) && (
                <div className={styles.status} role="alert">
                    <CircleAlert size={32} />
                    <h2>Webinar unavailable</h2>
                    <p>
                        {isError ? errorMessage : "A recording is not available for this webinar."}
                    </p>
                    {requiresSignIn && (
                        <CustomLink href="/login" variant="primary-filled">
                            Sign in
                        </CustomLink>
                    )}
                    {requiresMembership && (
                        <CustomLink href="/membership/become-member" variant="primary-filled">
                            Explore membership
                        </CustomLink>
                    )}
                    {isError && !requiresSignIn && !requiresMembership && !playbackNotFound && (
                        <button
                            type="button"
                            className={styles.retryButton}
                            disabled={isFetching}
                            onClick={() => void refetch()}
                        >
                            <RotateCcw size={17} />
                            {isFetching ? "Trying again..." : "Try again"}
                        </button>
                    )}
                </div>
            )}

            {playback?.embed_url && (
                <div className={styles.player}>
                    <iframe
                        src={playback.embed_url}
                        title={webinar ? `${webinar.title} video player` : "Webinar video player"}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}
        </main>
    )
}

export default WebinarWatchPage
