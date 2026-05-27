"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  CATS,
  POPULAR_TAGS,
  PROVINCES,
  TRENDING,
  loadRecent,
  removeRecent,
  type CatId,
} from "@/lib/search-popup-data";

export interface SearchPopupProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const I = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12 12 4H4v8l8 8 8-8z" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 14.6 8.6 22 9.3l-5.6 4.8L18 21l-6-3.6L6 21l1.6-6.9L2 9.3l7.4-.7z" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 13.8 9.2 21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8z" />
    </svg>
  ),
  up: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 15 7-7 7 7" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" />
      <path d="M4 17a3 3 0 0 1 3-3h11" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 10-10-5L2 10l10 5 10-5z" />
      <path d="M6 12v5c2 1.5 4 2 6 2s4-.5 6-2v-5" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3 21 7l-13 13H4v-4z" />
      <path d="m14 6 4 4" />
    </svg>
  ),
  note: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h11l3 3v13H5z" />
      <path d="M9 11h7M9 15h5" />
    </svg>
  ),
};

const CAT_ICON: Record<CatId, React.JSX.Element> = {
  thpt: I.cap,
  l10: I.book,
  hsa: I.pencil,
  blog: I.note,
};

export default function SearchPopup({ open, onOpen, onClose }: SearchPopupProps) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<"all" | CatId>("all");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  useEffect(() => {
    if (!open) return;

    const header = document.querySelector("header.header") as HTMLElement | null;
    const setOffset = () => {
      if (!header) return;
      const r = header.getBoundingClientRect();
      document.documentElement.style.setProperty("--spl-offset", `${r.height}px`);
      document.documentElement.style.setProperty("--spl-offset-mobile", `${r.height}px`);
    };
    setOffset();
    window.addEventListener("resize", setOffset);

    document.body.classList.add("spl-locked");

    const t = window.setTimeout(() => inputRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("resize", setOffset);
      document.body.classList.remove("spl-locked");
      window.clearTimeout(t);
    };
  }, [open]);

  const handleRemoveRecent = useCallback((q: string) => {
    setRecent(removeRecent(q));
  }, []);

  const handlePickQuery = useCallback((q: string) => {
    setQuery(q);
    setActiveCat("all");
  }, []);

  const handleScrimClick = useCallback(() => onClose(), [onClose]);

  const renderInput = () => {
    const hasVal = query.length > 0;
    return (
      <div className="spl-input-row">
        <div className={`spl-input-wrap focus${hasVal ? " has-value" : ""}`}>
          <span className="spl-ic-search">{I.search}</span>
          <input
            ref={inputRef}
            type="text"
            id={`splInput-${dialogId}`}
            autoComplete="off"
            spellCheck={false}
            placeholder="Tìm theo tiêu đề, tag, tỉnh thành..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveCat("all");
            }}
          />
          {hasVal && (
            <button
              type="button"
              className="spl-clear"
              aria-label="Xoá"
              onClick={() => {
                setQuery("");
                setActiveCat("all");
                inputRef.current?.focus();
              }}
            >
              {I.x}
            </button>
          )}
          <span className="spl-kbd">ESC</span>
        </div>
        <button type="button" className="spl-close" aria-label="Đóng" onClick={onClose}>
          {I.close}
        </button>
      </div>
    );
  };

  const renderChips = () => {
    return (
      <div className="spl-chips">
        <span className="lbl">Lọc nhanh</span>
        <button
          type="button"
          className={`spl-chip${activeCat === "all" ? " active" : ""}`}
          onClick={() => setActiveCat("all")}
        >
          Tất cả
        </button>
        {CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`spl-chip${activeCat === c.id ? ` active cat-${c.id}` : ""}`}
            onClick={() => setActiveCat(c.id)}
          >
            {CAT_ICON[c.id]}
            {c.label}
          </button>
        ))}
      </div>
    );
  };

  const renderSideRail = () => (
    <aside className="spl-side">
      <div className="spl-ai">
        <div className="spl-ai-eyebrow">
          <span className="spark">★</span> istudy AI
        </div>
        <div className="spl-ai-q">
          Không thấy đề? <span className="q-mark">Hỏi AI mô tả đề bạn cần.</span>
        </div>
        <button type="button" className="spl-ai-btn">
          {I.spark} Hỏi istudy AI
        </button>
      </div>
      <div>
        <div className="spl-side-h">{I.star} Đề nổi bật</div>
        <Link className="spl-feat" href="/kho-de-thi">
          <div className="spl-feat-thumb">THPT<br />2025</div>
          <div className="spl-feat-body">
            <div className="spl-feat-title">Đề tham khảo THPT 2025 — Bộ GD&amp;T</div>
            <div className="spl-feat-meta">50 câu · 12.4k lượt</div>
          </div>
        </Link>
      </div>
      <div>
        <div className="spl-side-h">{I.trend} Trending</div>
        <div className="spl-trend">
          {TRENDING.slice(0, 3).map((t) => (
            <button
              key={t.rank}
              type="button"
              className={`spl-trend-row r${t.rank}`}
              onClick={() => handlePickQuery(t.label)}
            >
              <span className="rank">{String(t.rank).padStart(2, "0")}</span>
              <span className="label">{t.label}</span>
              {t.delta && (
                <span className="arrow">
                  {I.up} {t.delta}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );

  const renderInitial = () => (
    <div className="spl-main">
      <div className="spl-pickers">
        <div>
          <div className="spl-pick-h">{I.tag} Tag phổ biến</div>
          <div className="spl-tag-row">
            {POPULAR_TAGS.slice(0, 5).map((t) => (
              <button
                key={t.id}
                type="button"
                className={`spl-tag${t.hot ? " hot" : ""}`}
                onClick={() => handlePickQuery(t.label)}
              >
                <span className="dot" />
                {t.label}
                {t.hot && <span className="ttag">HOT</span>}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="spl-pick-h">{I.pin} Tỉnh / Thành phố</div>
          <div className="spl-tag-row">
            {PROVINCES.slice(0, 5).map((p) => (
              <button
                key={p}
                type="button"
                className="spl-tag"
                onClick={() => handlePickQuery(p)}
              >
                <span className="pin">{I.pin}</span>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      {recent.length > 0 && (
        <div className="spl-recent-row">
          <span className="lbl">Gần đây</span>
          {recent.slice(0, 4).map((r) => (
            <span
              key={r}
              className="spl-recent-pill"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("[data-remove]")) return;
                handlePickQuery(r);
              }}
            >
              {I.clock} {r}
              <span
                className="x"
                data-remove={r}
                title="Xoá"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveRecent(r);
                }}
              >
                {I.x}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const renderDevNotice = () => (
    <div className="spl-dev-notice" role="status" aria-live="polite">
      <div className="spl-dev-card">
        <svg className="spl-dev-ic" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="var(--red-light)" />
          <path
            d="M19 19l-4-4a6 6 0 1 1 8.485-8.485l-2.121 2.122a3 3 0 1 0 4.242 4.242L27.728 10.6 32 14.872l-2.122 2.121a3 3 0 1 0 4.243 4.243l2.121-2.122A6 6 0 1 1 27.757 29.6L24 25.843"
            stroke="var(--red)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="14"
            y="22"
            width="20"
            height="6"
            rx="3"
            transform="rotate(45 24 25)"
            fill="#fff"
            stroke="var(--red)"
            strokeWidth="2.4"
          />
          <path d="M38 8l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#EAB308" />
          <path d="M10 36l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" fill="#EAB308" />
          <circle cx="40" cy="34" r="1.5" fill="#FECACA" />
          <circle cx="8" cy="14" r="1.2" fill="#DBEAFE" />
        </svg>
        <span className="spl-dev-tag">Đang phát triển</span>
        <h3 className="spl-dev-title">Tìm kiếm đang được hoàn thiện</h3>
        <p className="spl-dev-sub">
          Đội ngũ istudy đang lập chỉ mục toàn bộ kho đề Tiếng Anh — THPT, Vào 10 &amp; HSA. Quay lại sớm thôi nhé!
        </p>
        <div className="spl-dev-actions">
          <Link className="spl-dev-cta" href="/kho-de-thi">
            Vào Kho đề thi <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderFoot = () => (
    <div className="spl-foot">
      <div className="spl-foot-kbds">
        <span className="grp"><span className="spl-kbd">↑</span><span className="spl-kbd">↓</span> di chuyển</span>
        <span className="grp"><span className="spl-kbd">↵</span> chọn</span>
        <span className="grp"><span className="spl-kbd">ESC</span> đóng</span>
      </div>
      <div className="spl-foot-right">
        Tìm kiếm bởi
        <img className="istudy-mark" src="/logo/istudy-lite-64.png" alt="" />
        <b style={{ color: "var(--red)" }}>istudy</b>
      </div>
    </div>
  );

  return (
    <div
      ref={overlayRef}
      className={`spl-overlay${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Tìm kiếm istudy"
    >
      <div className="spl-scrim" onClick={handleScrimClick} />
      <div className="spl-popup">
        <div className="spl-inner">
          {renderInput()}
          {renderChips()}
          <div className="spl-layout">
            {renderInitial()}
            {renderSideRail()}
            {renderDevNotice()}
          </div>
          {renderFoot()}
        </div>
      </div>
    </div>
  );
}
