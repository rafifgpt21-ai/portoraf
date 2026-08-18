"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const themeQuery = "(prefers-color-scheme: dark)";

function getTheme(): Theme {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(callback: () => void) {
    const media = window.matchMedia(themeQuery);
    const handleSystemTheme = () => {
        if (!window.localStorage.getItem("portfolio-theme")) {
            document.documentElement.dataset.theme = media.matches ? "dark" : "light";
        }
        callback();
    };
    window.addEventListener("portfolio-theme", callback);
    media.addEventListener("change", handleSystemTheme);
    return () => {
        window.removeEventListener("portfolio-theme", callback);
        media.removeEventListener("change", handleSystemTheme);
    };
}

export default function ThemeToggle() {
    const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

    const toggleTheme = () => {
        const nextTheme: Theme = theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = nextTheme;
        window.localStorage.setItem("portfolio-theme", nextTheme);
        window.dispatchEvent(new Event("portfolio-theme"));
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            className="flex h-full min-w-12 items-center justify-center border-l-2 border-ink px-2 font-mono text-[8px] font-black uppercase tracking-[0.08em] hover:bg-ink hover:text-paper md:min-w-32 md:px-4 md:text-[9px]"
        >
            <span className="md:hidden">{theme === "light" ? "DARK" : "LITE"}</span>
            <span className="hidden md:inline">Theme / {theme === "light" ? "Dark" : "Light"}</span>
        </button>
    );
}
