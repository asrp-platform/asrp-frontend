import type { ReactNode } from "react"
import Header from "@/widgets/Header/Header.tsx"
import Footer from "@/widgets/Footer/Footer.tsx"
import type { Metadata } from "next"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    metadataBase: new URL("https://asrpath.org"),
    title: {
        default: "ASRP — American Society of Russian-Speaking Pathologists",
        template: "%s | ASRP",
    },
    description:
        "ASRP is a professional nonprofit community for Russian-speaking pathologists in the United States, focused on education, mentorship, networking, and career development.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: "https://asrpath.org",
        siteName: "ASRP",
        title: "ASRP — American Society of Russian-Speaking Pathologists",
        description:
            "Education, mentorship, and professional networking for Russian-speaking pathologists and trainees in the United States.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "American Society of Russian-Speaking Pathologists",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "ASRP — American Society of Russian-Speaking Pathologists",
        description: "A professional home for Russian-speaking pathologists in the United States.",
        images: ["/og-image.png"],
    },
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
}

const Layout = async ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header>
                <Header />
            </header>

            <main>{children}</main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout
