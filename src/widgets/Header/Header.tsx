import { Menu } from "lucide-react";



import styles from "./Header.module.scss"
import Logo from "../../shared/ui/LogoPlaceholder/Logo.tsx";
import {headerMenuItems} from "./headerMenuItems.tsx";




const Header = () => {

    return (
        <header className={styles.headerElement}>
            <div className={styles.horizontalMenu}>
                <Logo />
                <nav className={styles.navbar}>
                    {headerMenuItems.map((item) =>
                        <a href={item.to} key={item.key}>{item.label}</a>
                    )}
                </nav>

                <div className={styles.userProfileIcon}>
                </div>

                <div className={styles.burgerMenu}>
                    <Menu />
                </div>
            </div>

        </header>
    )
}

export default Header
