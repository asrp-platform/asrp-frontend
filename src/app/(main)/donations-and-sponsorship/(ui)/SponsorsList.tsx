"use client"

import { useEffect, useState } from "react"
import styles from "../(ui)/SponsorsList.module.scss"
import { SPONSORS_URL } from "@/shared/backend/rest-api-urls/restApiUrls.ts"

interface Sponsor {
    id: number
    created_at: string
    updated_at: string
    name: string
    link: string
    short_name: string
    logo_url: string
}

const SponsorsList = () => {
    const [sponsors, setSponsors] = useState<Sponsor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        const fetchSponsors = async () => {
            try {
                const res = await fetch(SPONSORS_URL, {
                    signal: controller.signal,
                })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data: Sponsor[] = await res.json()
                setSponsors(data)
            } catch (err) {
                if ((err as Error).name !== "AbortError") setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchSponsors()

        return () => controller.abort()
    }, [])

    if (loading) {
        return (
            <ul className={styles.sponsorsList}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className={styles.sponsorItemSkeleton} aria-hidden />
                ))}
            </ul>
        )
    }

    if (error || sponsors.length === 0) return null

    return (
        <ul className={styles.sponsorsList}>
            {sponsors.map((sponsor) => (
                <li key={sponsor.id} className={styles.sponsorItem}>
                    <a
                        href={sponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sponsorLink}
                        title={sponsor.name}
                    >
                        <img
                            src={sponsor.logo_url}
                            alt={sponsor.name}
                            className={styles.sponsorLogo}
                        />
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default SponsorsList
