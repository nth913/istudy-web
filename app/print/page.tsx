/**
 * Print homepage — `/print`.
 *
 * Server Component port of `/tmp/design-bundle/istudy-v2/project/index-print.html`.
 * Renders a print-optimized snapshot of the homepage with:
 *  - NO <Header />
 *  - NO <Footer />
 *  - NO <MegaMenu />
 *  - NO CTA newsletter section
 *  - EventPopup hidden via CSS (root layout still mounts it; print CSS
 *    selectors `.ev-pop` / `.ev-pop-launcher` hide it on this route)
 *  - Static (server-rendered) countdown snapshot — no client tick
 *
 * Designed for `window.print()` to A4 portrait. The `@media print` block
 * in `print-index.ts` applies page breaks + paper-friendly typography.
 */
import { IconEye, IconCal, IconBook, IconClock, IconArrow, IconSearch } from "@/components/Icons";
import { PRINT_INDEX_CSS } from "@/lib/page-css/print-index";

export const metadata = {
  title: "istudy — Better Understanding, Better Learning (print)",
  description: "Bản in của trang chủ istudy — đề thi nổi bật, bộ đề phổ biến, bài viết mới.",
  robots: { index: false, follow: false },
};

const BL: Record<string, string> = {
  hot: "Hot",
  official: "Chính thức",
  new: "Mới",
  popular: "Phổ biến",
  mock: "Thử",
};
const BL_EMOJI: Record<string, string> = {
  hot: "🔥",
  official: "📋",
  new: "✨",
  popular: "⭐",
  mock: "📝",
};

const spotlights = [
  {
    title: "Đề tham khảo tuyển sinh vào lớp 10 THPT TP.HCM 2026 — Môn Tiếng Anh",
    badge: "hot",
    views: "28.3K",
    date: "10/05/2026",
    cat: "Vào lớp 10",
  },
  {
    title: "Đề thi thật THPT QG 2025 — Mã đề 401",
    badge: "official",
    views: "45.2K",
    date: "28/06/2025",
    cat: "THPT QG",
  },
  {
    title: "Đề minh họa THPT QG 2026 — Bộ GD&ĐT",
    badge: "new",
    views: "8.3K",
    date: "01/05/2026",
    cat: "THPT QG",
  },
];

const popular = [
  { title: "Bộ 50 đề thi thử vào lớp 10 Hà Nội 2026", badge: "hot", q: 40, t: "90 phút", img: "📘" },
  { title: "Đề thi thật THPT QG 2025 — Trọn bộ", badge: "official", q: 50, t: "60 phút", img: "📗" },
  { title: "Đề tham khảo lớp 10 TP.HCM 2026", badge: "new", q: 40, t: "90 phút", img: "📙" },
  { title: "Bộ đề ôn luyện tiếng Anh chuyên đề", badge: "popular", q: 40, t: "45 phút", img: "📕" },
  { title: "Đề thi thử IELTS Academic 2026", badge: "mock", q: 40, t: "170 phút", img: "📓" },
  { title: "Tổng hợp đề thi Olympic tiếng Anh", badge: "new", q: 60, t: "90 phút", img: "📒" },
];

const posts = [
  { title: "Tổng hợp ngữ pháp trọng tâm thi vào lớp 10", cat: "Ngữ pháp", date: "07/05/2026", views: "3.2K" },
  { title: "500 từ vựng thường gặp trong đề thi THPT QG", cat: "Từ vựng", date: "05/05/2026", views: "5.1K" },
  { title: "10 mẹo đọc hiểu tiếng Anh đạt điểm cao", cat: "Mẹo thi", date: "03/05/2026", views: "4.8K" },
  { title: "Lịch thi THPT Quốc gia 2026 chính thức", cat: "Tin tức", date: "01/05/2026", views: "15.6K" },
];

/** Render countdown as a server-rendered snapshot (no client tick). */
function snapshotCountdown(targetIso: string, now: Date) {
  const target = new Date(targetIso).getTime();
  const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");
  if (Number.isNaN(target)) return { d: "--", h: "--", m: "--", s: "--" };
  let diff = Math.max(0, target - now.getTime());
  const d = Math.floor(diff / 86_400_000);
  diff -= d * 86_400_000;
  const h = Math.floor(diff / 3_600_000);
  diff -= h * 3_600_000;
  const m = Math.floor(diff / 60_000);
  diff -= m * 60_000;
  const s = Math.floor(diff / 1000);
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
}

export default function PrintHomePage() {
  const cd = snapshotCountdown("2026-06-12T07:30:00+07:00", new Date());

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_INDEX_CSS }} />

      <section className="hero">
        <div className="hero-circle" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>
                Better
                <br />
                <span className="accent">Understanding,</span>
                <br />
                Better Learning
              </h1>
              <p>
                Học tiếng Anh theo cách dễ hiểu và hiệu quả hơn.
                <br />
                Tự tin chinh phục mọi kỳ thi.
              </p>
              <form className="search-bar" action="/kho-de-thi" role="search">
                <IconSearch />
                <input placeholder="Tìm đề thi, bài giảng, từ vựng..." name="q" aria-label="Từ khoá tìm kiếm" />
                <button className="btn btn--primary" type="submit">
                  Tìm kiếm
                </button>
              </form>
            </div>

            <aside className="countdown-card hero-countdown" aria-label="Đếm ngược kỳ thi">
              <div className="cd-eyebrow">
                <span className="cd-pulse" aria-hidden="true" />
                Đếm ngược kỳ thi tốt nghiệp THPT
              </div>
              <h3 className="cd-headline">
                Kỳ thi THPT Quốc gia
                <br />
                <span>26 – 27 tháng 6, 2026</span>
              </h3>
              <div className="cd-clock" aria-label="Đếm ngược đến giờ thi">
                <div className="cd-unit">
                  <span className="cd-num">{cd.d}</span>
                  <span className="cd-lbl">Ngày</span>
                </div>
                <span className="cd-sep" aria-hidden="true">
                  :
                </span>
                <div className="cd-unit">
                  <span className="cd-num">{cd.h}</span>
                  <span className="cd-lbl">Giờ</span>
                </div>
                <span className="cd-sep" aria-hidden="true">
                  :
                </span>
                <div className="cd-unit">
                  <span className="cd-num">{cd.m}</span>
                  <span className="cd-lbl">Phút</span>
                </div>
                <span className="cd-sep" aria-hidden="true">
                  :
                </span>
                <div className="cd-unit">
                  <span className="cd-num">{cd.s}</span>
                  <span className="cd-lbl">Giây</span>
                </div>
              </div>
              <div className="cd-quote">
                <svg className="cd-quote-mark" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-3-6-6V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-3-6-6V7z"
                  />
                </svg>
                <p>
                  Mỗi giờ bạn học hôm nay là <strong>một câu đúng</strong> ngày mai. Đường dài không sợ, chỉ sợ dừng lại.
                </p>
                <div className="cd-quote-by">— istudy, đồng hành cùng bạn</div>
              </div>
              <a href="/kho-de-thi" className="btn btn--primary btn--small cd-cta">
                Vào ôn luyện ngay
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="stats-bar" aria-label="Thống kê istudy">
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-num">1.200+</div>
            <div className="stat-label">Đề thi</div>
          </div>
          <div className="stat">
            <div className="stat-num">50.000+</div>
            <div className="stat-label">Lượt làm bài</div>
          </div>
          <div className="stat">
            <div className="stat-num">500+</div>
            <div className="stat-label">Bài giảng</div>
          </div>
          <div className="stat">
            <div className="stat-num">20.000+</div>
            <div className="stat-label">Học sinh</div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="print-spotlight-h">
        <div className="section-header">
          <div>
            <h2 id="print-spotlight-h">🔥 Đề thi nổi bật</h2>
            <p className="sub">Đề thi được quan tâm nhất tuần này</p>
          </div>
          <a href="/kho-de-thi" className="see-all">
            Xem tất cả <IconArrow />
          </a>
        </div>
        <div className="grid-3">
          {spotlights.map((e, i) => (
            <a key={i} href="/de-thi-chi-tiet" className="exam-card">
              <div className="exam-card-head">
                <span className={`badge badge--${e.badge}`}>
                  {BL_EMOJI[e.badge]} {BL[e.badge]}
                </span>
                <span className="pill pill-red">{e.cat}</span>
              </div>
              <h3 className="exam-card-title">{e.title}</h3>
              <div className="exam-card-meta">
                <span className="meta-item">
                  <IconEye /> {e.views}
                </span>
                <span className="meta-item">
                  <IconCal /> {e.date}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="gray-section" aria-labelledby="print-popular-h">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="section-header">
            <h2 id="print-popular-h">📚 Bộ đề phổ biến</h2>
            <div className="tab-pills">
              <button className="tab-pill active" type="button">
                Tất cả
              </button>
              <button className="tab-pill" type="button">
                Lớp 10
              </button>
              <button className="tab-pill" type="button">
                THPT QG
              </button>
              <button className="tab-pill" type="button">
                Đại học
              </button>
            </div>
          </div>
          <div className="grid-3">
            {popular.map((e, i) => (
              <a key={i} href="/de-thi-chi-tiet" className="popular-card">
                <div className="popular-cover" aria-hidden="true">
                  {e.img}
                  <span className="badge-abs">
                    <span className={`badge badge--${e.badge}`}>{BL[e.badge]}</span>
                  </span>
                </div>
                <div className="popular-body">
                  <h3>{e.title}</h3>
                  <div className="meta">
                    <span className="meta-item">
                      <IconBook /> {e.q} câu
                    </span>
                    <span className="meta-item">
                      <IconClock /> {e.t}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="print-posts-h">
        <div className="section-header">
          <h2 id="print-posts-h">📝 Bài viết mới nhất</h2>
          <a href="/bai-viet" className="see-all">
            Xem tất cả <IconArrow />
          </a>
        </div>
        <div className="grid-4">
          {posts.map((p, i) => (
            <a key={i} href="/bai-viet-chi-tiet" className="post-card">
              <span className="cat">{p.cat}</span>
              <h3>{p.title}</h3>
              <div className="meta">
                <span>{p.date}</span>
                <span>{p.views} views</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
