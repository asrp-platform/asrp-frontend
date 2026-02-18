import styles from "./Header.module.scss"
import Logo from "../../shared/ui/LogoPlaceholder/Logo.tsx"
import AuthStatus from "./ui/AuthStatus.tsx"

import { type HeaderMenuItem, headerMenuItems } from "./headerMenuItems.tsx"
import SideMenu from "./ui/SideMenu.tsx"
import { Dropdown } from "antd"

const Header = () => {
    return (
        <header className={styles.headerElement}>
            <div className={styles.horizontalMenu}>
                <Logo />
                <nav className={styles.navbar}>
                    {headerMenuItems.map((item) => {
                        if (item.children) {
                            return (
                                <Dropdown
                                    key={item.key}
                                    menu={{
                                        items: item.children.map((item: HeaderMenuItem) => ({
                                            key: item.key,
                                            label: (
                                                <a className={styles.headerMenuItem} href={item.to}>
                                                    {item.label}
                                                </a>
                                            ),
                                        })),
                                    }}
                                >
                                    <span className={styles.headerMenuItem}>{item.label}</span>
                                </Dropdown>
                            )
                        }

                        return (
                            <div key={item.key}>
                                <a className={styles.headerMenuItem} href={item.to}>
                                    {item.label}
                                </a>
                            </div>
                        )
                    })}
                </nav>

                <div className={styles.authStatusContainer}>
                    <AuthStatus />
                </div>

                <div className={styles.burgerMenu}>
                    <SideMenu />
                </div>
            </div>
        </header>
    )
}

export default Header
