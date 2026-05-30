import { Suspense } from "react"
import type { Metadata } from "next"

import EmailConfirmationClient from "@app/(auth)/registration/complete/EmailConfirmationClient.tsx"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "ASRP | Email confirmation",
}

const Page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <EmailConfirmationClient />
        </Suspense>
    )
}

export default Page
