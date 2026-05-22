"use client";
import {
  MENUS,
  type MMShowcase,
  type MMRegular,
  isNewGroup,
  type AnyGroup,
  type LegacyGroup,
} from "@/lib/mega-menu-data";
import { resolveSlots, isGroupEmpty } from "@/lib/mega-menu-resolver";
import type { MegaMenuKhoDeData, TabSlots } from "@/lib/api/mega-menu";
import {
  type ActiveEventsResponse,
  type Event as IStudyEvent,
  pickMegaMenuEvent,
  dayDiffFromEvent,
  relDayPhrase,
  formatEventDate,
  waitingUrlFor,
} from "@/lib/events-data";
import { useEffect, useRef, useState } from "react";

export function renderMegaPanelHTML(
  key: string,
  eventsResponse?: ActiveEventsResponse | null,
  khoDeSlots?: MegaMenuKhoDeData | null,
): string {
  const data = MENUS[key];
  if (!data) return "";
  if (data.kind === "showcase") return renderShowcase(data);
  return renderRegular(data, eventsResponse ?? null, khoDeSlots ?? null, key);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEventCardHTML(ev: IStudyEvent, now: Date): string {
  const diff = dayDiffFromEvent(ev, now);
  const isToday = diff === 0;
  const isSoon = diff > 0 && diff <= 3;
  const url = waitingUrlFor(ev);
  const eyebrow = isToday
    ? "ĐANG DIỄN RA HÔM NAY"
    : isSoon
      ? "SỰ KIỆN SẮP DIỄN RA"
      : "LỊCH SỰ KIỆN";
  const sub = isToday
    ? "Đề sẽ lên hệ thống ngay sau giờ thi. Vào trang đợi để được thông báo trong giây đầu tiên."
    : "Đặt lịch nhắc để không bỏ lỡ. Đề lên ngay sau giờ thi — đáp án trong 2–4 giờ.";
  const cta = isToday ? "Vào trang đợi đề" : "Đăng ký nhắc đề";
  const title = escapeHtml(ev.short || ev.title);
  return `
    <a class="mm-event ${isToday ? "mm-event--today" : ""}" href="${url}">
      <div class="mm-event-stripe"></div>
      <div class="mm-event-eyebrow">
        <span class="mm-event-pulse"></span>
        ${eyebrow}
      </div>
      <div class="mm-event-date">
        <svg class="icon icon-xs" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        ${formatEventDate(ev)}
      </div>
      <div class="mm-event-rel">${relDayPhrase(diff)}</div>
      <div class="mm-event-title">${title}</div>
      <div class="mm-event-sub">${sub}</div>
      <span class="btn btn--primary btn--small mm-event-cta">
        ${cta}
        <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </span>
    </a>`;
}

function deriveGroupKey(
  title: string,
): "chinhThuc" | "thiThu" | "minhHoa" | null {
  const t = title
    .toUpperCase()
    .replace(/Đ/g, "D")
    .replace(/đ/g, "D")
    .replace(/Ơ/g, "O")
    .replace(/ơ/g, "O")
    .replace(/Ô/g, "O")
    .replace(/ô/g, "O")
    .replace(/Á|À|Ả|Ã|Ạ|Ă|Ằ|Ắ|Ẳ|Ẵ|Ặ|Â|Ầ|Ấ|Ẩ|Ẫ|Ậ/g, "A")
    .replace(/Ê|Ề|Ế|Ể|Ễ|Ệ|É|È|Ẻ|Ẽ|Ẹ/g, "E")
    .replace(/Í|Ì|Ỉ|Ĩ|Ị/g, "I")
    .replace(/Ó|Ò|Ỏ|Õ|Ọ|Ồ|Ố|Ổ|Ỗ|Ộ|Ờ|Ớ|Ở|Ỡ|Ợ/g, "O")
    .replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ừ|Ứ|Ử|Ữ|Ự/g, "U")
    .replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, "Y");
  if (t.includes("CHINH THUC")) return "chinhThuc";
  if (t.includes("THI THU")) return "thiThu";
  if (t.includes("MINH HOA")) return "minhHoa";
  return null;
}

function renderGroupHTML(
  group: AnyGroup,
  tabData: TabSlots | null | undefined,
  animationDelay: number,
): string {
  const titleInner =
    isNewGroup(group) && group.href
      ? `<a href="${escapeHtml(group.href)}" class="mm-col-title-link">${escapeHtml(group.title)}</a>`
      : escapeHtml(group.title);

  if (isNewGroup(group)) {
    const groupKey = deriveGroupKey(group.title);
    if (!groupKey) return "";
    const resolved = resolveSlots(group, tabData ?? null, groupKey);
    const hasStatic = group.slots.some((s) => s.kind === "static");
    if (isGroupEmpty(resolved) && !hasStatic) return "";

    const itemsHtml = resolved
      .map((r) => {
        if (r.kind === "placeholder") {
          return `<span class="mm-leaf mm-leaf--placeholder">
              <div class="mm-leaf-name">Chưa có đề</div>
            </span>`;
        }
        const tagHtml = r.tag
          ? `<span class="mm-tag mm-tag--${escapeHtml(r.tag.toLowerCase())}">${escapeHtml(r.tag)}</span>`
          : "";
        const subHtml = r.sub
          ? `<div class="mm-leaf-sub">${escapeHtml(r.sub)}</div>`
          : "";
        return `<a href="${escapeHtml(r.href)}" class="mm-leaf">
              <div class="mm-leaf-name">${escapeHtml(r.name)}${tagHtml}</div>
              ${subHtml}
            </a>`;
      })
      .join("");

    return `<div class="mm-col" style="animation-delay:${animationDelay}ms">
        <div class="mm-col-title">${titleInner}</div>
        ${itemsHtml}
      </div>`;
  }

  // Legacy path — preserve existing behavior exactly
  const legacy = group as LegacyGroup;
  const itemsHtml = legacy.items
    .map((it) => {
      const tagHtml = it.tag
        ? `<span class="mm-tag mm-tag--${it.tag.toLowerCase()}">${it.tag}</span>`
        : "";
      const subHtml = it.sub ? `<div class="mm-leaf-sub">${it.sub}</div>` : "";
      return `<a href="/coming-soon?feature=${encodeURIComponent(it.name)}" class="mm-leaf">
            <div class="mm-leaf-name">
              ${it.name}
              ${tagHtml}
            </div>
            ${subHtml}
          </a>`;
    })
    .join("");
  return `<div class="mm-col" style="animation-delay:${animationDelay}ms">
      <div class="mm-col-title">${legacy.title}</div>
      ${itemsHtml}
    </div>`;
}

function renderRegular(
  data: MMRegular,
  eventsResponse: ActiveEventsResponse | null,
  khoDeSlots: MegaMenuKhoDeData | null,
  menuKey: string,
): string {
  const tabs = data.tabs
    .map((t, i) => {
      const tag = t.comingSoon ? "a" : "div";
      const hrefAttr = t.comingSoon
        ? ` href="/coming-soon?feature=${encodeURIComponent(t.label)}"`
        : "";
      const cls = `mm-tab${i === 0 ? " active" : ""}${t.comingSoon ? " mm-tab--link" : ""}`;
      return `
    <${tag} class="${cls}" data-tab="${t.id}"${hrefAttr}>
      <div class="mm-tab-icon">${t.icon}</div>
      <div class="mm-tab-body">
        <div class="mm-tab-label">${t.label}</div>
        <div class="mm-tab-desc">${t.desc}</div>
      </div>
      <svg class="icon icon-xs mm-tab-arrow" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
    </${tag}>`;
    })
    .join("");

  const now = new Date();
  const panels = data.tabs
    .map((t, i) => {
      const ev = eventsResponse ? pickMegaMenuEvent(eventsResponse, t.id, now) : null;
      const sidebar = ev
        ? renderEventCardHTML(ev, now)
        : `<a class="mm-promo" href="/coming-soon?feature=${encodeURIComponent(data.promo.title)}" style="animation-delay:180ms">
        <div class="mm-promo-eyebrow">istudy +</div>
        <div class="mm-promo-title">${data.promo.title}</div>
        <div class="mm-promo-sub">${data.promo.sub}</div>
        <span class="btn btn--primary btn--small mm-promo-cta">
          ${data.promo.cta}
          <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </span>
      </a>`;
      const tabData: TabSlots | null =
        menuKey === "kho-de" && t.id === "vao-10"
          ? (khoDeSlots?.vao10 ?? null)
          : menuKey === "kho-de" && t.id === "thpt-qg"
            ? (khoDeSlots?.thptQg ?? null)
            : null;

      const groupsHtml = t.groups
        .map((g, gi) => renderGroupHTML(g, tabData, 40 + gi * 40))
        .filter(Boolean)
        .join("");

      return `
    <div class="mm-panel${i === 0 ? " active" : ""}" data-panel="${t.id}">
      <div class="mm-cols">
        ${groupsHtml}
      </div>
      ${sidebar}
    </div>`;
    })
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
            ${data.topics.map((t) => `<a href="/coming-soon?feature=${encodeURIComponent("Chủ đề: " + t)}" class="mm-chip">${t}</a>`).join("")}
          </div>
          <a class="mm-promo" href="/coming-soon?feature=${encodeURIComponent(data.promo.title)}" style="margin-top:16px">
            <div class="mm-promo-eyebrow">istudy +</div>
            <div class="mm-promo-title">${data.promo.title}</div>
            <div class="mm-promo-sub">${data.promo.sub}</div>
            <span class="btn btn--primary btn--small mm-promo-cta">
              ${data.promo.cta}
              <svg class="icon icon-xs" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </a>
        </div>
      </div>
    </div>`;
}

export function MegaMenuWrap({
  openKey,
  eventsResponse,
  khoDeSlots,
}: {
  openKey: string | null;
  eventsResponse?: ActiveEventsResponse | null;
  khoDeSlots?: MegaMenuKhoDeData | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!openKey) {
      ref.current.classList.remove("open");
      return;
    }
    ref.current.innerHTML = renderMegaPanelHTML(
      openKey,
      eventsResponse ?? null,
      khoDeSlots ?? null,
    );
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
  }, [openKey, eventsResponse, khoDeSlots]);

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
