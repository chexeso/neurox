"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = (resolvedTheme ?? theme) === "dark";
  return (
    <button
      type="button"
      className="btn btn-ghost h-10 w-10 !p-0"
      aria-label="Переключить тему"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {mounted ? (dark ? "☀" : "☾") : "·"}
    </button>
  );
}
