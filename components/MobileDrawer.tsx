"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { MENUS, NAV_ITEMS, type MMRegular } from "@/lib/mega-menu-data";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-in mobile navigation drawer used at <900px viewport.
 *
 * Features
 *  - Semi-transparent backdrop click closes
 *  - ESC closes
 *  - Body scroll lock while open
 *  - Focus trap (first focusable element gets focus on open)
 *  - ARIA dialog, `aria-modal="true"`, labelled by drawer title
 *
 * Behavior parity with desktop mega menu is intentionally relaxed: we collapse
 * each top-level nav entry into an accordion list of its tier-1 tab labels
 * (not the full tier-2 group items), keeping mobile cognitive load low.
 */
export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Body scroll lock + ESC + focus trap
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current =
      typeof document !== "undefined"
        ? (document.activeElement as HTMLElement | null)
        : null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    // Move focus to first focusable
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

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(firstTick);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  // Close on route nav by listening to clicks inside drawer links
  function handleLinkClick() {
    onClose();
  }

  return (
    <>
      <div
        className={`md-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className={`md-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
      >
        <div className="md-drawer-header">
          <span id={titleId} className="md-drawer-title">
            <strong>istudy</strong> — menu
          </span>
          <button
            type="button"
            className="md-drawer-close"
            onClick={onClose}
            aria-label="Đóng menu"
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <nav className="md-drawer-nav" aria-label="Điều hướng chính">
          {NAV_ITEMS.map((n) => {
            const mega = n.mega ? MENUS[n.mega] : undefined;
            const hasSubmenu = mega && mega.kind !== "showcase";
            const isExpanded = expanded === n.key;
            return (
              <div key={n.key} className="md-drawer-row">
                <div className="md-drawer-row-head">
                  {n.href ? (
                    <Link
                      href={n.href}
                      className="md-drawer-link"
                      onClick={handleLinkClick}
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <span className="md-drawer-link">{n.label}</span>
                  )}
                  {hasSubmenu && (
                    <button
                      type="button"
                      className="md-drawer-expand"
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? `Thu gọn ${n.label}` : `Mở rộng ${n.label}`}
                      onClick={() => setExpanded(isExpanded ? null : n.key)}
                    >
                      <svg
                        className="icon icon-xs"
                        viewBox="0 0 24 24"
                        style={{
                          transition: "transform .2s",
                          transform: isExpanded ? "rotate(180deg)" : "none",
                        }}
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasSubmenu && isExpanded && (
                  <ul className="md-drawer-sublist">
                    {(mega as MMRegular).tabs.map((tab) => (
                      <li key={tab.id}>
                        <Link
                          href={`/coming-soon?feature=${encodeURIComponent(tab.label)}`}
                          className="md-drawer-sublink"
                          onClick={handleLinkClick}
                        >
                          {tab.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="md-drawer-foot">
          <Link
            href="/coming-soon?feature=signup"
            className="btn btn--outline btn--small btn--block"
            onClick={handleLinkClick}
          >
            Đăng ký
          </Link>
          <Link
            href="/coming-soon?feature=login"
            className="btn btn--primary btn--small btn--block"
            onClick={handleLinkClick}
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
}
