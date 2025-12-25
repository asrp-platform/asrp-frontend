"use client"

import { useRouter } from "next/navigation"
import { UserCircle } from 'lucide-react';

import { useAuth } from "../../../context/AuthProvider.tsx";
import { getAvatarUrl, LOGOUT_URL} from "../../../shared/backend/restApiUrls.ts";
import { Dropdown, type MenuProps} from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import api from "../../../axios.ts";

import styles from "./styles.module.scss";
import Link from "next/link";


const AuthStatus = () => {

    const { user, isUserLoading } = useAuth();
    const router = useRouter();

    const isAdmin = useMemo(() => {
        return user?.stuff
    }, [user])

    const handleLogout = async () => {
        await api.post(LOGOUT_URL)
        localStorage.removeItem("accessToken")
        window.location.reload();
    }

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <Link href={`/users/${user?.id}/profile`}>Profile</Link>,
            icon: <UserOutlined />,
        },
        ...(isAdmin
            ? [
                {
                    key: "3",
                    label: <Link href={`/administration`}>Administration</Link>,
                    icon: <SettingOutlined />,
                },
            ]
            : []),
        {
            key: "2",
            label: <div onClick={handleLogout}>Logout</div>,
            icon: <LogoutOutlined />,
        },
    ]

    const onUserLoginClick = () => {
        router.push("/login");
    }

    if (isUserLoading) {
        return <div className={styles.avatarSkeleton} />;
    }

    if (!user) {
        return (
            <div className={styles.userCircleContainer}>
                <UserCircle width={32} height={32} className={styles.userCircle} onClick={onUserLoginClick} />
            </div>
        )
    }

    return (
        <Dropdown
            menu={{ items }}
            placement="bottomRight"
        >
            <div className={styles.userProfileIcon}>
                {user.avatar_path && <img src={getAvatarUrl(user.avatar_path)} alt="Avatar" />}
            </div>
        </Dropdown>
    );
};

export default AuthStatus;