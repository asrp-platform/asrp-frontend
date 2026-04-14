import "./reset.scss"
import "./globals.scss"
import type { ReactNode } from "react"
import Providers from "../context/providers.tsx"

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
