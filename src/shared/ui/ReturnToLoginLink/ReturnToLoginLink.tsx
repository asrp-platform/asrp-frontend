"use client"

import Link from "next/link"
import type { ComponentProps } from "react"

import { useReturnToLoginHref } from "@shared/hooks/useReturnToLoginHref.ts"

type IProps = Omit<ComponentProps<typeof Link>, "href">

const ReturnToLoginLink = (props: IProps) => {
    const href = useReturnToLoginHref("/login")

    return <Link {...props} href={href} />
}

export default ReturnToLoginLink
