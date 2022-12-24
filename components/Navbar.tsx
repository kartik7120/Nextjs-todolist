import Link from "next/link";
import React from "react";
import styles from "../styles/navbar.module.css";

export default function Nav({ children }: { children?: React.ReactNode }) {
    return <div>
        {/* <aside> */}
        <nav className={styles.navbar}>
            <ul>
                <li><Link href={'#'} className="outline" role="button">Shopping</Link></li>
                <li><Link href={'#'} role="button">Shopping</Link></li>
                <li><Link href={'#'} role="button">Shopping</Link></li>
            </ul>
        </nav>
        {/* </aside> */}
        {children}
    </div>
}