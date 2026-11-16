"use client"

import { Badge, Layout, Menu } from "antd"
import {
    UserOutlined,
    TeamOutlined,
    MailOutlined,
    DashboardOutlined,
    SettingOutlined,
    CreditCardOutlined,
    FolderOpenOutlined,
} from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useEffect, useMemo, useState } from "react"
import styles from "@/app/(administration)/layout.module.scss"
import BackToMainSiteButton from "@/shared/ui/Buttons/BackToMainSiteButton.tsx"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import { getLoginUrl } from "@shared/helpers/authRedirect.ts"

import { useAdminAttentionQuery } from "@shared/backend/queries/useAdminAttentionQuery"
import AdminAttentionLabel from "@shared/ui/AdminAttentionLabel/AdminAttentionLabel"

const { Header, Sider, Content } = Layout

interface IProps {
    children: ReactNode
}

const menuItems = [
    {
        key: "/administration",
        icon: <DashboardOutlined />,
        label: "Dashboard",
    },
    {
        key: "/administration/users",
        icon: <UserOutlined />,
        label: "Users",
    },
    {
        key: "/administration/membership",
        icon: <TeamOutlined />,
        label: "Membership",
    },
    {
        key: "/administration/content",
        icon: <FolderOpenOutlined />,
        label: "Content",
    },
    {
        key: "/administration/feedback",
        icon: <MailOutlined />,
        label: "Feedback",
    },
    {
        key: "/administration/payments",
        icon: <CreditCardOutlined />,
        label: "Payments",
    },
    {
        key: "/administration/site-settings",
        icon: <SettingOutlined />,
        label: "Site Settings",
    },
]

const menuKeys = menuItems.map((item) => item.key).sort((a, b) => b.length - a.length)

const AdminLayout = ({ children }: IProps) => {
    const { data: currentUser, isPending: userIsPending } = useCurrentUserQuery()

    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    const { membershipCount, nameChangeCount, feedbackCount } = useAdminAttentionQuery()
    const attentionCounts: Record<string, number | undefined> = {
        "/administration/users": nameChangeCount,
        "/administration/membership": membershipCount,
        "/administration/feedback": feedbackCount,
    }
    const items = menuItems.map((item) => ({
        ...item,
        label: (
            <AdminAttentionLabel count={collapsed ? undefined : attentionCounts[item.key]}>
                {item.label}
            </AdminAttentionLabel>
        ),
        icon:
            collapsed && (attentionCounts[item.key] ?? 0) > 0 ? (
                <Badge dot>{item.icon}</Badge>
            ) : (
                item.icon
            ),
    }))

    const selectedKey = useMemo(() => {
        return (
            menuKeys.find((key) => pathname === key || pathname.startsWith(`${key}/`)) ??
            "/administration"
        )
    }, [pathname])

    const selectedKeys = useMemo(() => [selectedKey], [selectedKey])

    useEffect(() => {
        if (!currentUser && !userIsPending) {
            router.replace(getLoginUrl(pathname))
        }
    }, [currentUser, pathname, router, userIsPending])

    return (
        <Layout className={styles.layout}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className={styles.siderTitle}>
                    {collapsed ? "ASRP" : <BackToMainSiteButton href="/" />}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    items={items}
                    onClick={({ key }) => router.push(key)}
                />
            </Sider>

            <Layout>
                <Header className={styles.layoutHeader}>Administrative Panel</Header>

                <Content className={styles.content}>{children}</Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
