import { useCallback, useState } from "react";

// Theme state lives on <html data-theme>, which the inline script in
// public/index.html sets before first paint (that's what prevents a flash of
// the wrong theme). This hook only reads it back and flips it — every color
// in the app resolves through the CSS tokens in index.css, so nothing else
// needs to know which theme is active.
export const THEME_STORAGE_KEY = "theme";
const THEME_COLOR = { dark: "#000000", light: "#f8f7f4" };

const readTheme = () =>
  typeof document !== "undefined" && document.documentElement.dataset.theme === "light" ? "light" : "dark";

const applyTheme = (theme) => {
  const root = document.documentElement;
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate) {
    root.classList.add("theme-transition");
    window.clearTimeout(applyTheme.timer);
    applyTheme.timer = window.setTimeout(() => root.classList.remove("theme-transition"), 250);
  }
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    // Storage unavailable (private mode, blocked cookies) — the switch still
    // works for this visit, it just won't be remembered.
  }
};

export function useTheme() {
  const [theme, setTheme] = useState(readTheme);
  const toggleTheme = useCallback(() => {
    const next = readTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }, []);
  return { theme, toggleTheme };
}
