import { Avatar, Tag } from "antd"
import { Languages, MapPin, Sparkles } from "lucide-react"

import type { IMemberDirectoryItem } from "@/entities/MemberDirectory.ts"
import styles from "./MemberCard.module.scss"

interface MemberCardProps {
    member: IMemberDirectoryItem
}

const getMemberName = (member: IMemberDirectoryItem) => {
    const firstName = member.preferred_name || member.firstname
    return [firstName, member.middlename, member.lastname, member.suffix].filter(Boolean).join(" ")
}

const getInitials = (member: IMemberDirectoryItem) =>
    `${member.preferred_name || member.firstname || ""}${member.lastname || ""}`
        .replace(/\s/g, "")
        .slice(0, 2)
        .toUpperCase()

const getLocation = (member: IMemberDirectoryItem) =>
    [member.city, member.state, member.country].filter(Boolean).join(", ")

const MemberCard = ({ member }: MemberCardProps) => {
    const location = getLocation(member)

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <Avatar size={72} src={member.avatar_url || undefined} className={styles.avatar}>
                    {getInitials(member)}
                </Avatar>
                <div className={styles.identity}>
                    <div className={styles.nameRow}>
                        <h2>{getMemberName(member)}</h2>
                        <Tag className={styles.membershipTag}>
                            {member.membership_type.toLowerCase()}
                        </Tag>
                    </div>
                    {member.credentials && (
                        <p className={styles.credentials}>{member.credentials}</p>
                    )}
                    {location && (
                        <p className={styles.location}>
                            <MapPin size={15} aria-hidden />
                            <span>{location}</span>
                        </p>
                    )}
                </div>
            </header>

            {member.description && <p className={styles.description}>{member.description}</p>}

            {(member.languages_spoken || member.professional_interests) && (
                <dl className={styles.details}>
                    {member.languages_spoken && (
                        <div>
                            <dt>
                                <Languages size={16} aria-hidden />
                                Languages
                            </dt>
                            <dd>{member.languages_spoken}</dd>
                        </div>
                    )}
                    {member.professional_interests && (
                        <div>
                            <dt>
                                <Sparkles size={16} aria-hidden />
                                Professional interests
                            </dt>
                            <dd>{member.professional_interests}</dd>
                        </div>
                    )}
                </dl>
            )}
        </article>
    )
}

export default MemberCard
