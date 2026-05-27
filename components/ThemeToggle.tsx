"use client";

import { useCallback, useEffect, useState } from "react";
import { getTheme, toggleTheme, type Theme } from "@/lib/theme";

const MOON_PATH = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";
const SUN_CIRCLE = { cx: 12, cy: 12, r: 4 } as const;
const SUN_RAYS =
  "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41";

interface ThemeToggleProps {
  variant: "header" | "mobile";
  onAfterToggle?: () => void;
}

export default function ThemeToggle({ variant, onAfterToggle }: ThemeToggleProps) {
  const [theme, setLocalTheme] = useState<Theme>("light");

  useEffect(() => {
    setLocalTheme(getTheme());
    const onChange = (e: Event) => {
      const t = (e as CustomEvent<Theme>).detail;
      setLocalTheme(t === "dark" ? "dark" : "light");
    };
    window.addEventListener("istudy:theme", onChange);
    return () => window.removeEventListener("istudy:theme", onChange);
  }, []);

  const handleClick = useCallback(() => {
    toggleTheme();
    onAfterToggle?.();
  }, [onAfterToggle]);

  const moonIcon = (cls: string) => (
    <svg className={`icon ${cls} dm-icon-moon`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={MOON_PATH} />
    </svg>
  );
  const sunIcon = (cls: string) => (
    <svg className={`icon ${cls} dm-icon-sun`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx={SUN_CIRCLE.cx} cy={SUN_CIRCLE.cy} r={SUN_CIRCLE.r} />
      <path d={SUN_RAYS} />
    </svg>
  );

  if (variant === "header") {
    return (
      <button
        id="dmHeaderToggle"
        type="button"
        className="icon-btn dm-header-toggle"
        title="Đổi chế độ sáng / tối"
        aria-label="Đổi chế độ sáng / tối"
        onClick={handleClick}
      >
        {moonIcon("")}
        {sunIcon("")}
      </button>
    );
  }

  const label = theme === "dark" ? "Chế độ sáng" : "Chế độ tối";
  return (
    <button
      type="button"
      className="mobile-nav-item mobile-nav-item--icon dm-mobile-toggle"
      onClick={handleClick}
    >
      {moonIcon("icon-sm")}
      {sunIcon("icon-sm")}
      <span className="dm-toggle-label">{label}</span>
    </button>
  );
}
