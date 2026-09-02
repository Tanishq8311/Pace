"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("pace-theme", next ? "dark" : "light");
    } catch {
      // localStorage unavailable - theme just won't persist
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-lg border-2 border-border bg-surface p-1.5 text-foreground shadow-[2px_2px_0_0_var(--shadow-color)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:scale-90"
    >
      {dark ? <SunIcon className="h-4.5 w-4.5" /> : <MoonIcon className="h-4.5 w-4.5" />}
    </button>
  );
}
