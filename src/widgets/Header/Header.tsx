



import styles from "./Header.module.scss"
import Logo from "../../shared/ui/LogoPlaceholder/Logo.tsx";
import AuthStatus from "./ui/AuthStatus.tsx";

import {headerMenuItems} from "./headerMenuItems.tsx";
import SideMenu from "./ui/SideMenu.tsx";


const Header = () => {

    return (
        <header className={styles.headerElement}>
            <div className={styles.horizontalMenu}>
                <Logo />
                <nav className={styles.navbar}>
                    {headerMenuItems.map((item) =>
                        <div key={item.key}>
                            {item.element? item.element: <a className={styles.headerMenuItem} href={item.to} >{item.label}</a>}
                        </div>
                    )}
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
