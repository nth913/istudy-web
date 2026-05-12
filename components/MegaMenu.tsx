"use client";
import { MENUS, type MMShowcase, type MMRegular } from "@/lib/mega-menu-data";
import { useEffect, useRef, useState } from "react";

export function renderMegaPanelHTML(key: string): string {
  const data = MENUS[key];
  if (!data) return "";
  if (data.kind === "showcase") return renderShowcase(data);
  return renderRegular(data);
}

function renderRegular(data: MMRegular): string {
  const tabs = data.tabs
    .map(
      (t, i) => `
    <div class="mm-tab${i === 0 ? " active" : ""}" data-tab="${t.id}">
      <div class="mm-tab-icon">${t.icon}</div>
      <div class="mm-tab-body">
        <div class="mm-tab-label">${t.label}</div>
        <div class="mm-tab-desc">${t.desc}</div>
      </div>
      <svg class="icon icon-xs mm-tab-arrow" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
    </div>`
    )
    .join("");

  const panels = data.tabs
    .map(
      (t, i) => `
    <div class="mm-panel${i === 0 ? " active" : ""}" data-panel="${t.id}">
      <div class="mm-cols">
        ${t.groups
          .map(
            (g) => `
          <div class="mm-col">
            <div class="mm-col-title">${g.title}</div>
            ${g.items
              .map(
                (it) => `
              <a href="#" class="mm-leaf">
                <div class="mm-leaf-name">
                  ${it.name}
                  ${it.tag ? `<span class="mm-tag mm-tag--${it.tag.toLowerCase()}">${it.tag}</span>` : ""}
                </div>
                ${it.sub ? `<div class="mm-leaf-sub">${it.sub}</div>` : ""}
              </a>`
              )
              .join("")}
          </div>`
          )
          .join("")}
      </div>
      <div class="mm-promo">
        <div class="mm-promo-eyebrow">istudy +</div>
        <div class="mm-promo-title">${data.promo.title}</div>
        <div class="mm-promo-sub">${data.promo.sub}</div>
        <button class="btn btn--primary btn--small mm-promo-cta">
          ${data.promo.cta}
          <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>`
    )
    .join("");

  return `
    <div class="mm-inner">
      <div class="mm-header">
        <div class="mm-title">${data.title}</div>
        <a href="#" class="mm-viewall">Xem tất cả
          <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
      <div class="mm-body">
        <div class="mm-rail">${tabs}</div>
        <div class="mm-panels">${panels}</div>
      </div>
    </div>`;
}

function renderShowcase(data: MMShowcase): string {
  const cats = data.categories;
  const card = (p: MMShowcase["featured"][number], big: boolean) => {
    const c = cats[p.cat];
    return `<a href="/bai-viet" class="mm-bcard${big ? " big" : ""}">
      <div class="mm-bcard-img" style="background:linear-gradient(135deg, ${p.g[0]}, ${p.g[1]})">${p.g[2]}</div>
      <div class="mm-bcard-body">
        <span class="mm-bcard-cat" style="color:${c.color};background:${c.bg}">${c.name}</span>
        <div class="mm-bcard-title">${p.t}</div>
        <div class="mm-bcard-meta"><span>${p.d}</span><span>·</span><span>${p.v} lượt đọc</span></div>
      </div>
    </a>`;
  };
  return `
    <div class="mm-inner">
      <div class="mm-header">
        <div class="mm-title">${data.title}</div>
        <a href="/bai-viet" class="mm-viewall">Xem tất cả bài viết
          <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
      <div class="mm-blog">
        <div class="mm-blog-col">
          <div class="mm-col-title">Bài viết nổi bật</div>
          <div class="mm-blog-feat">
            ${card(data.featured[0], true)}
            <div class="mm-blog-feat-side">
              ${data.featured.slice(1).map((p) => card(p, false)).join("")}
            </div>
          </div>
        </div>
        <div class="mm-blog-col">
          <div class="mm-col-title">Bài viết mới nhất</div>
          <div class="mm-blog-latest">
            ${data.latest
              .map(
                (p) => `
              <a href="/bai-viet" class="mm-brow">
                <div class="mm-brow-img" style="background:linear-gradient(135deg, ${p.g[0]}, ${p.g[1]})">${p.g[2]}</div>
                <div class="mm-brow-body">
                  <span class="mm-bcard-cat" style="color:${cats[p.cat].color};background:${cats[p.cat].bg}">${cats[p.cat].name}</span>
                  <div class="mm-brow-title">${p.t}</div>
                  <div class="mm-bcard-meta"><span>${p.d}</span><span>·</span><span>${p.v}</span></div>
                </div>
              </a>`
              )
              .join("")}
          </div>
        </div>
        <div class="mm-blog-col mm-blog-side">
          <div class="mm-col-title">Chủ đề hot</div>
          <div class="mm-chips">
            ${data.topics.map((t) => `<a href="/bai-viet" class="mm-chip">${t}</a>`).join("")}
          </div>
          <div class="mm-promo" style="margin-top:16px">
            <div class="mm-promo-eyebrow">istudy +</div>
            <div class="mm-promo-title">${data.promo.title}</div>
            <div class="mm-promo-sub">${data.promo.sub}</div>
            <button class="btn btn--primary btn--small mm-promo-cta">
              ${data.promo.cta}
              <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

export function MegaMenuWrap({ openKey }: { openKey: string | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!openKey) {
      ref.current.classList.remove("open");
      return;
    }
    ref.current.innerHTML = renderMegaPanelHTML(openKey);
    ref.current.classList.add("open");

    // Bind tier-2 tab hover swap
    const tabs = ref.current.querySelectorAll(".mm-tab");
    const panels = ref.current.querySelectorAll(".mm-panel");
    const handlers: Array<{ el: Element; fn: () => void }> = [];
    tabs.forEach((t) => {
      const fn = () => {
        tabs.forEach((x) => x.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        t.classList.add("active");
        const id = (t as HTMLElement).dataset.tab;
        const pan = ref.current?.querySelector(`.mm-panel[data-panel="${id}"]`);
        if (pan) pan.classList.add("active");
      };
      t.addEventListener("mouseenter", fn);
      handlers.push({ el: t, fn });
    });
    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("mouseenter", fn));
    };
  }, [openKey]);

  return <div className="mega-wrap" id="megaWrap" ref={ref} />;
}

export function useMegaMenuController() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function open(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(key);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 180);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }
  function closeNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(null);
  }
  return { openKey, open, scheduleClose, cancelClose, closeNow };
}
