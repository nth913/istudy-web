"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toggleTheme } from "@/lib/theme";
import { CatMoonSvg, CatSunSvg } from "@/lib/cat-svg";

export default function FloatingThemeToggle() {
  const [show, setShow] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!document.getElementById("dmHeaderToggle")) setShow(true);
  }, []);

  const handleClick = useCallback(() => {
    const el = btnRef.current;
    toggleTheme(el ?? undefined);
    if (el) {
      el.classList.remove("is-flash");
      void el.offsetWidth;
      el.classList.add("is-flash");
    }
  }, []);

  if (!show) return null;
  return (
    <button
      ref={btnRef}
      id="dm-toggle"
      type="button"
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
