"use client"

import { Layout, Menu } from "antd"
import {
    UserOutlined,
    TeamOutlined,
    MailOutlined,
    DashboardOutlined,
    SettingOutlined,
} from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useMemo, useState } from "react"
import styles from "@/app/(administration)/layout.module.scss"
import BackToMainSiteButton from "@/shared/ui/Buttons/BackToMainSiteButton.tsx"

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
        key: "/administration/contact-messages",
        icon: <MailOutlined />,
        label: "Contact Messages",
    },
    {
        key: "/administration/site-settings",
        icon: <SettingOutlined />,
        label: "Site Settings",
    },
]

const menuKeys = menuItems.map((item) => item.key).sort((a, b) => b.length - a.length)

const AdminLayout = ({ children }: IProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    const selectedKey = useMemo(() => {
        return (
            menuKeys.find((key) => pathname === key || pathname.startsWith(`${key}/`)) ??
            "/administration"
        )
    }, [pathname])

    const selectedKeys = useMemo(() => [selectedKey], [selectedKey])

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
                    items={menuItems}
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
