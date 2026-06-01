"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CATS,
  resolveSectionOrder,
  POPULAR_TAGS,
  PROVINCES,
  TRENDING,
  highlight,
  loadRecent,
  pushRecent,
  removeRecent,
  type CatId,
} from "@/lib/search-popup-data";
import {
  fetchSearch,
  fetchSearchMeta,
  fetchDrilldown,
  type SearchResponse,
  type MetaResponse,
  type SearchResultDTO,
  type DrilldownResponse,
} from "@/lib/api/search";
import { useResponsiveCount } from "@/lib/hooks/useResponsiveCount";

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
  back: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 5l-7 7 7 7" /></svg>),
  check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>),
  sortic: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h13M3 12h9M3 18h5" /><path d="m18 9 3-3 3 3M21 6v12" /></svg>),
  chev: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>),
  ext: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3h7v7M21 3l-9 9" /><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /></svg>),
};

function SkeletonRows({ n }: { n: number }) {
  return (
    <div>
      {Array.from({ length: n }).map((_, i) => (
        <div className="spl-skel-row" key={i}>
          <div className="spl-skel thumb" />
          <div className="body">
            <div className="spl-skel l1" style={{ width: `${70 + (i * 7) % 25}%` }} />
            <div className="spl-skel l2" style={{ width: `${35 + (i * 11) % 20}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

const SORTS: Record<"newest" | "oldest", string> = { newest: "Mới nhất", oldest: "Cũ nhất" };

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
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);
  const [meta, setMeta] = useState<MetaResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const dialogId = useId();
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  const [drilldownCat, setDrilldownCat] = useState<CatId | null>(null);
  const [ddYear, setDdYear] = useState("all");
  const [ddAnswer, setDdAnswer] = useState(false);
  const [ddSort, setDdSort] = useState<"newest" | "oldest">("newest");
  const [ddSortOpen, setDdSortOpen] = useState(false);
  const [ddItems, setDdItems] = useState<SearchResultDTO[]>([]);
  const [ddTotal, setDdTotal] = useState(0);
  const [ddHasMore, setDdHasMore] = useState(false);
  const [ddYears, setDdYears] = useState<{ year: string; count: number }[]>([]);
  const [ddLoading, setDdLoading] = useState(false);
  const [ddError, setDdError] = useState(false);
  const [ddNonce, setDdNonce] = useState(0);
  const ddAbortRef = useRef<AbortController | null>(null);
  const ddSentinelRef = useRef<HTMLDivElement>(null);

  const q = query.trim();
  const totalMatches = results
    ? results.thpt.length + results.l10.length + results.hsa.length + results.blog.length
    : 0;
  const counts = results
    ? {
        all: results.counts
          ? results.counts.thpt + results.counts.l10 + results.counts.hsa + results.counts.blog
          : totalMatches,
        thpt: results.counts?.thpt ?? results.thpt.length,
        l10: results.counts?.l10 ?? results.l10.length,
        hsa: results.counts?.hsa ?? results.hsa.length,
        blog: results.counts?.blog ?? results.blog.length,
      }
    : null;
  const branch: "initial" | "loading" | "results" | "empty" = !q
    ? "initial"
    : loading || !results
    ? "loading"
    : totalMatches === 0
    ? "empty"
    : "results";

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  useEffect(() => {
    let alive = true;
    fetchSearchMeta()
      .then((m) => { if (alive) setMeta(m); })
      .catch(() => { if (alive) setMeta(null); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      abortRef.current?.abort();
      setResults(null);
      setLoading(false);
      setError(null);
      return;
    }
    const timer = window.setTimeout(() => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      setLoading(true);
      setError(null);
      fetchSearch(trimmed, ac.signal)
        .then((r) => {
          if (ac.signal.aborted) return;
          setResults(r);
          setLoading(false);
        })
        .catch((e) => {
          if (e?.name === 'AbortError' || ac.signal.aborted) return;
          setError('Không tải được kết quả. Thử lại.');
          setLoading(false);
        });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query, retryNonce]);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      if (open) onClose();
    }
  }, [pathname, open, onClose]);

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

  // Global keyboard shortcuts (always-on, even when closed)
  useEffect(() => {
    function onShortcut(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (open) onClose();
        else onOpen();
        return;
      }
      if (e.key === "/" && !isMod && !open) {
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return;
        e.preventDefault();
        onOpen();
      }
    }
    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, [open, onOpen, onClose]);

  // Open-scope key handler: ESC, arrows, Enter
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        if (ddSortOpen) { setDdSortOpen(false); return; }
        if (drilldownCat) { setDrilldownCat(null); return; }
        onClose();
        return;
      }
      const items = Array.from(document.querySelectorAll<HTMLElement>(".spl-item"));
      if (!items.length) return;
      const cur = items.findIndex((it) => it.classList.contains("focused"));
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = cur < 0 ? 0 : Math.min(items.length - 1, cur + 1);
        items.forEach((it, i) => it.classList.toggle("focused", i === next));
        items[next].scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = cur <= 0 ? items.length - 1 : cur - 1;
        items.forEach((it, i) => it.classList.toggle("focused", i === next));
        items[next].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        const target = cur >= 0 ? items[cur] : items[0];
        if (target) {
          pushRecent(q);
          e.preventDefault();
          const href = target.getAttribute("href");
          if (href) window.location.href = href;
        }
      }
    }
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, onClose, q, ddSortOpen, drilldownCat]);

  // Hero .search-bar hijack
  useEffect(() => {
    const ac = new AbortController();
    const opts = { signal: ac.signal };

    function wireSearchBars() {
      document.querySelectorAll<HTMLElement>(".search-bar").forEach((bar) => {
        if (bar.tagName === "FORM") {
          bar.addEventListener(
            "submit",
            (e) => {
              e.preventDefault();
              onOpen();
            },
            opts,
          );
        }
        bar.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            onOpen();
          },
          opts,
        );
        const input = bar.querySelector("input");
        if (input) {
          input.addEventListener(
            "mousedown",
            (e) => {
              e.preventDefault();
              onOpen();
            },
            opts,
          );
          input.addEventListener(
            "focus",
            () => {
              if (open) return;
              input.blur();
              onOpen();
            },
            opts,
          );
          input.setAttribute("readonly", "");
          (input as HTMLElement).style.cursor = "pointer";
        }
      });
    }
    wireSearchBars();
    const t = window.setTimeout(wireSearchBars, 100);
    return () => {
      ac.abort();
      window.clearTimeout(t);
    };
  }, [open, onOpen, pathname]);

  const handleRemoveRecent = useCallback((q: string) => {
    setRecent(removeRecent(q));
  }, []);

  const handlePickQuery = useCallback((q: string) => {
    setQuery(q);
    setActiveCat("all");
    setDrilldownCat(null);
  }, []);

  const handleScrimClick = useCallback(() => onClose(), [onClose]);

  const openDrilldown = useCallback((cat: CatId) => {
    setDrilldownCat(cat);
    setDdYear("all"); setDdAnswer(false); setDdSort("newest"); setDdSortOpen(false);
    setDdItems([]); setDdTotal(0); setDdHasMore(false); setDdYears([]);
  }, []);

  useEffect(() => {
    if (!drilldownCat) return;
    ddAbortRef.current?.abort();
    const ac = new AbortController(); ddAbortRef.current = ac;
    const isExam = drilldownCat === "thpt" || drilldownCat === "l10";
    setDdLoading(true); setDdError(false);
    fetchDrilldown(
      { cat: drilldownCat, q, year: isExam ? ddYear : undefined, hasAnswer: isExam ? ddAnswer : undefined, sort: ddSort, offset: 0, limit: 20, facets: isExam && ddYears.length === 0 },
      ac.signal,
    ).then((r) => {
      if (ac.signal.aborted) return;
      setDdItems(r.items); setDdTotal(r.total); setDdHasMore(r.hasMore);
      if (r.facets) setDdYears(r.facets.years);
      setDdLoading(false);
    }).catch((e) => {
      if (e?.name === "AbortError" || ac.signal.aborted) return;
      setDdError(true); setDdLoading(false);
    });
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drilldownCat, ddYear, ddAnswer, ddSort, q, ddNonce]);

  const loadMore = useCallback(() => {
    if (!drilldownCat || ddLoading || !ddHasMore) return;
    const cat = drilldownCat;
    const isExam = cat === "thpt" || cat === "l10";
    ddAbortRef.current?.abort();
    const ac = new AbortController(); ddAbortRef.current = ac;
    setDdLoading(true);
    fetchDrilldown(
      { cat, q, year: isExam ? ddYear : undefined, hasAnswer: isExam ? ddAnswer : undefined, sort: ddSort, offset: ddItems.length, limit: 20 },
      ac.signal,
    ).then((r) => {
      if (ac.signal.aborted) return;
      setDdItems((prev) => [...prev, ...r.items]); setDdHasMore(r.hasMore); setDdLoading(false);
    }).catch((e) => { if (e?.name !== "AbortError" && !ac.signal.aborted) { setDdError(true); setDdLoading(false); } });
  }, [drilldownCat, ddLoading, ddHasMore, ddItems.length, q, ddYear, ddAnswer, ddSort]);

  useEffect(() => {
    const el = ddSentinelRef.current;
    if (!el || !drilldownCat) return;
    const io = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) loadMore(); }, { root: null, rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, [drilldownCat, loadMore]);

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
              setDrilldownCat(null);
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
                setDrilldownCat(null);
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
          onClick={() => { setActiveCat("all"); setDrilldownCat(null); }}
        >
          Tất cả
          {counts && <span className="cnt">{counts.all}</span>}
        </button>
        {CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`spl-chip${activeCat === c.id ? ` active cat-${c.id}` : ""}`}
            onClick={() => { setActiveCat(c.id); setDrilldownCat(null); }}
          >
            {CAT_ICON[c.id]}
            {c.label}
            {counts && <span className="cnt">{counts[c.id]}</span>}
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
      {meta?.featured && (
        <div>
          <div className="spl-side-h">{I.star} Đề nổi bật</div>
          <Link className="spl-feat" href={meta.featured.href}>
            <div className="spl-feat-thumb">
              {meta.featured.thumbLines.map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="spl-feat-body">
              <div className="spl-feat-title">{meta.featured.title}</div>
              <div className="spl-feat-meta">{meta.featured.metaText}</div>
            </div>
          </Link>
        </div>
      )}
      <div>
        <div className="spl-side-h">{I.trend} Trending</div>
        <div className="spl-trend">
          {(meta?.trending ?? TRENDING).slice(0, 3).map((t) => (
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

  const tagSource = meta?.popularTags ?? POPULAR_TAGS;
  const provSource = meta?.provinces ?? PROVINCES;
  const tagCap = meta ? tagSource.length : 3;
  const provCap = meta ? provSource.length : 3;
  const nTags = useResponsiveCount(tagCap);
  const nProv = useResponsiveCount(provCap);

  const renderInitial = () => (
    <div className="spl-main">
      <div className="spl-pickers">
        <div>
          <div className="spl-pick-h">{I.tag} Tag phổ biến</div>
          <div className="spl-tag-row">
            {tagSource.slice(0, nTags).map((t) => (
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
            {provSource.slice(0, nProv).map((p) => (
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
          {recent.slice(0, 3).map((r) => (
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

  const renderDrilldown = () => {
    const cat = drilldownCat!;
    const c = CATS.find((x) => x.id === cat)!;
    const isExam = cat === "thpt" || cat === "l10";
    const crumbTotal = results?.counts?.[cat] ?? ddTotal;

    let body: React.ReactNode;
    if (ddError) {
      body = (<div className="spl-dd-fempty">Không tải được kết quả. <span className="reset" onClick={() => setDdNonce((n) => n + 1)}>Thử lại</span></div>);
    } else if (!ddLoading && ddItems.length === 0) {
      body = (
        <div className="spl-dd-fempty">
          Không có kết quả khớp bộ lọc hiện tại.
          {(ddYear !== "all" || ddAnswer) && (<><br /><span className="reset" onClick={() => { setDdYear("all"); setDdAnswer(false); }}>Bỏ bộ lọc</span></>)}
        </div>
      );
    } else {
      let lastYear = ""; let focusedAssigned = false;
      body = ddItems.map((r) => {
        const showTag = isExam && !!r.year && r.year !== lastYear;
        if (showTag) lastYear = r.year!;
        const fc = !focusedAssigned; focusedAssigned = true;
        return (
          <Fragment key={r.id}>
            {showTag && (<div className="spl-dd-yeartag">Kỳ thi {r.year} <span className="ln" /></div>)}
            {renderItem(r, fc)}
          </Fragment>
        );
      });
    }

    const ctaHref =
      cat === "thpt" ? `/kho-de-thi?cat=vao-dai-hoc&q=${encodeURIComponent(q)}`
      : cat === "l10" ? `/kho-de-thi?cat=vao-10&q=${encodeURIComponent(q)}`
      : cat === "blog" ? `/bai-viet?q=${encodeURIComponent(q)}`
      : `/kho-de-thi?q=${encodeURIComponent(q)}`;

    return (
      <div className="spl-dd" onClick={(e) => { if (ddSortOpen && !(e.target as HTMLElement).closest(".spl-dd-sort")) setDdSortOpen(false); }}>
        <div className="spl-dd-backbar">
          <button type="button" className="spl-dd-back" onClick={() => { setDrilldownCat(null); setDdSortOpen(false); }}>
            {I.back} Tất cả kết quả
          </button>
          <div className="spl-dd-crumb">
            <span className={`ic-wrap t-${cat}`}>{CAT_ICON[cat]}</span>
            <div className="spl-dd-crumb-text">
              <div className="spl-dd-crumb-title">{c.label}</div>
              <div className="spl-dd-crumb-sub">{crumbTotal} kết quả cho <b>&ldquo;{q}&rdquo;</b></div>
            </div>
          </div>
          {cat !== "hsa" && (<a className="spl-dd-openpage" href={ctaHref}>Mở trên trang {I.ext}</a>)}
        </div>

        <div className="spl-dd-toolbar">
          <div className="spl-dd-filters">
            {isExam && (
              <>
                <button type="button" className={`spl-fchip${ddYear === "all" ? " active" : ""}`} onClick={() => setDdYear("all")}>Tất cả năm</button>
                {ddYears.map((y) => (
                  <button key={y.year} type="button" className={`spl-fchip${ddYear === y.year ? " active" : ""}`} onClick={() => setDdYear(y.year)}>{y.year}</button>
                ))}
                <button type="button" className={`spl-fchip${ddAnswer ? " active" : ""}`} onClick={() => setDdAnswer((v) => !v)}>{I.check} Có đáp án</button>
              </>
            )}
          </div>
          <div className={`spl-dd-sort${ddSortOpen ? " open" : ""}`}>
            <span>Sắp xếp</span>
            <button type="button" className="spl-dd-sortbtn" aria-haspopup="menu" aria-expanded={ddSortOpen} onClick={(e) => { e.stopPropagation(); setDdSortOpen((v) => !v); }}>
              <span className="lead">{I.sortic}</span> {SORTS[ddSort]} <span className="chev">{I.chev}</span>
            </button>
            <div className="spl-dd-menu" role="menu">
              {(Object.keys(SORTS) as ("newest" | "oldest")[]).map((k) => (
                <button key={k} type="button" role="menuitem" className={ddSort === k ? "sel" : ""} onClick={() => { setDdSort(k); setDdSortOpen(false); }}>
                  <span className="tick">{I.check}</span>{SORTS[k]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="spl-dd-listwrap">
          <div className="spl-dd-list">
            {body}
            {ddLoading && (<div className="spl-loading-status"><span className="spl-spinner" /> Đang tải…</div>)}
            <div ref={ddSentinelRef} aria-hidden style={{ height: 1 }} />
          </div>
        </div>

        <div className="spl-dd-cta-row">
          <span className="spl-dd-cta-note">Muốn lọc sâu hơn (tỉnh, độ khó, dạng câu)? <b>Mở Kho đề thi</b></span>
          <a className="spl-dd-cta" href={ctaHref}>Xem tất cả trên Kho đề thi {I.arrow}</a>
        </div>
      </div>
    );
  };

  const renderItem = (r: SearchResultDTO, focused: boolean) => {
    const catLabel = CATS.find((cat) => cat.id === r.cat)!.label.replace("Đề ", "");
    return (
      <a key={r.id} className={`spl-item${focused ? " focused" : ""}`} href={r.href} data-result-id={r.id} onClick={() => pushRecent(q)}>
        <div className={`spl-thumb t-${r.cat}`}>{CAT_ICON[r.cat]}</div>
        <div className="spl-item-body">
          <div className="spl-item-title" dangerouslySetInnerHTML={{ __html: highlight(r.title, q) }} />
          <div className="spl-item-meta">
            <span className={`badge-sm b-${r.cat}`}>{catLabel}</span>
            {r.meta.map((m, i) => (<span key={i}><span className="dot" /><span>{m}</span></span>))}
          </div>
        </div>
        <span className="spl-item-arrow">{I.arrow}</span>
      </a>
    );
  };

  const renderResults = () => {
    const all = results
      ? [...results.thpt, ...results.l10, ...results.hsa, ...results.blog]
      : [];
    const filtered = activeCat === "all" ? all : all.filter((r) => r.cat === activeCat);
    const grouped: Record<CatId, typeof all> = { thpt: [], l10: [], hsa: [], blog: [] };
    filtered.forEach((r) => grouped[r.cat].push(r));
    let focusedAssigned = false;

    const sections = resolveSectionOrder(results?.order).filter((c) => grouped[c.id].length).map((c) => {
      const items = grouped[c.id].slice(0, 3).map((r) => {
        const fc = !focusedAssigned;
        focusedAssigned = true;
        return renderItem(r, fc);
      });
      const total = results?.counts?.[c.id] ?? grouped[c.id].length;
      const more = total > 3 ? (
        <button type="button" className="spl-sect-more" onClick={() => openDrilldown(c.id)}>
          Xem thêm {total - 3} kết quả {I.arrow}
        </button>
      ) : null;
      return (
        <div key={c.id} className="spl-sect">
          <div className="spl-sect-head">
            <span className="spl-sect-title">
              <span className={`ic-wrap t-${c.id}`}>{CAT_ICON[c.id]}</span>
              {c.label} <span className="pill">{total}</span>
            </span>
            {more}
          </div>
          <div className="spl-list">{items}</div>
        </div>
      );
    });

    return <div className="spl-main">{sections}</div>;
  };

  const renderEmpty = () => (
    <div className="spl-main">
      <div className="spl-empty">
        <svg className="spl-empty-art" viewBox="0 0 160 160" fill="none">
          <rect x="34" y="36" width="74" height="92" rx="8" fill="#fff" stroke="#1A1A1A" strokeWidth="2" />
          <path d="M44 56h54M44 70h44M44 84h36" stroke="#D4D4D4" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="98" r="26" fill="#FFF0F1" stroke="#E8192C" strokeWidth="4" />
          <path d="m120 118 16 16" stroke="#E8192C" strokeWidth="6" strokeLinecap="round" />
          <circle cx="92" cy="94" r="2.4" fill="#1A1A1A" />
          <circle cx="108" cy="94" r="2.4" fill="#1A1A1A" />
          <path d="M93 108c2-3 5-4 7-4s5 1 7 4" stroke="#1A1A1A" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M28 22 30 28 36 30 30 32 28 38 26 32 20 30 26 28z" fill="#EAB308" />
          <path d="M138 30 139.4 34 143 35.4 139.4 36.8 138 41 136.6 36.8 133 35.4 136.6 34z" fill="#D97706" />
          <circle cx="22" cy="98" r="3" fill="#FECACA" />
          <circle cx="142" cy="68" r="2.5" fill="#DBEAFE" />
        </svg>
        <h3>
          Hổng có gì trùng với &ldquo;<b>{q}</b>&rdquo;
        </h3>
        <p>
          istudy tập trung Tiếng Anh THPT, vào 10 &amp; HSA. Bạn thử gợi ý bên dưới hoặc hỏi <b>istudy AI</b> nhé!
        </p>
        <div className="spl-empty-tags">
          {(() => {
            const src = meta?.popularTags ?? POPULAR_TAGS;
            const suggested = [...src.filter((t) => t.hot), ...src.filter((t) => !t.hot)].slice(0, 3);
            return suggested.map((t) => (
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
            ));
          })()}
        </div>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="spl-main">
      <SkeletonRows n={3} />
    </div>
  );

  const renderError = () => (
    <div className="spl-main">
      <div className="spl-empty">
        <h3>Không tải được kết quả</h3>
        <p>{error}</p>
        <div className="spl-empty-tags">
          <button
            type="button"
            className="spl-tag"
            onClick={() => {
              setError(null);
              setRetryNonce((n) => n + 1);
            }}
          >
            Thử lại
          </button>
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

  const node = (
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
          {drilldownCat ? (
            renderDrilldown()
          ) : (
            <>
              {renderChips()}
              <div className="spl-layout">
                {error ? renderError() : (
                  <>
                    {branch === "initial" && renderInitial()}
                    {branch === "loading" && renderLoading()}
                    {branch === "results" && renderResults()}
                    {branch === "empty" && renderEmpty()}
                  </>
                )}
                {renderSideRail()}
              </div>
            </>
          )}
          {renderFoot()}
        </div>
      </div>
    </div>
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const portalTarget = mounted ? document.body : null;
  return portalTarget ? createPortal(node, portalTarget) : null;
}
