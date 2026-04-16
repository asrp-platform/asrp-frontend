import styles from "./styles.module.scss"
import Link from "next/link"
import Image from "next/image"

type SocialLinkData = { src: string; href: string; alt: string; label: string; id: number }

const Socials: SocialLinkData[] = [
    {
        src: "/icons/footer/TelegramLogo.svg",
        href: "https://t.me/ASRP_pathology",
        alt: "TelegramLogo",
        label: "Telegram",
        id: 1,
    },
    {
        src: "/icons/footer/FacebookLogo.svg",
        href: "https://www.facebook.com/profile.php?id=61574236348667",
        alt: "FacebookLogo",
        label: "Facebook",
        id: 2,
    },
    {
        src: "/icons/footer/InstagramLogo.svg",
        href: "https://www.instagram.com/asrp_pathology",
        alt: "InstagramLogo",
        label: "Instagram",
        id: 3,
    },
    {
        src: "/icons/footer/XLogo.svg",
        href: "#",
        alt: "XLogo",
        label: "X",
        id: 4,
    },
]

interface SocialNetLinksProps {
    withLabels?: boolean
}

const SocialNetLinks = ({ withLabels }: SocialNetLinksProps) => {
    return (
        <ul className={withLabels ? styles.socialNetLinksWithLabels : styles.socialNetLinks}>
            {Socials.map((social) => (
                <li key={social.id}>
                    <Link className={styles.socialLink} href={social.href} target="_blank">
                        <Image
                            src={social.src}
                            alt={social.alt}
                            width={withLabels ? 16 : 24}
                            height={withLabels ? 16 : 24}
                        />
                        {withLabels && <span>{social.label}</span>}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SocialNetLinks
