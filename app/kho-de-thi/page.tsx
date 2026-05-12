"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IconEye, IconCal, IconBook, IconClock, IconDownload } from "@/components/Icons";
import { KHO_DE_THI_CSS } from "@/lib/page-css/kho-de-thi";

const BL: Record<string, string> = { hot: "🔥 Hot", official: "📋 Chính thức", new: "✨ Mới", popular: "⭐ Phổ biến" };

type Exam = {
  title: string;
  badge: keyof typeof BL;
  year: string;
  province: string;
  q: number;
  t: string;
  views: string;
  date: string;
  online: boolean;
};

const exams: Exam[] = [
  { title: "Đề tham khảo tuyển sinh vào lớp 10 THPT TP.HCM 2026 — Môn Tiếng Anh", badge: "hot", year: "2026", province: "TP.HCM", q: 40, t: "90 phút", views: "28.3K", date: "10/05/2026", online: true },
  { title: "Đề thi thử tiếng Anh vào lớp 10 Hà Nội 2026 — Đề số 15", badge: "new", year: "2026", province: "Hà Nội", q: 40, t: "60 phút", views: "12.5K", date: "08/05/2026", online: true },
  { title: "Đề thi thử lớp 10 Đà Nẵng 2026 — Đề số 3", badge: "popular", year: "2026", province: "Đà Nẵng", q: 40, t: "60 phút", views: "3.1K", date: "28/04/2026", online: false },
  { title: "Đề minh họa lớp 10 Hải Phòng 2026", badge: "new", year: "2026", province: "Hải Phòng", q: 40, t: "60 phút", views: "2.0K", date: "22/04/2026", online: false },
  { title: "Đề thi thật vào lớp 10 Hà Nội 2025", badge: "official", year: "2025", province: "Hà Nội", q: 40, t: "60 phút", views: "45.2K", date: "15/06/2025", online: false },
  { title: "Đề thi thật THPT QG 2025 — Mã đề 401", badge: "official", year: "2025", province: "", q: 50, t: "60 phút", views: "38.1K", date: "28/06/2025", online: false },
  { title: "Đề thi thử THPT QG 2025 — Trường THPT Chu Văn An", badge: "popular", year: "2025", province: "Hà Nội", q: 50, t: "60 phút", views: "18.4K", date: "20/04/2025", online: true },
];

const years = ["2026", "2025"];

const sidebarGroups = [
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
      { name: "Đề minh họa", count: 12 },
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

export default function KhoDeThiPage() {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KHO_DE_THI_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="layout">
          <aside className="sidebar">
            {sidebarGroups.map((g) => (
              <div className="sidebar-cat" key={g.title}>
                <div className="sidebar-cat-title">{g.title}</div>
                {g.items.map((it) => (
                  <div key={it.name} className={`sidebar-item${"active" in it && it.active ? " active" : ""}`}>
                    <span>{it.name}</span>
                    <span className="count">{it.count}</span>
                  </div>
                ))}
              </div>
            ))}
          </aside>

          <div className="main">
            <nav className="breadcrumb">
              <Link href="/">Trang chủ</Link>
              <span className="sep">›</span>
              <Link href="/kho-de-thi">Kho đề thi</Link>
              <span className="sep">›</span>
              <span className="current">Đề thi vào lớp 10</span>
            </nav>

            <div className="list-head">
              <div>
                <h1>Kho đề thi tiếng Anh</h1>
                <p className="sub">Tổng hợp 650+ đề thi từ khắp cả nước</p>
              </div>
              <div className="toolbar">
                <select>
                  <option>Mới nhất</option>
                  <option>Phổ biến nhất</option>
                  <option>Lượt xem cao</option>
                </select>
                <div className="view-toggle">
                  <div className={view === "list" ? "active" : ""} onClick={() => setView("list")} title="Danh sách">
                    <svg className="icon" viewBox="0 0 24 24">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </div>
                  <div className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} title="Lưới cửa sổ">
                    <svg className="icon" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {years.map((year) => {
                const items = exams.filter((e) => e.year === year);
                return (
                  <div key={year}>
                    <div className="year-divider">
                      <span className="label">📅 Năm {year}</span>
                      <span className="line" />
                    </div>
                    <div className={`year-block${view === "grid" ? " is-grid" : ""}`}>
                      {items.map((e, i) => (
                        <div className="exam-row" key={i}>
                          <div className="exam-thumb">📄</div>
                          <div className="exam-body">
                            <div className="exam-meta-top">
                              <span className={`badge badge--${e.badge}`}>{BL[e.badge]}</span>
                              {e.province && <span className="pill pill-blue">{e.province}</span>}
                              {e.online && <span className="pill pill-green">🖥️ Làm online</span>}
                            </div>
                            <h3>
                              <Link href="/de-thi-chi-tiet">{e.title}</Link>
                            </h3>
                            <div className="exam-meta-bot">
                              <span className="meta-item"><IconBook /> {e.q} câu</span>
                              <span className="meta-item"><IconClock /> {e.t}</span>
                              <span className="meta-item"><IconEye /> {e.views}</span>
                              <span className="meta-item"><IconCal /> {e.date}</span>
                            </div>
                          </div>
                          <div className="exam-actions">
                            {e.online && (
                              <Link href="/lam-bai" className="btn btn--primary btn--small">Làm bài</Link>
                            )}
                            <a href="#" className="btn btn--outline btn--small"><IconDownload /> PDF</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
