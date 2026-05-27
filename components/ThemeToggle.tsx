"use client";

import { useCallback, useRef } from "react";
import { toggleTheme } from "@/lib/theme";
import { CatMoonSvg, CatSunSvg } from "@/lib/cat-svg";

interface ThemeToggleProps {
  variant: "header" | "mobile";
  onAfterToggle?: () => void;
}

export default function ThemeToggle({ variant, onAfterToggle }: ThemeToggleProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    const el = btnRef.current;
    toggleTheme(el ?? undefined);
    if (el) {
      el.classList.remove("is-flash");
      void el.offsetWidth;
      el.classList.add("is-flash");
    }
    onAfterToggle?.();
  }, [onAfterToggle]);

  if (variant === "header") {
    return (
      <button
        ref={btnRef}
        id="dmHeaderToggle"
        type="button"
        className="dm-header-toggle"
        title="Đổi chế độ sáng / tối"
        aria-label="Đổi chế độ sáng / tối"
        onClick={handleClick}
      >
        <span className="dm-cat-aura" aria-hidden="true" />
        <CatMoonSvg className="dm-cat dm-cat-moon" />
        <CatSunSvg className="dm-cat dm-cat-sun" />
      </button>
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className="mobile-nav-item mobile-nav-item--icon dm-mobile-toggle"
      onClick={handleClick}
    >
      <span className="dm-mobile-cat-wrap">
        <CatMoonSvg className="dm-cat-mini dm-cat-moon" />
        <CatSunSvg className="dm-cat-mini dm-cat-sun" />
      </span>
      <span className="dm-toggle-label">Đổi chế độ sáng / tối</span>
    </button>
  );
}
