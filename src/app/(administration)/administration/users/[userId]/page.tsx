"use client"

import { useParams } from "next/navigation"
import UserDataCard from "@app/(administration)/administration/users/[userId]/(ui)/UserDataCard/UserDataCard.tsx"

const Page = () => {
    const { userId } = useParams<{ userId: string }>()

    return <UserDataCard userId={userId} />
}

export default Page
