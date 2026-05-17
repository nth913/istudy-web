import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Countdown from "@/components/Countdown";
import { IconEye, IconCal, IconBook, IconClock, IconArrow, IconArrowXs, IconSearch, IconMail } from "@/components/Icons";
import { INDEX_CSS } from "@/lib/page-css/index";

const BL: Record<string, string> = { hot: "Hot", official: "Chính thức", new: "Mới", popular: "Phổ biến", mock: "Thử" };
const BL_EMOJI: Record<string, string> = { hot: "🔥", official: "📋", new: "✨", popular: "⭐", mock: "📝" };

const spotlights = [
  { title: "Đề tham khảo tuyển sinh vào lớp 10 THPT TP.HCM 2026 — Môn Tiếng Anh", badge: "hot", views: "28.3K", date: "10/05/2026", cat: "Vào lớp 10" },
  { title: "Đề thi thật THPT QG 2025 — Mã đề 401", badge: "official", views: "45.2K", date: "28/06/2025", cat: "THPT QG" },
  { title: "Đề minh họa THPT QG 2026 — Bộ GD&ĐT", badge: "new", views: "8.3K", date: "01/05/2026", cat: "THPT QG" },
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

export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INDEX_CSS }} />
      <Header activeNav="home" />

      <section className="hero">
        <div className="hero-circle" />
        <div className="hero-inner">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>
                from
                <span className="accent"> Best </span>
                to
                <span className="accent"> Better</span>
              </h1>
              <p>
                Học tiếng Anh theo cách dễ hiểu và hiệu quả hơn.
                <br />
                Tự tin chinh phục mọi kỳ thi.
              </p>
              <form className="search-bar" action="/kho-de-thi">
                <IconSearch />
                <input placeholder="Tìm đề thi, bài giảng, từ vựng..." name="q" />
                <button className="btn btn--primary" type="submit">Tìm kiếm</button>
              </form>
            </div>

            <aside className="countdown-card hero-countdown">
              <span className="cd-cap">
                <span className="cd-pulse" />
                Mùa thi 2026
              </span>

              <h3 className="cd-headline">
                Kỳ thi THPT Quốc Gia
                <br />
                <span>26-27 tháng 6, 2026</span>
              </h3>

              <Countdown />

              <div className="cd-quote">
                <svg className="cd-quote-mark" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-3-6-6V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-3-6-6V7z" />
                </svg>
                <p>
                  Mỗi giờ bạn học hôm nay là <strong>một câu đúng</strong> ngày mai. Đường dài không sợ, chỉ sợ dừng lại.
                </p>
                <div className="cd-quote-by">— istudy, đồng hành cùng bạn</div>
              </div>

              <Link href="/kho-de-thi" className="btn btn--primary btn--small cd-cta">
                Vào ôn luyện ngay
                <IconArrowXs />
              </Link>

              <span className="cd-corner-sticker">slaykỳ thi</span>
            </aside>
          </div>
        </div>
      </section>

      <section className="stats-bar">
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

      <section className="section">
        <div className="section-header">
          <div>
            <h2>🔥 Đề thi nổi bật</h2>
            <p className="sub">Đề thi được quan tâm nhất tuần này</p>
          </div>
          <Link href="/kho-de-thi" className="see-all">
            Xem tất cả <IconArrow />
          </Link>
        </div>
        <div className="grid-3" id="spotlight-grid">
          {spotlights.map((e, i) => (
            <Link key={i} href="/de-thi-chi-tiet" className="exam-card">
              <div className="exam-card-head">
                <span className={`badge badge--${e.badge}`}>
                  {BL_EMOJI[e.badge]} {BL[e.badge]}
                </span>
                <span className="pill pill-red">{e.cat}</span>
              </div>
              <h3 className="exam-card-title">{e.title}</h3>
              <div className="exam-card-meta">
                <span className="meta-item"><IconEye /> {e.views}</span>
                <span className="meta-item"><IconCal /> {e.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="gray-section">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="section-header">
            <h2>📚 Bộ đề phổ biến</h2>
            <div className="tab-pills">
              <button className="tab-pill active">Tất cả</button>
              <button className="tab-pill">Lớp 10</button>
              <button className="tab-pill">THPT QG</button>
              <button className="tab-pill">Đại học</button>
            </div>
          </div>
          <div className="grid-3">
            {popular.map((e, i) => (
              <Link key={i} href="/de-thi-chi-tiet" className="popular-card">
                <div className="popular-cover">
                  {e.img}
                  <span className="badge-abs">
                    <span className={`badge badge--${e.badge}`}>{BL[e.badge]}</span>
                  </span>
                </div>
                <div className="popular-body">
                  <h3>{e.title}</h3>
                  <div className="meta">
                    <span className="meta-item"><IconBook /> {e.q} câu</span>
                    <span className="meta-item"><IconClock /> {e.t}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>📝 Bài viết mới nhất</h2>
          <Link href="/bai-viet" className="see-all">
            Xem tất cả <IconArrow />
          </Link>
        </div>
        <div className="grid-4">
          {posts.map((p, i) => (
            <Link key={i} href="/bai-viet-chi-tiet" className="post-card">
              <span className="cat">{p.cat}</span>
              <h3>{p.title}</h3>
              <div className="meta">
                <span>{p.date}</span>
                <span>{p.views} views</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner">
          <h2>Đừng bỏ lỡ đề mới thi nhất!</h2>
          <p>Đăng ký nhận email khi có bài viết và đề thi mới</p>
          <form className="cta-form">
            <div className="input-wrap">
              <IconMail />
              <input placeholder="Email của bạn" />
            </div>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
