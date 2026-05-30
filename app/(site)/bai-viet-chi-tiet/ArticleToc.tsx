"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  href: string;
  label: string;
  lvl?: 2 | 3;
};

export default function ArticleToc({ items }: { items: ReadonlyArray<TocItem> }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.href.slice(1) ?? "");

  useEffect(() => {
    const ids = items.map((t) => t.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="toc-list" aria-label="Mục lục bài viết">
      {items.map((t) => {
        const lvlClass = t.lvl === 2 ? "lvl-2" : t.lvl === 3 ? "lvl-3" : "";
        const isActive = activeId === t.href.slice(1);
        const className = [lvlClass, isActive ? "active" : ""]
          .filter(Boolean)
          .join(" ");
        return (
          <a
            key={t.href}
            href={t.href}
            className={className || undefined}
            aria-current={isActive ? "true" : undefined}
          >
            {t.label}
          </a>
        );
      })}
    </nav>
  );
}
