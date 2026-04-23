"use client"

import { useRouter } from "next/navigation"
import { UserCircle } from "lucide-react"

import { useAuth } from "../../../context/AuthProvider.tsx"
import { Dropdown, type MenuProps } from "antd"
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { useMemo } from "react"

import styles from "./styles.module.scss"
import Link from "next/link"
import UserAvatar from "../../../shared/ui/Avatar/UserAvatar.tsx"
import { handleLogout } from "../helpers/logout.ts"
import { onUserLoginClick } from "../helpers/login.ts"

const AuthStatus = () => {
    const { user, isUserLoading } = useAuth()
    const router = useRouter()

    const isAdmin = useMemo(() => {
        return user?.admin
    }, [user])

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <Link href={`/account/dashboard`}>Profile</Link>,
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

    if (isUserLoading) {
        return <div className={styles.avatarSkeleton} />
    }

    if (!user) {
        return (
            <div className={styles.userCircleContainer}>
                <UserCircle
                    width={32}
                    height={32}
                    className={styles.userCircle}
                    onClick={() => onUserLoginClick(router)}
                />
            </div>
        )
    }

    return (
        <Dropdown menu={{ items }} placement="bottomRight">
            <div className={styles.userProfileIcon}>
                <UserAvatar user={user} />
            </div>
        </Dropdown>
    )
}

export default AuthStatus
