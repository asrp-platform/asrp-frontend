import type { ReactNode } from "react"

export interface HeaderMenuItem {
    to: string
    label: string
    key: number | string
    element?: ReactNode
    icon?: ReactNode
}

export const headerMenuItems: HeaderMenuItem[] = [
    {
        key: 1,
        to: "/",
        label: "Home",
    },
    {
        key: 2,
        to: "/about",
        label: "About us",
    },
    {
        key: 3,
        to: "/membership",
        label: "Membership",
    },
    {
        key: 4,
        to: "/education",
        label: "Education",
    },
    {
        key: 5,
        to: "/mentorship",
        label: "Mentorship",
    },
    {
        key: 6,
        to: "/news-and-events",
        label: "News & Events",
    },
    {
        key: 7,
        to: "/donations-and-sponsorship",
        label: "Donations & Sponsorship",
    },
    {
        key: 8,
        to: "/contacts",
        label: "Contacts",
    },
]
