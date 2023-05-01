import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CgDarkMode } from 'react-icons/cg';
import styles from './Header.module.css';

export function Header() {


    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            localStorage.getItem("theme")
        );
        setTheme(localStorage.getItem("theme"));
    }, []);

    function changeTheme() {
        if (theme === "light") {
            saveTheme("dark");
        } else {
            saveTheme("light");
        }
    };

    function saveTheme(theme) {
        setTheme(theme);
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };


    return (
        <header className={styles.header}>
            <Link to="/"><div className={styles.logo}>Countries App</div></Link>
            <button className={styles.themeButton} onClick={changeTheme}>
                <CgDarkMode />
            </button>
        </header>
    )
}