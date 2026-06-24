"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import styles from "../(ui)/SponsorsList.module.scss"

import SponsorsListSkeleton from "./SponsorsListSkeleton"
import { SPONSORS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

interface Sponsor {
    id: number
    created_at: string
    updated_at: string
    name: string
    link: string
    short_name: string
    logo_url: string
}

const fetchSponsors = async (): Promise<Sponsor[]> => {
    const response = await axios.get<Sponsor[]>(SPONSORS_URL)
    return response.data
}

const SponsorsList = () => {
    const {
        data: sponsors,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["sponsors"],
        queryFn: fetchSponsors,
        staleTime: 1000 * 60 * 5,
        retry: false,
    })

    if (isLoading) {
        return <SponsorsListSkeleton />
    }

    if (isError || !sponsors || sponsors.length === 0) return null

    return (
        <ul className={styles.sponsorsList}>
            {sponsors.map((sponsor) => (
                <li key={sponsor.id} className={styles.sponsorItem}>
                    <Link
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
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SponsorsList
