"use client";

import { useState, useCallback, useEffect } from "react";
import { THEMES, DEFAULT_THEME } from "@/data/themes";

const STORAGE_KEY = "term-theme";

export function useTheme() {
  const [theme, setThemeState] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES[saved]) {
      setThemeState(saved);
    }
  }, []);

  const setTheme = useCallback((name: string) => {
    if (!THEMES[name]) return false;
    setThemeState(name);
    localStorage.setItem(STORAGE_KEY, name);
    return true;
  }, []);

  return { theme, setTheme, themeClass: `theme-${theme}` };
}
