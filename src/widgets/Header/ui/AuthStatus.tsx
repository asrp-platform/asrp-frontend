"use client"

import { useRouter } from "next/navigation"
import { UserCircle } from 'lucide-react';

import { useAuth } from "../../../context/AuthProvider.tsx";
import styles from "./styles.module.scss"


const AuthStatus = () => {

    const { user } = useAuth();
    const router = useRouter();

    const onUserLoginClick = () => {
        router.push("/login");
    }

    if (!user) {
        return (
            <UserCircle width={32} height={32} className={styles.userCircle} onClick={onUserLoginClick} />
        )
    }

    return (
        <div className={styles.userProfileIcon}>

        </div>
    );
};

export default AuthStatus;