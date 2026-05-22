"use client";
import Link from "next/link";
import { useMemo, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  IconEye,
  IconCal,
  IconBook,
  IconClock,
  IconDownload,
} from "@/components/Icons";
import {
  fetchExamsList,
  type ExamListItem,
  type ExamListQuery,
} from "@/lib/api/exams";

const BADGE_LABEL: Record<string, string> = {
  hot: "🔥 Hot",
  official: "📋 Chính thức",
  new: "✨ Mới",
  popular: "⭐ Phổ biến",
};

function badgeOf(e: ExamListItem): keyof typeof BADGE_LABEL {
  if (e.tags?.hot?.enabled) return "hot";
  if (e.examType === "chinh-thuc") return "official";
  const created = new Date(e.createdAt).getTime();
  if (Date.now() - created < 14 * 24 * 60 * 60 * 1000) return "new";
  return "popular";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

interface Props {
  initialItems: ExamListItem[];
  initialTotal: number;
  initialQuery: ExamListQuery;
}

export function KhoDeThiClient({
  initialItems,
  initialTotal,
  initialQuery,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<"list" | "grid">("list");
  const [items, setItems] = useState<ExamListItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const total = initialTotal;
  const sort = initialQuery.sort || "latest";

  const onSortChange = useCallback(
    (value: string) => {
      const sp = new URLSearchParams();
      Object.entries(initialQuery).forEach(([k, v]) => {
        if (v != null && k !== "sort" && k !== "limit" && k !== "offset") {
          sp.set(k, String(v));
        }
      });
      if (value !== "latest") sp.set("sort", value);
      const qs = sp.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, initialQuery],
  );

  const onLoadMore = useCallback(async () => {
    setLoading(true);
    try {
      const next = await fetchExamsList({
        ...initialQuery,
        offset: items.length,
      });
      setItems((prev) => [...prev, ...next.items]);
    } finally {
      setLoading(false);
    }
  }, [items.length, initialQuery]);

  const years = useMemo(() => {
    const set = new Set(items.map((e) => e.year));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [items]);

  const hasMore = items.length < total;

  return (
    <>
      <div className="list-head">
        <div>
          <h1>Kho đề thi tiếng Anh</h1>
          <p className="sub">Tổng hợp đề thi từ khắp cả nước</p>
        </div>
        <div className="toolbar">
          <label className="sr-only" htmlFor="kdt-sort">
            Sắp xếp
          </label>
          <select
            id="kdt-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
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
          const yearItems = items.filter((e) => e.year === year);
          if (yearItems.length === 0) return null;
          return (
            <section key={year} aria-label={`Đề thi năm ${year}`}>
              <div className="year-divider">
                <span className="label">📅 Năm {year}</span>
                <span className="line" aria-hidden />
              </div>
              <div
                className={`year-block${view === "grid" ? " is-grid" : ""}`}
              >
                {yearItems.map((e) => {
                  const badge = badgeOf(e);
                  return (
                    <article className="exam-row" key={e.slug}>
                      <div className="exam-thumb" aria-hidden>
                        📄
                      </div>
                      <div className="exam-body">
                        <div className="exam-meta-top">
                          <span className={`badge badge--${badge}`}>
                            {BADGE_LABEL[badge]}
                          </span>
                          {e.province?.name && (
                            <span className="pill pill-blue">
                              {e.province.name}
                            </span>
                          )}
                          {e.examType === "chinh-thuc" && (
                            <span className="pill pill-green">
                              🖥️ Làm online
                            </span>
                          )}
                        </div>
                        <h3>
                          <Link href={`/de-thi-chi-tiet/${e.slug}`}>
                            {e.title}
                          </Link>
                        </h3>
                        <div className="exam-meta-bot">
                          <span className="meta-item">
                            <IconBook /> 40 câu
                          </span>
                          <span className="meta-item">
                            <IconClock /> 60 phút
                          </span>
                          <span className="meta-item">
                            <IconEye /> {e.views ?? "—"}
                          </span>
                          <span className="meta-item">
                            <IconCal /> {formatDate(e.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div
                        className="exam-actions"
                        aria-label="Thao tác với đề"
                      >
                        <Link
                          href={`/lam-bai?slug=${e.slug}`}
                          className="btn btn--primary btn--small"
                        >
                          Làm bài
                        </Link>
                        <Link
                          href={`/api/exams/${e.slug}/pdf`}
                          className="btn btn--outline btn--small"
                          aria-label={`Tải PDF: ${e.title}`}
                        >
                          <IconDownload /> PDF
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {hasMore && (
        <div className="load-more-wrap">
          <button
            type="button"
            className="btn btn--outline btn--load-more"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading
              ? "Đang tải..."
              : `Lấy thêm 20 đề (còn ${total - items.length})`}
          </button>
        </div>
      )}
    </>
  );
}
