"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  IconEye,
  IconCal,
  IconBook,
  IconClock,
  IconDownload,
} from "@/components/Icons";
import { KHO_DE_THI_CSS } from "@/lib/page-css/kho-de-thi";

const BADGE_LABEL: Record<string, string> = {
  hot: "🔥 Hot",
  official: "📋 Chính thức",
  new: "✨ Mới",
  popular: "⭐ Phổ biến",
};

type BadgeKey = keyof typeof BADGE_LABEL;

type ExamKind = "vao-10" | "thpt-qg" | "ielts" | "toeic" | "hsg";

type Exam = {
  slug: string;
  title: string;
  badge: BadgeKey;
  year: string;
  province: string;
  kind: ExamKind;
  q: number;
  t: string;
  views: string;
  date: string;
  online: boolean;
};

const exams: Exam[] = [
  {
    slug: "vao-10-tphcm-2026",
    title: "Đề tham khảo tuyển sinh vào lớp 10 THPT TP.HCM 2026 — Môn Tiếng Anh",
    badge: "hot",
    year: "2026",
    province: "TP.HCM",
    kind: "vao-10",
    q: 40,
    t: "90 phút",
    views: "28.3K",
    date: "10/05/2026",
    online: true,
  },
  {
    slug: "vao-10-ha-noi-2026",
    title: "Đề thi thử tiếng Anh vào lớp 10 Hà Nội 2026 — Đề số 15",
    badge: "new",
    year: "2026",
    province: "Hà Nội",
    kind: "vao-10",
    q: 40,
    t: "60 phút",
    views: "12.5K",
    date: "08/05/2026",
    online: true,
  },
  {
    slug: "vao-10-da-nang-2026",
    title: "Đề thi thử tiếng Anh vào lớp 10 Đà Nẵng 2026 — Đề số 3",
    badge: "popular",
    year: "2026",
    province: "Đà Nẵng",
    kind: "vao-10",
    q: 40,
    t: "60 phút",
    views: "3.1K",
    date: "28/04/2026",
    online: false,
  },
  {
    slug: "de-minh-hoa-bgd-2026",
    title: "Đề minh hoạ Bộ GD&ĐT 2026 — Môn Tiếng Anh",
    badge: "official",
    year: "2026",
    province: "",
    kind: "thpt-qg",
    q: 40,
    t: "60 phút",
    views: "31.2K",
    date: "05/04/2026",
    online: true,
  },
  {
    slug: "de-thu-chuyen-anh-2026",
    title: "Đề thử chuyên Anh 2026 — Trường THPT Chuyên Ngoại ngữ",
    badge: "new",
    year: "2026",
    province: "Hà Nội",
    kind: "vao-10",
    q: 50,
    t: "120 phút",
    views: "4.8K",
    date: "02/04/2026",
    online: false,
  },
  {
    slug: "thpt-qg-2025-401",
    title: "Đề thi thật THPT QG 2025 — Môn Tiếng Anh, Mã đề 401",
    badge: "official",
    year: "2025",
    province: "",
    kind: "thpt-qg",
    q: 50,
    t: "60 phút",
    views: "38.1K",
    date: "28/06/2025",
    online: true,
  },
  {
    slug: "thpt-qg-2025-chuyen-an-2026",
    title: "Đề thi thử THPT QG 2025 — Trường THPT Chu Văn An, Hà Nội",
    badge: "popular",
    year: "2025",
    province: "Hà Nội",
    kind: "thpt-qg",
    q: 50,
    t: "60 phút",
    views: "18.4K",
    date: "20/04/2025",
    online: true,
  },
  {
    slug: "ielts-practice-mock-2026",
    title: "IELTS Practice Mock Test 2026 — Academic Full 4 Skills",
    badge: "hot",
    year: "2026",
    province: "",
    kind: "ielts",
    q: 40,
    t: "165 phút",
    views: "9.7K",
    date: "12/05/2026",
    online: true,
  },
  {
    slug: "toeic-practice-2026",
    title: "TOEIC Practice Test 2026 — Listening & Reading Full",
    badge: "new",
    year: "2026",
    province: "",
    kind: "toeic",
    q: 200,
    t: "120 phút",
    views: "7.2K",
    date: "06/05/2026",
    online: true,
  },
  {
    slug: "hsg-tinh-nghe-an-2025",
    title: "Đề thi học sinh giỏi tỉnh Nghệ An 2025 — Môn Tiếng Anh",
    badge: "official",
    year: "2025",
    province: "Nghệ An",
    kind: "hsg",
    q: 60,
    t: "180 phút",
    views: "5.6K",
    date: "18/03/2025",
    online: false,
  },
  {
    slug: "thi-thu-truong-chuyen-le-hong-phong-2025",
    title: "Đề thi thử trường chuyên Lê Hồng Phong 2025 — Tiếng Anh",
    badge: "popular",
    year: "2025",
    province: "TP.HCM",
    kind: "vao-10",
    q: 50,
    t: "120 phút",
    views: "11.3K",
    date: "10/05/2025",
    online: true,
  },
  {
    slug: "hsg-tinh-ha-noi-2024",
    title: "Đề thi học sinh giỏi tỉnh Hà Nội 2024 — Môn Tiếng Anh",
    badge: "official",
    year: "2024",
    province: "Hà Nội",
    kind: "hsg",
    q: 60,
    t: "180 phút",
    views: "3.9K",
    date: "16/03/2024",
    online: false,
  },
];

const sidebarGroups: {
  title: string;
  items: { name: string; count: number; active?: boolean }[];
}[] = [
  {
    title: "Đề thi vào lớp 10",
    items: [
      { name: "Tất cả đề lớp 10", count: 245, active: true },
      { name: "Đề thi thử", count: 180 },
      { name: "Đề thi thật", count: 65 },
      { name: "Hà Nội", count: 42 },
      { name: "TP.HCM", count: 38 },
      { name: "Đà Nẵng", count: 15 },
    ],
  },
  {
    title: "Đề thi THPT QG",
    items: [
      { name: "Tất cả đề THPT", count: 320 },
      { name: "Đề chính thức", count: 45 },
      { name: "Đề minh hoạ", count: 12 },
      { name: "Đề thi thử", count: 263 },
    ],
  },
  {
    title: "Theo năm",
    items: [
      { name: "2026", count: 120 },
      { name: "2025", count: 210 },
      { name: "2024", count: 180 },
      { name: "2023", count: 95 },
    ],
  },
];

export function KhoDeThiClient() {
  const [view, setView] = useState<"list" | "grid">("list");

  const years = useMemo(() => {
    const set = new Set(exams.map((e) => e.year));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KHO_DE_THI_CSS }} />

      <div className="page-wrap">
        <div className="layout">
          <aside className="sidebar" aria-label="Danh mục đề thi">
            {sidebarGroups.map((g) => (
              <div className="sidebar-cat" key={g.title}>
                <div className="sidebar-cat-title">{g.title}</div>
                {g.items.map((it) => (
                  // TODO(istudy-cms): chuyển thành <Link> tới /kho-de-thi?cat=<slug> khi CMS taxonomy ready.
                  <div
                    key={it.name}
                    className={`sidebar-item${it.active ? " active" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Lọc theo ${it.name}`}
                    onClick={() => {
                      /* TODO wire filter handler khi CMS taxonomy ready */
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        /* TODO wire filter handler khi CMS taxonomy ready */
                      }
                    }}
                  >
                    <span>{it.name}</span>
                    <span className="count">{it.count}</span>
                  </div>
                ))}
              </div>
            ))}
          </aside>

          <div className="main">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Trang chủ</Link>
              <span className="sep" aria-hidden>
                ›
              </span>
              <Link href="/kho-de-thi">Kho đề thi</Link>
              <span className="sep" aria-hidden>
                ›
              </span>
              <span className="current">Đề thi vào lớp 10</span>
            </nav>

            <div className="list-head">
              <div>
                <h1>Kho đề thi tiếng Anh</h1>
                <p className="sub">
                  Tổng hợp 650+ đề thi từ khắp cả nước
                </p>
              </div>
              <div className="toolbar">
                <label className="sr-only" htmlFor="kdt-sort">
                  Sắp xếp
                </label>
                <select id="kdt-sort" defaultValue="latest">
                  <option value="latest">Mới nhất</option>
                  <option value="popular">Phổ biến nhất</option>
                  <option value="views">Lượt xem cao</option>
                </select>
                <div
                  className="view-toggle"
                  role="group"
                  aria-label="Chuyển kiểu hiển thị"
                >
                  <button
                    type="button"
                    className={view === "list" ? "active" : ""}
                    onClick={() => setView("list")}
                    aria-pressed={view === "list"}
                    aria-label="Hiển thị dạng danh sách"
                    title="Danh sách"
                  >
                    <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={view === "grid" ? "active" : ""}
                    onClick={() => setView("grid")}
                    aria-pressed={view === "grid"}
                    aria-label="Hiển thị dạng lưới"
                    title="Lưới cửa sổ"
                  >
                    <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div>
              {years.map((year) => {
                const items = exams.filter((e) => e.year === year);
                if (items.length === 0) return null;
                return (
                  <section key={year} aria-label={`Đề thi năm ${year}`}>
                    <div className="year-divider">
                      <span className="label">📅 Năm {year}</span>
                      <span className="line" aria-hidden />
                    </div>
                    <div
                      className={`year-block${view === "grid" ? " is-grid" : ""}`}
                    >
                      {items.map((e) => (
                        <article className="exam-row" key={e.slug}>
                          <div className="exam-thumb" aria-hidden>
                            📄
                          </div>
                          <div className="exam-body">
                            <div className="exam-meta-top">
                              <span className={`badge badge--${e.badge}`}>
                                {BADGE_LABEL[e.badge]}
                              </span>
                              {e.province && (
                                <span className="pill pill-blue">
                                  {e.province}
                                </span>
                              )}
                              {e.online && (
                                <span className="pill pill-green">
                                  🖥️ Làm online
                                </span>
                              )}
                            </div>
                            <h3>
                              <Link href="/de-thi-chi-tiet">
                                {e.title}
                              </Link>
                            </h3>
                            <div className="exam-meta-bot">
                              <span className="meta-item">
                                <IconBook /> {e.q} câu
                              </span>
                              <span className="meta-item">
                                <IconClock /> {e.t}
                              </span>
                              <span className="meta-item">
                                <IconEye /> {e.views}
                              </span>
                              <span className="meta-item">
                                <IconCal /> {e.date}
                              </span>
                            </div>
                          </div>
                          <div
                            className="exam-actions"
                            aria-label="Thao tác với đề"
                          >
                            {e.online && (
                              <Link
                                href="/lam-bai"
                                className="btn btn--primary btn--small"
                              >
                                Làm bài
                              </Link>
                            )}
                            {/* TODO(istudy-cms): wire to /api/exams/:slug/pdf khi CMS scaffold xong */}
                            <a
                              href="#noop"
                              className="btn btn--outline btn--small"
                              aria-label={`Tải PDF: ${e.title}`}
                              onClick={(ev) => ev.preventDefault()}
                            >
                              <IconDownload /> PDF
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
