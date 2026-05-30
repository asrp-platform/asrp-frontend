"use client"

import { useRouter } from "next/navigation"
import { UserCircle } from "lucide-react"

import { Dropdown, type MenuProps } from "antd"
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { useMemo } from "react"

import styles from "@/widgets/Header/ui/styles.module.scss"
import Link from "next/link"
import UserAvatar from "@/shared/ui/Avatar/UserAvatar.tsx"
import { handleLogout } from "@/widgets/Header/helpers/logout.ts"
import { onUserLoginClick } from "@/widgets/Header/helpers/login.ts"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"

const AuthStatus = () => {
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const router = useRouter()

    const isAdmin = useMemo(() => {
        return currentUser?.admin
    }, [currentUser])

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

    if (isCurrentUserLoading) {
        return <div className={styles.avatarSkeleton} />
    }

    if (!currentUser) {
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
                <UserAvatar user={currentUser} />
            </div>
        </Dropdown>
    )
}

export default AuthStatus
