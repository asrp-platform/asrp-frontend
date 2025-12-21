"use client"

import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

import styles from "./styles.module.scss";
import Logo from "../../../shared/ui/LogoPlaceholder/Logo.tsx";
import {headerMenuItems} from "../headerMenuItems.tsx";
import Link from "next/link";

const SideMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <Menu width={24} height={24} onClick={onClick} className={styles.menuIconContainer}/>
            { isOpen && <div className={styles.overlay} onClick={onClick}></div> }
            <div className={`${styles.sideMenuContainer} ${isOpen && styles.active}`}>
                <div className={styles.sideMenu}>
                    <div className={styles.sideMenuHeader}>
                        <Logo width={32} height={32} />
                        <X onClick={onClick} />
                    </div>
                    <div className={styles.breakLine}></div>
                    <div className={styles.sideMenuBody}>
                        {headerMenuItems.map((item) => (
                            <div key={item.key} className={styles.menuItemContainer}>
                                <span className={styles.menuIcon}>{item.icon}</span>
                                <Link href={item.to}>{item.label}</Link>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;