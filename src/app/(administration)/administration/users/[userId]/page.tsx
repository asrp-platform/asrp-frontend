"use client"

import { useParams } from "next/navigation"

const Page = () => {
    const params = useParams<{ userId: string }>()

    return <div>User ID: {params.userId}</div>
}

export default Page
