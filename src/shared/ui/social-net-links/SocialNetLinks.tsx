import Link from "next/link"
import Image from "next/image"

interface SocialNetLinksProps {
    className: string
}

const SocialNetLinks = ({ className }: SocialNetLinksProps) => {
    return (
        <div className={className}>
            <Link href="https://t.me/ASRP_pathology">
                <Image
                    src="/icons/footer/TelegramLogo.svg"
                    alt="TelegramLogo"
                    width={24}
                    height={24}
                />
            </Link>
            {/*<Link href="/social-nets">*/}
            {/*    <Image*/}
            {/*        src='/icons/footer/FacebookLogo.svg'*/}
            {/*        alt='TelegramLogo'*/}
            {/*        width={24}*/}
            {/*        height={24}*/}
            {/*    />*/}
            {/*</Link>*/}
            {/*<Link href="/social-nets">*/}
            {/*    <Image*/}
            {/*        src='/icons/footer/XLogo.svg'*/}
            {/*        alt='TelegramLogo'*/}
            {/*        width={24}*/}
            {/*        height={24}*/}
            {/*    />*/}
            {/*</Link>*/}
        </div>
    )
}

export default SocialNetLinks
