import { useEffect, useState } from "react";

const themesList = ["system", "light", "dark"];
const themeIcons = {
    system: "contrast",
    light: "light_mode",
    dark: "dark_mode",
};

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "system",
    );

    const toggleTheme = () => {
        const nextTheme =
            themesList[(themesList.indexOf(theme) + 1) % themesList.length];
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    };

    useEffect(() => {
        if (theme === "system") {
            document.documentElement.classList.toggle(
                "dark",
                window.matchMedia("(prefers-color-scheme: dark)").matches,
            );
        } else {
            document.documentElement.classList.toggle("dark", theme === "dark");
        }
    }, [theme]);

    // Update theme if system preferences change
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const systemThemeChange = () => {
            if (theme === "system") {
                document.documentElement.classList.toggle(
                    "dark",
                    mediaQuery.matches,
                );
            }
        };

        mediaQuery.addEventListener("change", systemThemeChange);
        return () =>
            mediaQuery.removeEventListener("change", systemThemeChange);
    }, [theme]);

    return (
        <span
            className="material-symbols-outlined cursor-pointer select-none duration-200 hover:text-blue-500"
            onClick={() => toggleTheme()}
        >
            {themeIcons[theme]}
        </span>
    );
}
