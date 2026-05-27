"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";
import { NAV_ITEMS } from "@/lib/mega-menu-data";
import ThemeToggle from "./ThemeToggle";

interface MobileMenuProps {
  open: boolean;
  activeKey?: string;
  onClose: () => void;
  onOpenSearch: () => void;
}

/**
 * Slide-down mobile navigation panel shown at <=900px viewport.
 *
 * Matches the design canonical header.js + styles.css `.mobile-menu` markup:
 *  - Flat nav links (no submenu accordion)
 *  - Divider
 *  - Tìm kiếm + Chế độ tối icon rows
 *  - Đăng ký + Đăng nhập action buttons
 *  - Scrim under panel, ESC closes, body scroll lock while open.
 */
export default function MobileMenu({
  open,
  activeKey,
  onClose,
  onOpenSearch,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("mobile-menu-open");

    const focusables = () =>
      panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    const firstTick = window.setTimeout(() => {
      const list = focusables();
      if (list.length > 0) list[0].focus();
    }, 0);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onResize() {
      if (window.innerWidth > 900) onClose();
    }

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(firstTick);
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove("mobile-menu-open");
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSearch = useCallback(() => {
    onClose();
    onOpenSearch();
  }, [onClose, onOpenSearch]);

  return (
    <>
      <div
        ref={panelRef}
        id="mobileMenu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <span id={titleId} className="sr-only">
          Menu điều hướng
        </span>

        {NAV_ITEMS.map((n) => {
          const cls = ["mobile-nav-item"];
          if (activeKey === n.key) cls.push("active");
          return (
            <Link
              key={n.key}
              href={n.href ?? "#"}
              className={cls.join(" ")}
              data-key={n.key}
              onClick={handleLinkClick}
            >
              {n.label}
            </Link>
          );
        })}

        <div className="mobile-menu-divider" />

        <button
          type="button"
          className="mobile-nav-item mobile-nav-item--icon"
          onClick={handleSearch}
        >
          <svg className="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Tìm kiếm
        </button>
        <ThemeToggle variant="mobile" onAfterToggle={onClose} />

        <div className="mobile-menu-actions">
          <Link
            href="/coming-soon?feature=signup"
            className="btn btn--outline btn--small"
            onClick={handleLinkClick}
          >
            Đăng ký
          </Link>
          <Link
            href="/coming-soon?feature=login"
            className="btn btn--primary btn--small"
            onClick={handleLinkClick}
          >
            Đăng nhập
          </Link>
        </div>
      </div>

      <div
        className={`mobile-menu-scrim${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
