"use client";

import { useCallback, useRef } from "react";
import { toggleTheme } from "@/lib/theme";

const MOON_PATH = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";
const SUN_RAYS =
  "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41";

export default function ThemeToggle() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    toggleTheme();
    const el = btnRef.current;
    if (!el) return;
    el.classList.remove("is-flash");
    void el.offsetWidth;
    el.classList.add("is-flash");
  }, []);

  return (
    <button
      ref={btnRef}
      id="dmHeaderToggle"
      type="button"
      className="dm-pill"
      title="Đổi chế độ sáng / tối"
      aria-label="Đổi chế độ sáng / tối"
      onClick={handleClick}
    >
      <span className="dm-track" aria-hidden="true">
        <span className="dm-sun">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d={SUN_RAYS} />
          </svg>
        </span>
        <span className="dm-moon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={MOON_PATH} />
          </svg>
        </span>
        <span className="dm-thumb" aria-hidden="true" />
      </span>
    </button>
  );
}
