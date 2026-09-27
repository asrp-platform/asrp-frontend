import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: "standalone",
    async redirects() {
        return [
            {
                source: "/administration/education",
                destination: "/administration/content",
                permanent: false,
            },
            {
                source: "/administration/news-and-events",
                destination: "/administration/content",
                permanent: false,
            },
        ]
    },
}

export default nextConfig
