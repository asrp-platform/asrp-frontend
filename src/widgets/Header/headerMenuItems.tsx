import type { ReactNode } from "react";
import {
    House,
    Info,
    Users,
    GraduationCap,
    Handshake,
    Newspaper,
    HeartHandshake,
    Mail,
} from "lucide-react";

export interface HeaderMenuItem {
    to: string;
    label: string;
    key: number | string;
    element?: ReactNode;
    icon?: ReactNode;
}

export const headerMenuItems: HeaderMenuItem[] = [
    {
        key: 1,
        to: "/",
        label: "Home",
        icon: <House size={18} />,
    },
    {
        key: 2,
        to: "/about",
        label: "About us",
        icon: <Info size={18} />,
    },
    {
        key: 3,
        to: "/membership",
        label: "Membership",
        icon: <Users size={18} />,
    },
    {
        key: 4,
        to: "/education",
        label: "Education",
        icon: <GraduationCap size={18} />,
    },
    {
        key: 5,
        to: "/mentorship",
        label: "Mentorship",
        icon: <Handshake size={18} />,
    },
    {
        key: 6,
        to: "/news-and-events",
        label: "News & Events",
        icon: <Newspaper size={18} />,
    },
    {
        key: 7,
        to: "/donations-and-sponsorship",
        label: "Donations & Sponsorship",
        icon: <HeartHandshake size={18} />,
    },
    {
        key: 8,
        to: "/contacts",
        label: "Contacts",
        icon: <Mail size={18} />,
    },
];
