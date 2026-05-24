"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { NAV_ITEMS } from "@/lib/mega-menu-data";
import { MegaMenuWrap, useMegaMenuController } from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import type { ActiveEventsResponse } from "@/lib/events-data";
import type { MegaMenuKhoDeData } from "@/lib/api/mega-menu";

const ACTIVE_BY_PATH: Record<string, string> = {
  "/": "home",
  "/kho-de-thi": "kho-de",
  "/de-thi-chi-tiet": "kho-de",
  "/dap-an": "kho-de",
  "/ket-qua": "kho-de",
  "/bai-viet": "blog",
  "/bai-viet-chi-tiet": "blog",
};

interface HeaderProps {
  activeNav?: string;
  /**
   * Optional active-events payload — when supplied, the mega menu may swap a
   * submenu's promo card for an event card per the mega-menu event rule.
   */
  eventsResponse?: ActiveEventsResponse | null;
  /**
   * Optional CMS-driven slots for the "Kho đề" mega menu (featured exams,
   * live exams, popular tags, CTA banner per tab). Fetched server-side per
   * mega-menu hybrid rule.
   */
  khoDeSlots?: MegaMenuKhoDeData | null;
}

export default function Header({ activeNav, eventsResponse, khoDeSlots }: HeaderProps) {
  const pathname = usePathname();
  const active = activeNav ?? ACTIVE_BY_PATH[pathname] ?? "";
  const { openKey, open, scheduleClose, cancelClose } = useMegaMenuController();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMenuToggle = useCallback(() => setMenuOpen((v) => !v), []);
  const handleMenuClose = useCallback(() => setMenuOpen(false), []);
  const handleOpenSearch = useCallback(() => setSearchOpen(true), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);

  return (
    <header className="header" style={{ position: "sticky", top: 0 }}>
      <div className="header-inner">
        <Link href="/" className="logo">
          <img src="/logo/istudy-lite-64.png" alt="istudy" width={34} height={34} />
          <span className="logo-text">istudy</span>
        </Link>

        <nav className="nav" id="mainNav">
          {NAV_ITEMS.map((n) => {
            const cls = ["nav-item"];
            if (n.mega) cls.push("has-mega");
            if (active === n.key) cls.push("active");
            if (openKey === n.mega) cls.push("mega-active");
            const inner = (
              <>
                {n.label}
                {n.mega && (
                  <svg className="icon icon-xs" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </>
            );
            const handlers = n.mega
              ? {
                  onMouseEnter: () => open(n.mega!),
                  onMouseLeave: scheduleClose,
                }
              : {};
            if (n.href) {
              return (
                <Link key={n.key} href={n.href} className={cls.join(" ")} {...handlers}>
                  {inner}
                </Link>
              );
            }
            return (
              <div key={n.key} className={cls.join(" ")} {...handlers}>
                {inner}
              </div>
            );
          })}
        </nav>

        <div className="header-right">
          <button
            type="button"
            className="icon-btn"
            title="Tìm kiếm"
            aria-label="Mở tìm kiếm"
            onClick={handleOpenSearch}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <Link href="/coming-soon?feature=dark" className="icon-btn" title="Chế độ tối">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </Link>
          <Link
            href="/coming-soon?feature=signup"
            className="btn btn--outline btn--small header-cta-desktop"
          >
            Đăng ký
          </Link>
          <Link
            href="/coming-soon?feature=login"
            className="btn btn--primary btn--small header-cta-desktop"
          >
            Đăng nhập
          </Link>
          <button
            type="button"
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={handleMenuToggle}
          >
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
          </button>
        </div>
      </div>

      <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
        <MegaMenuWrap
          openKey={openKey}
          eventsResponse={eventsResponse}
          khoDeSlots={khoDeSlots}
        />
      </div>

      <MobileMenu
        open={menuOpen}
        activeKey={active}
        onClose={handleMenuClose}
        onOpenSearch={handleOpenSearch}
      />
      <SearchOverlay open={searchOpen} onClose={handleSearchClose} />
    </header>
  );
}
