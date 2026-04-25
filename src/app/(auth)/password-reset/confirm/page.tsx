import PasswordResetConfirmClient from "@/app/(auth)/password-reset/confirm/PasswordResetConfirmClient.tsx"
import { Suspense } from "react"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

const Page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <PasswordResetConfirmClient />
        </Suspense>
    )
}

export default Page
