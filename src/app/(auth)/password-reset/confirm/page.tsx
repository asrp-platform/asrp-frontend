import PasswordResetConfirmClient from "./PasswordResetConfirmClient.tsx"
import { Suspense } from "react"
import Loading from "../../../(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

const Page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <PasswordResetConfirmClient />
        </Suspense>
    )
}

export default Page
