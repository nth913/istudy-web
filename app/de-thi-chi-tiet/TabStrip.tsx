"use client";

/**
 * Client island for the exam-detail tab strip.
 * Ports `de-thi-render.js:484-513` interactivity:
 *   - Jump menu (Chọn mã đề) with searchable grid of all codes
 *   - Wheel-to-horizontal scroll on the tab track
 *   - Prev/next buttons smooth-scroll ±200px
 *
 * Tabs themselves remain `<Link>`s so URL `?ma=` drives active state via SSR.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ExamCode } from "@/lib/render/de-thi";

export default function TabStrip({
  codes,
  activeCode,
}: {
  codes: ExamCode[];
  activeCode?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const jumpWrapRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [jumpOpen, setJumpOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Wheel-to-horizontal scroll on the tab track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onWheel = (ev: WheelEvent) => {
      if (ev.deltaY === 0) return;
      if (track.scrollWidth <= track.clientWidth) return;
      ev.preventDefault();
      track.scrollLeft += ev.deltaY;
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  // Click-outside to close jump menu.
  useEffect(() => {
    if (!jumpOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!jumpWrapRef.current) return;
      if (!jumpWrapRef.current.contains(e.target as Node)) {
        setJumpOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [jumpOpen]);

  // Auto-focus search when opening.
  useEffect(() => {
    if (jumpOpen) {
      setQuery("");
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [jumpOpen]);

  // Scroll active tab into view on mount/active change.
  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    if (!list || !track) return;
    requestAnimationFrame(() => {
      const activeEl = list.querySelector(".tab-pill.is-active") as HTMLElement | null;
      if (!activeEl) return;
      const trackR = track.getBoundingClientRect();
      const elR = activeEl.getBoundingClientRect();
      if (elR.left < trackR.left + 20 || elR.right > trackR.right - 20) {
        track.scrollLeft += elR.left - trackR.left - 80;
      }
    });
  }, [activeCode]);

  const scrollBy = useCallback((dx: number) => {
    trackRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  }, []);

  const scrollTabIntoView = useCallback((code: string) => {
    const list = listRef.current;
    const track = trackRef.current;
    if (!list || !track) return;
    const target = list.querySelector(`[data-ma="${code}"]`) as HTMLElement | null;
    if (!target) return;
    const trackR = track.getBoundingClientRect();
    const elR = target.getBoundingClientRect();
    track.scrollTo({
      left: track.scrollLeft + (elR.left - trackR.left) - track.clientWidth / 2 + elR.width / 2,
      behavior: "smooth",
    });
  }, []);

  const filtered = query.trim()
    ? codes.filter((c) => c.code.includes(query.trim()))
    : codes;

  return (
    <div className="tabs-bar">
      <div className="tabs-head">
        <div className="tabs-jump" ref={jumpWrapRef} style={{ position: "relative" }}>
          <button
            type="button"
            className="tabs-jump-btn"
            aria-label="Mở danh sách mã đề"
            aria-expanded={jumpOpen}
            onClick={(e) => {
              e.stopPropagation();
              setJumpOpen((v) => !v);
            }}
          >
            Chọn mã đề
            <svg
              className="icon icon-xs"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {jumpOpen && (
            <div
              className="tabs-jump-menu open"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: "calc(100% + 6px)",
                zIndex: 20,
                background: "#fff",
                border: "1px solid var(--g200)",
                borderRadius: 10,
                boxShadow: "0 10px 30px rgba(17,17,17,0.10)",
                padding: 8,
                minWidth: 240,
                maxHeight: 280,
                overflowY: "auto",
              }}
            >
              <input
                ref={searchRef}
                type="text"
                className="tjm-search"
                placeholder="Tìm mã đề..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  borderRadius: 7,
                  border: "1px solid var(--g200)",
                  fontSize: 13,
                  marginBottom: 6,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <div
                className="tjm-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 4,
                }}
              >
                {filtered.map((c) => {
                  const isActive = c.code === activeCode;
                  const bg =
                    isActive
                      ? "var(--dark)"
                      : c.status === "ready"
                        ? "#F0FDF4"
                        : "#FFF8EC";
                  const color = isActive
                    ? "#fff"
                    : c.status === "ready"
                      ? "var(--green)"
                      : "#8A5410";
                  const dotBg =
                    c.status === "ready" ? "var(--green)" : "#D97706";
                  return (
                    <Link
                      key={c.code}
                      href={`/de-thi-chi-tiet?ma=${c.code}`}
                      className={`tjm-item is-${c.status}${isActive ? " is-active" : ""}`}
                      onClick={() => {
                        scrollTabIntoView(c.code);
                        setJumpOpen(false);
                      }}
                      style={{
                        padding: "7px 4px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        textAlign: "center",
                        cursor: "pointer",
                        background: bg,
                        color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3,
                        textDecoration: "none",
                      }}
                    >
                      <span
                        className="tjm-d"
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: isActive ? "#fff" : dotBg,
                          flexShrink: 0,
                        }}
                      />
                      {c.code}
                    </Link>
                  );
                })}
                {filtered.length === 0 && (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      fontSize: 12,
                      color: "var(--g500)",
                      padding: "8px 4px",
                    }}
                  >
                    Không tìm thấy mã đề.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tabs-scroll">
        <button
          type="button"
          className="tabs-nav"
          aria-label="Cuộn trái"
          onClick={() => scrollBy(-200)}
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="tabs-scroll-track" ref={trackRef}>
          <div className="tabs-scroll-list" ref={listRef}>
            {codes.map((c) => {
              const isActive = c.code === activeCode;
              const cls = [
                "tab-pill",
                `is-${c.status}`,
                isActive ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <Link
                  key={c.code}
                  data-ma={c.code}
                  href={`/de-thi-chi-tiet?ma=${c.code}`}
                  className={cls}
                >
                  <span className="tp-dot" />
                  {c.code}
                  {c.isNew && <span className="tp-new">mới</span>}
                </Link>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className="tabs-nav"
          aria-label="Cuộn phải"
          onClick={() => scrollBy(200)}
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
