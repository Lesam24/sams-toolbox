"use client"

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function getSysTheme(): "light" | "dark" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
}

function applyTheme(theme: Theme) {
    const obtTheme = theme === "system" ? getSysTheme() : theme;
    
    document.documentElement.dataset.theme = obtTheme;
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("system");

    useEffect(() => {
        const savedTheme = localStorage.getItem(STORAGE_KEY);

        if (
            savedTheme === "light" ||
            savedTheme === "dark" ||
            savedTheme === "system"
        ) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } else {
            applyTheme("system");
        }
    }, []);

    function handleChange(newTheme: Theme) {
        setTheme(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
        applyTheme(newTheme);
    }

    return (
    <div className="theme-toggle" aria-label="Theme">
      <button
        type="button"
        className={theme === "light" ? "active" : ""}
        onClick={() => handleChange("light")}
        aria-label="Light theme"
        aria-pressed={theme === "light"}
      >
        ☀
      </button>

      <button
        type="button"
        className={theme === "system" ? "active" : ""}
        onClick={() => handleChange("system")}
        aria-label="System theme"
        aria-pressed={theme === "system"}
      >
        ⚙
      </button>

      <button
        type="button"
        className={theme === "dark" ? "active" : ""}
        onClick={() => handleChange("dark")}
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
      >
        ☾
      </button>
    </div>
    );
}