import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BAI_VIET_CSS } from "@/lib/page-css/bai-viet";

export const metadata = { title: "Bài viết — istudy" };

const grads: [string, string, string][] = [
  ["#FFE4E6", "#FECACA", "🔤"],
  ["#DBEAFE", "#BFDBFE", "✏️"],
  ["#D1FAE5", "#A7F3D0", "🎯"],
  ["#FEF3C7", "#FDE68A", "📝"],
  ["#F3E8FF", "#E9D5FF", "📚"],
  ["#FCE7F3", "#FBCFE8", "💬"],
  ["#E0E7FF", "#C7D2FE", "🎧"],
  ["#FED7AA", "#FDBA74", "📖"],
  ["#CFFAFE", "#A5F3FC", "🗣️"],
];

const cats = [
  { n: "NGỮ PHÁP", c: "var(--red)", bg: "var(--red-light)" },
  { n: "TỪ VỰNG", c: "#9333EA", bg: "#F3E8FF" },
  { n: "CHIẾN LƯỢC", c: "var(--blue)", bg: "#EFF6FF" },
  { n: "PHÁT ÂM", c: "var(--green)", bg: "var(--green-bg)" },
  { n: "VIẾT", c: "#D97706", bg: "#FEF3C7" },
  { n: "ĐỌC HIỂU", c: "#0891B2", bg: "#CFFAFE" },
];

const posts = [
  { t: "Thì quá khứ đơn vs Hiện tại hoàn thành: Phân biệt dễ hiểu nhất", e: "2 thì rất dễ nhầm khi làm bài. Bài viết tổng hợp dấu hiệu và 30 ví dụ minh hoạ.", cat: 0, d: "10/05/2026", v: "12.3K" },
  { t: "150 phrasal verbs với GET, PUT, TAKE phải nhớ", e: "Phrasal verbs là phần khó nhất với học sinh. Cùng học cách ghi nhớ qua ngữ cảnh.", cat: 1, d: "09/05/2026", v: "18.9K" },
  { t: "Cách làm bài đọc hiểu IELTS Reading đạt 7.0+", e: "5 kỹ thuật scan/skim hiệu quả, cách quản lý thời gian và phân tích bẫy của đề.", cat: 2, d: "08/05/2026", v: "9.1K" },
  { t: "Cách phát âm âm /θ/ và /ð/ chuẩn người bản xứ", e: "Hướng dẫn chi tiết vị trí lưỡi, kèm video luyện tập từng từ dễ và khó.", cat: 3, d: "07/05/2026", v: "7.5K" },
  { t: "Cấu trúc bài luận tiếng Anh: Opinion Essay step-by-step", e: "Mẫu câu hay, từ nối chuyên nghiệp giúp bài viết đạt điểm cao.", cat: 4, d: "05/05/2026", v: "11.2K" },
  { t: "Mẫu câu giao tiếp tiếng Anh hàng ngày: 100 cụm phổ biến", e: "Học giao tiếp nhanh với những cụm từ người bản xứ dùng nhiều nhất.", cat: 1, d: "03/05/2026", v: "14.6K" },
  { t: "Câu điều kiện loại 1, 2, 3 và Mixed: Phân biệt cực dễ", e: "Sơ đồ tư duy + ví dụ thực tế giúp nhớ công thức câu điều kiện mãi mãi.", cat: 0, d: "01/05/2026", v: "16.8K" },
  { t: "10 lỗi sai phổ biến trong bài thi viết tiếng Anh", e: "Tổng hợp lỗi học sinh thường mắc và cách khắc phục từ giáo viên 15 năm kinh nghiệm.", cat: 4, d: "28/04/2026", v: "8.4K" },
  { t: "5 chiến lược làm bài thi THPT QG môn Anh đạt 9+", e: "Bí quyết phân bổ thời gian, làm câu khó và tránh bẫy của bộ giáo dục.", cat: 2, d: "25/04/2026", v: "21.3K" },
];

export default function BaiVietPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BAI_VIET_CSS }} />
      <Header activeNav="blog" />

      <div className="page-wrap">
        <div className="layout">
          <nav className="breadcrumb" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">Bài viết</span>
          </nav>

          <div className="blog-head">
            <h1>Bài viết &amp; Tips học tiếng Anh</h1>
            <p>Kiến thức từ vựng, ngữ pháp, mẹo thi cử và lộ trình học hiệu quả từ chuyên gia istudy</p>
          </div>

          <div className="featured-row">
            <Link href="/bai-viet-chi-tiet" className="feat-main">
              <div className="img">📚</div>
              <div className="body">
                <span className="tag-pill" style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--red)", background: "var(--red-light)", padding: "3px 10px", borderRadius: 6 }}>NGỮ PHÁP</span>
                <h2>Thì hiện tại đơn (Simple Present): Công thức, cách dùng &amp; 50 ví dụ chi tiết</h2>
                <p>Tổng hợp đầy đủ kiến thức về thì hiện tại đơn cho học sinh THCS - THPT. Có bài tập có đáp án và bí quyết nhận biết nhanh dấu hiệu.</p>
                <div className="meta">
                  <span>👤 Cô Mai</span>
                  <span>📅 12/05/2026</span>
                  <span>👁️ 28.4K lượt xem</span>
                </div>
              </div>
            </Link>

            <div className="feat-side">
              <Link href="/bai-viet-chi-tiet" className="feat-side-item">
                <div className="img">🎯</div>
                <div className="body">
                  <span className="tag-pill" style={{ fontSize: 11, color: "var(--blue)", background: "#EFF6FF", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>CHIẾN LƯỢC</span>
                  <h3>Lộ trình ôn thi vào lớp 10 môn Anh trong 3 tháng cuối</h3>
                  <div className="meta">📅 10/05/2026 • 👁️ 15.2K</div>
                </div>
              </Link>
              <Link href="/bai-viet-chi-tiet" className="feat-side-item">
                <div className="img">📖</div>
                <div className="body">
                  <span className="tag-pill" style={{ fontSize: 11, color: "#9333EA", background: "#F3E8FF", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>TỪ VỰNG</span>
                  <h3>500 từ vựng tiếng Anh thường xuất hiện trong đề thi THPT QG</h3>
                  <div className="meta">📅 08/05/2026 • 👁️ 22.7K</div>
                </div>
              </Link>
            </div>
          </div>

          <div
            className="cat-strip"
            role="group"
            aria-label="Lọc theo chủ đề"
          >
            <span className="cat-chip active" aria-current="true">
              Tất cả
            </span>
            <span className="cat-chip">Ngữ pháp</span>
            <span className="cat-chip">Từ vựng</span>
            <span className="cat-chip">Phát âm</span>
            <span className="cat-chip">Chiến lược thi</span>
            <span className="cat-chip">Mẫu câu</span>
            <span className="cat-chip">Đọc hiểu</span>
            <span className="cat-chip">Viết</span>
          </div>

          <div className="post-grid">
            {posts.map((p, i) => {
              const g = grads[i % grads.length];
              const c = cats[p.cat];
              return (
                <Link key={i} href="/bai-viet-chi-tiet" className="post-card">
                  <div className="img" style={{ background: `linear-gradient(135deg,${g[0]},${g[1]})` }}>{g[2]}</div>
                  <div className="body">
                    <span className="tag-pill" style={{ color: c.c, background: c.bg }}>{c.n}</span>
                    <h3>{p.t}</h3>
                    <p className="excerpt">{p.e}</p>
                    <div className="meta">
                      <span>📅 {p.d}</span>
                      <span>👁️ {p.v}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="load-more">
            {/* TODO(istudy-cms): chuyển thành pagination /bai-viet?page=N hoặc infinite-scroll khi CMS list API ready. */}
            <Link
              href="/coming-soon?feature=blog-pagination"
              className="btn btn--outline btn--large"
            >
              Xem thêm bài viết ↓
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
