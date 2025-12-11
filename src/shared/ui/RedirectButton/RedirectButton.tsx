"use client"

import {useRouter} from "next/navigation";


interface Props {
    to: string;
    className?: string;
    label: string
}

const RedirectButton = async ({to, className, label}: Props) => {

    const router = useRouter()

    return (
        <button
            onClick={() => router.push(to)}
            className={className}
        >
            {label}
        </button>
    );
};

export default RedirectButton;