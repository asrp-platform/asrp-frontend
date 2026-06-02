import type { Metadata } from "next"

import ResendConfirmationForm from "@app/(auth)/registration/resend-confirmation/ResendConfirmationForm.tsx"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "ASRP | Resend confirmation email",
}

const Page = () => {
    return <ResendConfirmationForm />
}

export default Page
