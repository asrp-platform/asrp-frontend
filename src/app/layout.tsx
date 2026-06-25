import "@/app/reset.scss"
import "@/app/globals.scss"
import type { ReactNode } from "react"
import Providers from "@/context/providers.tsx"
import type { Metadata, Viewport } from "next"

const siteUrl = "https://asrpath.org"
const siteName = "ASRP"
const title = "ASRP - American Society of Russian-Speaking Pathologists"
const description =
    "ASRP is a professional nonprofit community for Russian-speaking pathologists in the United States, focused on education, mentorship, networking, and career development."

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    title: {
        default: title,
        template: `%s | ${siteName}`,
    },
    description,
    keywords: [
        "ASRP",
        "American Society of Russian-Speaking Pathologists",
        "Russian-speaking pathologists",
        "pathology",
        "pathologists in the United States",
        "pathology education",
        "medical mentorship",
        "professional networking",
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "Professional Association",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName,
        title,
        description:
            "Education, mentorship, and professional networking for Russian-speaking pathologists and trainees in the United States.",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: title,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description: "A professional home for Russian-speaking pathologists in the United States.",
        images: ["/opengraph-image"],
    },
    icons: {
        icon: [
            { url: "/icon.png", type: "image/png", sizes: "256x256" },
            { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        ],
        shortcut: "/favicon-32x32.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
}

// eslint-disable-next-line react-refresh/only-export-components
export const viewport: Viewport = {
    themeColor: "#8f1d2c",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
