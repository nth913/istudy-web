"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/mega-menu-data";
import { MegaMenuWrap, useMegaMenuController } from "./MegaMenu";

const ACTIVE_BY_PATH: Record<string, string> = {
  "/": "home",
  "/kho-de-thi": "kho-de",
  "/de-thi-chi-tiet": "kho-de",
  "/dap-an": "kho-de",
  "/ket-qua": "kho-de",
  "/bai-viet": "blog",
  "/bai-viet-chi-tiet": "blog",
};

export default function Header({ activeNav }: { activeNav?: string }) {
  const pathname = usePathname();
  const active = activeNav ?? ACTIVE_BY_PATH[pathname] ?? "";
  const { openKey, open, scheduleClose, cancelClose } = useMegaMenuController();

  return (
    <header className="header" style={{ position: "sticky", top: 0 }}>
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
        <Link href="/coming-soon?feature=search" className="icon-btn" title="Tìm kiếm">
          <svg className="icon" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </Link>
        <Link href="/coming-soon?feature=dark" className="icon-btn" title="Chế độ tối">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </Link>
        <Link href="/coming-soon?feature=signup" className="btn btn--outline btn--small">Đăng ký</Link>
        <Link href="/coming-soon?feature=login" className="btn btn--primary btn--small">Đăng nhập</Link>
      </div>

      <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
        <MegaMenuWrap openKey={openKey} />
      </div>
    </header>
  );
}
