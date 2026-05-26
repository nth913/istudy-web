export type Theme = "light" | "dark";

const STORAGE_KEY = "istudyTheme";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const v = document.documentElement.getAttribute("data-theme");
  return v === "dark" ? "dark" : "light";
}

export function setTheme(t: Theme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  root.style.colorScheme = t === "dark" ? "dark" : "light";
  try {
    localStorage.setItem(STORAGE_KEY, t);
  } catch {
    // localStorage unavailable (private mode etc.) — silently ignore.
  }
  window.dispatchEvent(new CustomEvent("istudy:theme", { detail: t }));
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
