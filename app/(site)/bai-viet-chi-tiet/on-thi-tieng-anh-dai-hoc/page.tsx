import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ArticleToc, { type TocItem } from "../ArticleToc";
import LikeButton from "../LikeButton";
import { ShareButtons, NewsletterForm } from "../ArticleInteractions";
import { Comments } from "@/components/Comments";
import { JsonLd } from "@/components/JsonLd";
import { ON_THI_DAI_HOC_CSS } from "@/lib/page-css/on-thi-tieng-anh-dai-hoc";
import { fetchPostBySlug } from "@/lib/api/posts";
import { breadcrumbSchema, articleSchema, faqPageSchema } from "@/lib/jsonld";

export const revalidate = 3600;

const SLUG = "on-thi-tieng-anh-dai-hoc";
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aistudy.com.vn").replace(/\/$/, "");
const CANONICAL = `${BASE_URL}/bai-viet-chi-tiet/${SLUG}`;

export async function generateMetadata(): Promise<Metadata> {
  const post = await fetchPostBySlug(SLUG).catch(() => null);
  const title =
    (post as any)?.seoTitle ??
    (post as any)?.title ??
    "Chiến lược ôn thi tiếng Anh đầu vào đại học đạt điểm cao | istudy";
  const description =
    (post as any)?.seoDescription ??
    (post as any)?.excerpt ??
    "Hiểu cấu trúc đề CEPT & TOEIC, lộ trình ôn 3 bước và mẹo làm bài theo từng kỹ năng. Cẩm nang ôn thi tiếng Anh đầu vào đại học toàn diện từ istudy.";
  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title,
      description,
      url: CANONICAL,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const TOC_ITEMS: ReadonlyArray<TocItem> = [
  { href: "#muc-dich", label: "1. Mục đích bài thi đầu vào" },
  { href: "#cau-truc", label: "2. Cấu trúc đề thi" },
  { href: "#cau-truc-cept", label: "2.1 Theo dạng CEPT", lvl: 2 },
  { href: "#cau-truc-toeic", label: "2.2 Theo dạng TOEIC", lvl: 2 },
  { href: "#cach-on", label: "3. Cách ôn thi hiệu quả" },
  { href: "#hieu-cau-truc", label: "3.1 Hiểu rõ cấu trúc", lvl: 2 },
  { href: "#lap-ke-hoach", label: "3.2 Lập kế hoạch", lvl: 2 },
  { href: "#luyen-de", label: "3.3 Luyện đề mẫu", lvl: 2 },
  { href: "#chien-luoc", label: "4. Chiến lược làm bài" },
  { href: "#truoc-khi-thi", label: "4.1 Trước khi thi", lvl: 2 },
  { href: "#trong-khi-thi", label: "4.2 Trong lúc làm bài", lvl: 2 },
];

export default async function OnThiTiengAnhDaiHocPage() {
  const post = await fetchPostBySlug(SLUG).catch(() => null);
  const viewCount = (post as any)?.viewCount ?? 0;
  const likeCount = (post as any)?.likeCount ?? 0;
  const publishedAt = (post as any)?.publishedAt
    ? new Date((post as any).publishedAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "06/06/2026";

  const breadcrumb = breadcrumbSchema([
    { name: "Trang chủ", url: "/" },
    { name: "Bài viết", url: "/bai-viet" },
    { name: "Bí kíp thi", url: "/bai-viet?category=meo" },
    { name: "Ôn thi tiếng Anh đầu vào đại học", url: CANONICAL },
  ]);

  const article = articleSchema({
    title: "Chiến lược ôn thi tiếng Anh đầu vào đại học đạt điểm cao",
    url: CANONICAL,
    description:
      "Hiểu cấu trúc đề CEPT & TOEIC, lộ trình ôn 3 bước và mẹo làm bài theo từng kỹ năng. Cẩm nang ôn thi tiếng Anh đầu vào đại học toàn diện từ istudy.",
    datePublished: "2026-06-06",
    authorName: "istudy Team",
  });

  const faq = faqPageSchema([
    {
      q: "Bài thi tiếng Anh đầu vào đại học để làm gì?",
      a: "Bài thi được dùng để đánh giá trình độ tiếng Anh của sinh viên mới nhập học, từ đó nhà trường xếp lớp và chương trình học phù hợp với năng lực từng người.",
    },
    {
      q: "Đề thi tiếng Anh đầu vào đại học có dạng CEPT và TOEIC khác nhau như thế nào?",
      a: "Dạng CEPT kiểm tra đầy đủ 4 kỹ năng Listening, Reading, Writing và Speaking. Dạng TOEIC chỉ kiểm tra Listening và Reading với 200 câu hỏi trong 120 phút, chia thành 7 part.",
    },
    {
      q: "Lộ trình ôn thi tiếng Anh đầu vào hiệu quả gồm mấy bước?",
      a: "Lộ trình gồm 3 bước: (1) Hiểu rõ cấu trúc đề của trường mình dự thi; (2) Lập kế hoạch ôn tập chi tiết theo từng kỹ năng; (3) Luyện đề mẫu với áp lực thời gian như thi thật.",
    },
    {
      q: "Chiến lược làm bài thi tiếng Anh đầu vào là gì?",
      a: "Trước khi thi: đọc kỹ hướng dẫn, chuẩn bị đồng hồ, lên kế hoạch thời gian từng phần. Trong lúc làm bài: làm câu chắc chắn trước, không để trống câu trắc nghiệm, kiểm tra lại khi còn thời gian.",
    },
    {
      q: "Mẹo làm bài tốt theo từng kỹ năng tiếng Anh là gì?",
      a: "Listening: đọc lướt câu hỏi trong lúc tạm ngừng giữa các part. Reading: đọc hiểu toàn văn bản, chú ý chi tiết. Writing: lập dàn ý trước. Speaking: duy trì giao tiếp mắt, nói tự nhiên và tự tin.",
    },
  ]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ON_THI_DAI_HOC_CSS }} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={article} />
      <JsonLd data={faq} />

      {/* Banner */}
      <div className="article-banner" aria-label="Banner bài viết" />

      {/* Meta card overlapping banner */}
      <div className="meta-wrap">
        <section className="panel meta-card">
          <nav className="crumbs" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span className="sep" aria-hidden="true">›</span>
            <Link href="/bai-viet">Bài viết</Link>
            <span className="sep" aria-hidden="true">›</span>
            <Link href="/bai-viet?category=meo">Bí kíp thi</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">Ôn thi tiếng Anh đầu vào đại học</span>
          </nav>
          <h1>Chiến lược ôn thi tiếng Anh đầu vào đại học đạt điểm cao</h1>
          <p className="lede">
            Hầu hết các trường đại học đều yêu cầu tân sinh viên làm một bài kiểm tra năng lực
            tiếng Anh đầu vào để xếp lớp. Bài viết này giúp bạn hiểu rõ cấu trúc đề thi và xây dựng
            chiến lược ôn luyện — làm bài hiệu quả nhất.
          </p>
          <div className="meta-row">
            <div className="author-block">
              <div className="ava" aria-hidden="true">A</div>
              <span className="n">istudy Team</span>
              <span className="sep" aria-hidden="true">•</span>
              <span className="date">📅 {publishedAt}</span>
            </div>
          </div>
          <div className="meta-row-2">
            <div className="read-stats">
              <span>⏱ 9 phút đọc</span>
              {viewCount > 0 && <span>👁 {viewCount.toLocaleString("vi-VN")} lượt xem</span>}
            </div>
            <div className="share-block">
              <LikeButton initialLikes={likeCount} postId={(post as any)?.id} />
              <span className="lbl">Chia sẻ:</span>
              <ShareButtons postId={(post as any)?.id} />
            </div>
          </div>
        </section>
      </div>

      <div className="article-layout">
        <aside className="sidebar-left" aria-label="Mục lục">
          <div className="toc-card">
            <h4>Mục lục bài viết</h4>
            <ArticleToc items={TOC_ITEMS} />
          </div>
        </aside>

        <main>
          {/* Inner article banner */}
          <section className="panel inner-banner" style={{ padding: 0 }} aria-label="Banner chủ đề bài viết">
            <span className="blob b1" aria-hidden="true" />
            <span className="blob b2" aria-hidden="true" />
            <span className="blob b3" aria-hidden="true" />
            <div className="card-inside">
              <div className="eyebrow">BÍ KÍP THI</div>
              <h2>Tiếng Anh đầu vào Đại học</h2>
              <div className="tag">— Chiến lược ôn &amp; làm bài đạt điểm cao —</div>
            </div>
          </section>

          {/* Key takeaways */}
          <section className="takeaways" aria-label="Điểm chính cần nhớ">
            <div className="head">🔑 KEY TAKEAWAYS</div>
            <ol>
              <li>
                <span>
                  <b>Mục đích:</b> Bài thi đầu vào đánh giá trình độ để xếp lớp và chương trình học phù hợp với từng sinh viên.
                </span>
              </li>
              <li>
                <span>
                  <b>Cấu trúc phổ biến:</b> Đề thường mô phỏng <b>CEPT</b> (4 kỹ năng Listening – Reading – Writing – Speaking) hoặc <b>TOEIC</b> (Listening &amp; Reading, 200 câu / 120 phút).
                </span>
              </li>
              <li>
                <span>
                  <b>Cách ôn:</b> Hiểu rõ cấu trúc đề → Lập kế hoạch ôn tập chi tiết → Luyện đề mẫu trong điều kiện như thi thật.
                </span>
              </li>
              <li>
                <span>
                  <b>Chiến lược làm bài:</b> Đọc kỹ hướng dẫn, quản lý thời gian, làm câu dễ trước, không bỏ trống câu trắc nghiệm.
                </span>
              </li>
              <li>
                <span>
                  <b>Mẹo theo kỹ năng:</b> Listening đọc lướt câu hỏi trước; Reading đọc hiểu toàn văn bản; Writing lập dàn ý; Speaking giữ giao tiếp mắt &amp; nói tự nhiên.
                </span>
              </li>
            </ol>
          </section>

          {/* Article body */}
          <article className="panel article-body">
            {/* §1 Mục đích */}
            <h2 id="muc-dich">Mục đích của bài thi tiếng Anh đầu vào</h2>
            <p>
              Bài kiểm tra tiếng Anh đầu vào đại học được dùng để{" "}
              <strong>đánh giá trình độ tiếng Anh</strong> của sinh viên mới nhập học. Dựa trên kết
              quả, nhà trường sẽ xếp bạn vào lớp và chương trình học phù hợp nhất với năng lực hiện tại.
            </p>
            <p>
              Với những chương trình yêu cầu kỹ năng tiếng Anh cao (học bằng tiếng Anh, đọc tài liệu
              chuyên ngành), bài thi này đảm bảo bạn đủ khả năng ngôn ngữ để theo kịp. Nếu chưa đạt,
              bạn có thể phải học thêm các <strong>lớp bổ trợ</strong> trước khi vào chương trình chính.
            </p>

            <div className="why-grid" aria-label="Lý do bài thi quan trọng">
              <div className="why-card c1">
                <div className="wc-ico" aria-hidden="true">🎯</div>
                <h4>Xếp lớp đúng trình độ</h4>
                <p>Phân loại sinh viên để giảng dạy hiệu quả, đúng cấp độ của từng người.</p>
              </div>
              <div className="why-card c2">
                <div className="wc-ico" aria-hidden="true">📚</div>
                <h4>Theo kịp chương trình</h4>
                <p>Đảm bảo đủ năng lực ngôn ngữ cho ngành học bằng tiếng Anh.</p>
              </div>
              <div className="why-card c3">
                <div className="wc-ico" aria-hidden="true">🧩</div>
                <h4>Định hướng lộ trình</h4>
                <p>Trượt đầu vào → tham gia lớp bổ trợ để cải thiện kỹ năng còn yếu.</p>
              </div>
            </div>

            {/* §2 Cấu trúc */}
            <h2 id="cau-truc">Cấu trúc thường gặp của đề thi</h2>
            <p>
              Mỗi trường tự quy định quy chế riêng, nhưng phần lớn bài thi đều xoay quanh{" "}
              <strong>4 kỹ năng cốt lõi</strong>: Listening, Reading, Writing và Speaking. Đề thường
              mô phỏng theo hai dạng phổ biến là <strong>CEPT</strong> (Cambridge English Placement
              Test) hoặc <strong>TOEIC</strong>.
            </p>

            {/* §2.1 CEPT */}
            <h3 id="cau-truc-cept">Cấu trúc đề thi theo dạng CEPT</h3>
            <p>
              Đề theo dạng CEPT đánh giá đầy đủ <strong>4 kỹ năng</strong>. Phần Listening &amp;
              Reading thi trên máy tính, sau đó đến Writing và Speaking:
            </p>

            <div className="skills-grid" aria-label="4 kỹ năng đề CEPT">
              <div className="skill-card listen">
                <span className="sk-blob" aria-hidden="true" />
                <div className="sk-top">
                  <span className="sk-ico" aria-hidden="true">🎧</span>
                  <span className="sk-time">45 phút (chung)</span>
                </div>
                <div>
                  <h4>Listening</h4>
                  <div className="sk-vi">Nghe hiểu</div>
                  <div className="sk-desc">Thi trên máy tính, nội dung phù hợp mọi cấp độ.</div>
                </div>
              </div>
              <div className="skill-card read">
                <span className="sk-blob" aria-hidden="true" />
                <div className="sk-top">
                  <span className="sk-ico" aria-hidden="true">📖</span>
                  <span className="sk-time">45 phút (chung)</span>
                </div>
                <div>
                  <h4>Reading</h4>
                  <div className="sk-vi">Đọc hiểu</div>
                  <div className="sk-desc">Làm chung thời gian với Listening trên máy tính.</div>
                </div>
              </div>
              <div className="skill-card write">
                <span className="sk-blob" aria-hidden="true" />
                <div className="sk-top">
                  <span className="sk-ico" aria-hidden="true">✍️</span>
                  <span className="sk-time">45 phút</span>
                </div>
                <div>
                  <h4>Writing</h4>
                  <div className="sk-vi">Viết luận</div>
                  <div className="sk-desc">Một bài viết 250–300 từ về một chủ đề cho trước.</div>
                </div>
              </div>
              <div className="skill-card speak">
                <span className="sk-blob" aria-hidden="true" />
                <div className="sk-top">
                  <span className="sk-ico" aria-hidden="true">🗣️</span>
                  <span className="sk-time">10–15 phút</span>
                </div>
                <div>
                  <h4>Speaking</h4>
                  <div className="sk-vi">Nói trực tiếp</div>
                  <div className="sk-desc">Đối đáp trực tiếp với giám khảo, gồm 3 part.</div>
                </div>
              </div>
            </div>
            <p className="fig-caption">Hình 1 — Bốn kỹ năng trong đề thi dạng CEPT</p>

            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--dark)", margin: "20px 0 8px" }}>
              Phần Speaking gồm 3 part
            </h4>
            <div className="step-flow" aria-label="3 part Speaking">
              <div className="sf-item">
                <div className="sf-num">PART 1</div>
                <h5>Giới thiệu bản thân</h5>
                <p>Tên, tuổi, quê quán, sở thích, ngành đang theo học…</p>
              </div>
              <div className="sf-arrow" aria-hidden="true">→</div>
              <div className="sf-item">
                <div className="sf-num">PART 2</div>
                <h5>Trình bày chủ đề</h5>
                <p>Nói về một chủ đề xã hội cho trước.</p>
                <span className="sf-time">⏱ 1&apos; chuẩn bị + 2&apos; trình bày</span>
              </div>
              <div className="sf-arrow" aria-hidden="true">→</div>
              <div className="sf-item">
                <div className="sf-num">PART 3</div>
                <h5>Hỏi &amp; đáp</h5>
                <p>Giám khảo đặt câu hỏi mở rộng từ chủ đề ở Part 2.</p>
              </div>
            </div>

            {/* §2.2 TOEIC */}
            <h3 id="cau-truc-toeic">Cấu trúc đề thi theo dạng TOEIC</h3>
            <p>
              Đề theo dạng TOEIC thường kiểm tra 2 kỹ năng <strong>Listening</strong> và{" "}
              <strong>Reading</strong>, với tổng cộng 200 câu hỏi chia đều cho 7 part:
            </p>

            <div className="stat-row" aria-label="Thống kê đề TOEIC">
              <div className="stat-box">
                <div className="sb-num">200</div>
                <div className="sb-lbl">câu hỏi</div>
              </div>
              <div className="stat-box alt">
                <div className="sb-num">120</div>
                <div className="sb-lbl">phút làm bài</div>
              </div>
              <div className="stat-box">
                <div className="sb-num">7</div>
                <div className="sb-lbl">part (4 nghe + 3 đọc)</div>
              </div>
            </div>

            <div className="prop-legend">
              <span>
                <span className="dot" style={{ background: "var(--blue)" }} />
                {" "}Listening — 100 câu
              </span>
              <span>
                <span className="dot" style={{ background: "var(--green)" }} />
                {" "}Reading — 100 câu
              </span>
            </div>
            <div className="prop-bar" aria-label="Tỷ lệ Listening / Reading">
              <div className="seg listen" style={{ width: "50%" }}>Nghe · 100</div>
              <div className="seg read" style={{ width: "50%" }}>Đọc · 100</div>
            </div>
            <p className="fig-caption">Hình 2 — Tỷ lệ câu hỏi Listening / Reading trong đề TOEIC</p>

            <div className="parts-block l" aria-label="Phần nghe TOEIC">
              <div className="pb-head">🎧 PHẦN NGHE — LISTENING</div>
              <div className="part-row">
                <div className="pr-tag">P1</div>
                <div className="pr-body">
                  <div className="t">Mô tả tranh</div>
                  <div className="d">Mỗi ảnh có 4 câu mô tả, chọn câu đúng nhất.</div>
                </div>
                <div className="pr-count"><b>6</b><span>câu</span></div>
              </div>
              <div className="part-row">
                <div className="pr-tag">P2</div>
                <div className="pr-body">
                  <div className="t">Hỏi — đáp</div>
                  <div className="d">Nghe câu hỏi/phát biểu, chọn 1 trong 3 phương án.</div>
                </div>
                <div className="pr-count"><b>25</b><span>câu</span></div>
              </div>
              <div className="part-row">
                <div className="pr-tag">P3</div>
                <div className="pr-body">
                  <div className="t">Hội thoại ngắn</div>
                  <div className="d">13 đoạn hội thoại, mỗi đoạn 3 câu hỏi.</div>
                </div>
                <div className="pr-count"><b>39</b><span>câu</span></div>
              </div>
              <div className="part-row">
                <div className="pr-tag">P4</div>
                <div className="pr-body">
                  <div className="t">Bài phát biểu ngắn</div>
                  <div className="d">10 đoạn độc thoại, dùng biểu đồ/hình nếu có.</div>
                </div>
                <div className="pr-count"><b>30</b><span>câu</span></div>
              </div>
            </div>

            <div className="parts-block r" aria-label="Phần đọc TOEIC">
              <div className="pb-head">📖 PHẦN ĐỌC — READING</div>
              <div className="part-row">
                <div className="pr-tag">P5</div>
                <div className="pr-body">
                  <div className="t">Hoàn thành câu</div>
                  <div className="d">Điền từ/cụm từ vào chỗ trống — từ vựng &amp; ngữ pháp.</div>
                </div>
                <div className="pr-count"><b>30</b><span>câu</span></div>
              </div>
              <div className="part-row">
                <div className="pr-tag">P6</div>
                <div className="pr-body">
                  <div className="t">Hoàn thành đoạn văn</div>
                  <div className="d">Điền chỗ trống trong 4 đoạn văn hoàn chỉnh.</div>
                </div>
                <div className="pr-count"><b>16</b><span>câu</span></div>
              </div>
              <div className="part-row">
                <div className="pr-tag">P7</div>
                <div className="pr-body">
                  <div className="t">Đọc hiểu văn bản</div>
                  <div className="d">Đọc đơn &amp; đa văn bản, suy luận chọn đáp án.</div>
                </div>
                <div className="pr-count"><b>54</b><span>câu</span></div>
              </div>
            </div>

            <div className="callout">
              <span className="ico" aria-hidden="true">💡</span>
              <div className="b">
                <strong>Lưu ý:</strong>
                Mỗi trường có thể điều chỉnh độ khó và số phần khác nhau. Hãy xác nhận chính xác cấu trúc đề của trường bạn trước khi bắt đầu ôn tập.
              </div>
            </div>

            {/* §3 Cách ôn */}
            <h2 id="cach-on">Cách ôn thi tiếng Anh đầu vào hiệu quả</h2>
            <p>
              Một lộ trình ôn tập tốt gồm <strong>3 bước</strong> rõ ràng, đi từ việc nắm cấu trúc
              đến luyện đề trong điều kiện thi thật:
            </p>

            <div className="roadmap" aria-label="Lộ trình ôn thi 3 bước">
              <div className="rm-step">
                <div className="rm-rail">
                  <div className="rm-dot">1</div>
                  <div className="rm-line" aria-hidden="true" />
                </div>
                <div className="rm-body" id="hieu-cau-truc">
                  <h4>Hiểu rõ cấu trúc đề thi</h4>
                  <p>
                    Nắm vững cấu trúc đề của trường mình dự thi. Tham khảo đề online hoặc hỏi kinh
                    nghiệm từ các anh chị khóa trước về độ khó của đề qua các năm.
                  </p>
                </div>
              </div>
              <div className="rm-step">
                <div className="rm-rail">
                  <div className="rm-dot">2</div>
                  <div className="rm-line" aria-hidden="true" />
                </div>
                <div className="rm-body" id="lap-ke-hoach">
                  <h4>Lập kế hoạch ôn tập chi tiết</h4>
                  <p>
                    Phân bổ thời gian cho từng kỹ năng, ưu tiên kỹ năng còn yếu. Kết hợp tài liệu
                    uy tín để bổ sung nền tảng từ vựng – ngữ pháp – phát âm.
                  </p>
                </div>
              </div>
              <div className="rm-step">
                <div className="rm-rail">
                  <div className="rm-dot">3</div>
                  <div className="rm-line" aria-hidden="true" />
                </div>
                <div className="rm-body" id="luyen-de">
                  <h4>Luyện đề thi mẫu</h4>
                  <p>
                    Ở giai đoạn cuối, giải đề mẫu với áp lực thời gian như thi thật để rèn kỹ năng
                    quản lý thời gian và làm quen tâm lý phòng thi.
                  </p>
                </div>
              </div>
            </div>

            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--dark)", margin: "22px 0 6px" }}>
              📕 Tài liệu tham khảo gợi ý
            </h4>
            <div className="book-grid" aria-label="Sách tham khảo">
              <div className="book-card b1">
                <div className="bc-cover" aria-hidden="true">📘</div>
                <div className="bc-body">
                  <div className="t">English Grammar in Use</div>
                  <div className="a">Raymond Murphy</div>
                </div>
              </div>
              <div className="book-card b2">
                <div className="bc-cover" aria-hidden="true">🔊</div>
                <div className="bc-body">
                  <div className="t">English Pronunciation in Use</div>
                  <div className="a">Cambridge</div>
                </div>
              </div>
              <div className="book-card b3">
                <div className="bc-cover" aria-hidden="true">🔤</div>
                <div className="bc-body">
                  <div className="t">Vocabulary in Use</div>
                  <div className="a">Cambridge</div>
                </div>
              </div>
            </div>

            {/* §4 Chiến lược */}
            <h2 id="chien-luoc">Chiến lược làm bài đạt điểm cao</h2>
            <div className="phase-split" aria-label="Chiến lược trước và trong khi thi">
              <div className="phase-card before" id="truoc-khi-thi">
                <span className="ph-tag">⏳ TRƯỚC KHI THI</span>
                <ul>
                  <li>Dành 2–3 phút đọc kỹ hướng dẫn, chú ý thời gian &amp; cách trả lời từng phần.</li>
                  <li>Chuẩn bị đồng hồ cá nhân để theo dõi thời gian.</li>
                  <li>Lên kế hoạch chia nhỏ thời gian cho từng phần và từng câu hỏi.</li>
                </ul>
              </div>
              <div className="phase-card during" id="trong-khi-thi">
                <span className="ph-tag">✏️ TRONG LÚC LÀM BÀI</span>
                <ul>
                  <li>Làm câu chắc chắn trước, quay lại câu khó sau.</li>
                  <li>Trắc nghiệm không biết đáp án thì đoán, đừng để trống.</li>
                  <li>Còn thời gian thì kiểm tra lại toàn bộ, không bỏ sót câu nào.</li>
                </ul>
              </div>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--dark)", margin: "22px 0 10px" }}>
              Mẹo theo từng kỹ năng
            </h3>
            <div className="tip-grid" aria-label="Mẹo làm bài theo kỹ năng">
              <div className="tip-card listen">
                <div className="tc-head">
                  <span className="ic" aria-hidden="true">🎧</span>
                  <span className="nm">Listening</span>
                </div>
                <p>Tận dụng thời gian tạm ngưng giữa các part để đọc lướt trước câu hỏi, xác định chủ đề và từ khóa quan trọng.</p>
              </div>
              <div className="tip-card read">
                <div className="tc-head">
                  <span className="ic" aria-hidden="true">📖</span>
                  <span className="nm">Reading</span>
                </div>
                <p>Câu khó đòi hỏi suy luận — đừng chỉ dựa vào từ khóa, hãy đọc hiểu toàn bộ văn bản, chú ý chi tiết như ngày tháng, tiêu đề, từ đồng/trái nghĩa.</p>
              </div>
              <div className="tip-card write">
                <div className="tc-head">
                  <span className="ic" aria-hidden="true">✍️</span>
                  <span className="nm">Writing</span>
                </div>
                <p>Dành vài phút lập dàn ý để bài có cấu trúc rõ ràng. Kiểm tra lại lỗi chính tả, ngữ pháp và điều chỉnh số lượng từ đúng quy định.</p>
              </div>
              <div className="tip-card speak">
                <div className="tc-head">
                  <span className="ic" aria-hidden="true">🗣️</span>
                  <span className="nm">Speaking</span>
                </div>
                <p>Duy trì giao tiếp mắt với giám khảo, nói tự nhiên và biết kết hợp ngôn ngữ cơ thể để thể hiện sự tự tin.</p>
              </div>
            </div>

            <div className="callout" style={{ background: "var(--red-light)", borderColor: "#FECACA" }}>
              <span className="ico" aria-hidden="true">⚠️</span>
              <div className="b">
                <strong>Lỗi thường gặp:</strong>
                Dành quá nhiều thời gian cho một câu khó khiến thiếu thời gian cho các phần sau. Hãy bỏ qua và quay lại sau khi đã hoàn thành các câu dễ.
              </div>
            </div>

            {/* Required CTA to vào 10 */}
            <div className="inline-cta">
              <div className="ico" aria-hidden="true">📚</div>
              <div className="copy">
                <h4>Tổng hợp đề thi vào lớp 10 tiếng Anh 2026</h4>
                <p>34 tỉnh thành — đề chính thức có đáp án, tra cứu miễn phí.</p>
              </div>
              <Link className="go-btn" href="/de-chinh-thuc-vao-10-2026">
                Xem đề vào 10 →
              </Link>
            </div>

            {/* §5 Tổng kết */}
            <h2 id="tong-ket">Tổng kết</h2>
            <p>
              Hiểu đúng <strong>cấu trúc đề thi</strong>, xây dựng <strong>kế hoạch ôn tập</strong>{" "}
              hợp lý và rèn <strong>chiến lược làm bài</strong> chính là ba yếu tố then chốt giúp bạn
              tự tin vượt qua kỳ thi tiếng Anh đầu vào đại học. Chúc bạn ôn thi hiệu quả và đạt điểm cao!
            </p>
          </article>
        </main>

        <aside className="sidebar-right" aria-label="Thông tin bổ sung">
          {/* Related articles */}
          <div className="side-card">
            <div className="head">
              <h4>Bài viết liên quan</h4>
              <Link href="/bai-viet">Tất cả ›</Link>
            </div>
            <div className="related-list">
              <Link className="related-item" href="/bai-viet">
                <div className="thumb" aria-hidden="true">🎧</div>
                <div className="title">Mẹo làm bài Listening TOEIC: cách nghe và bắt từ khóa hiệu quả</div>
              </Link>
              <Link className="related-item" href="/bai-viet">
                <div className="thumb t2" aria-hidden="true">📖</div>
                <div className="title">Chiến thuật làm Reading: đọc hiểu toàn văn bản thay vì dò từ khóa</div>
              </Link>
              <Link className="related-item" href="/bai-viet">
                <div className="thumb t3" aria-hidden="true">✍️</div>
                <div className="title">Cách lập dàn ý &amp; viết bài luận 250–300 từ trong 45 phút</div>
              </Link>
              <Link className="related-item" href="/bai-viet">
                <div className="thumb t4" aria-hidden="true">🗣️</div>
                <div className="title">Luyện Speaking đầu vào: trả lời 3 part tự tin, tự nhiên</div>
              </Link>
              <Link className="related-item" href="/bai-viet">
                <div className="thumb t5" aria-hidden="true">📝</div>
                <div className="title">Lộ trình ôn TOEIC cấp tốc trong 1 tháng cho tân sinh viên</div>
              </Link>
            </div>
          </div>

          {/* Luyện đề CTA */}
          <div className="cta-card">
            <div className="icon-rocket" aria-hidden="true">🚀</div>
            <h4>Luyện đề ngay!</h4>
            <p>Kho đề luyện thi tiếng Anh đầu vào đại học, TOEIC &amp; IELTS có đáp án chi tiết.</p>
            <Link className="btn-go" href="/kho-de-thi">
              Vào kho đề thi →
            </Link>
          </div>

          {/* Email signup */}
          <div className="side-card signup-card">
            <h4>📬 Nhận bài mới mỗi tuần</h4>
            <p className="desc">Đăng ký để không bỏ lỡ bài học hữu ích từ đội ngũ istudy.</p>
            <NewsletterForm />
          </div>
        </aside>
      </div>

      {/* Post-article section */}
      <div className="post-article">
        <article className="panel article-body">
          {/* Checklist exercise card */}
          <h2 id="bai-tap">Checklist tự kiểm tra trước khi thi</h2>
          <div className="exercise-card">
            <h4>✅ 7 việc cần làm để sẵn sàng cho phòng thi</h4>
            <ol>
              <li>Xác nhận chính xác <strong>cấu trúc đề</strong> của trường (CEPT hay TOEIC, số phần, thời gian).</li>
              <li>Lập <strong>thời gian biểu ôn tập</strong> theo từng kỹ năng, ưu tiên kỹ năng yếu.</li>
              <li>Giải ít nhất <strong>2–3 đề mẫu</strong> có bấm giờ như thi thật.</li>
              <li>Ôn lại <strong>từ vựng – ngữ pháp</strong> nền tảng (Grammar/Vocabulary in Use).</li>
              <li>Chuẩn bị <strong>đồng hồ cá nhân</strong> và giấy tờ, dụng cụ cần thiết.</li>
              <li>Luyện <strong>nghe mỗi ngày</strong> 15–20 phút để quen tốc độ người bản ngữ.</li>
              <li>Ngủ đủ giấc trước ngày thi, giữ tâm lý thoải mái.</li>
            </ol>
            <details style={{ marginTop: "14px" }}>
              <summary style={{ cursor: "pointer", color: "var(--red)", fontWeight: 700, fontSize: "13px" }}>
                ▾ Xem gợi ý phân bổ thời gian ôn
              </summary>
              <ol style={{ marginTop: "10px", color: "var(--green)", fontWeight: 600 }}>
                <li>Tuần 1–2: Nắm cấu trúc + ôn nền tảng từ vựng/ngữ pháp</li>
                <li>Tuần 3: Tập trung Listening &amp; Reading theo từng part</li>
                <li>Tuần 4: Luyện đề toàn diện, bấm giờ, rà soát lỗi</li>
              </ol>
            </details>
          </div>

          {/* Inline CTA to kho de thi */}
          <div className="inline-cta">
            <div className="ico" aria-hidden="true">🚀</div>
            <div className="copy">
              <h4>Sẵn sàng thử sức với đề thật?</h4>
              <p>Kho đề luyện thi tiếng Anh có đáp án &amp; lời giải chi tiết, làm online ngay.</p>
            </div>
            <Link className="go-btn" href="/kho-de-thi">
              Luyện đề ngay →
            </Link>
          </div>

          {/* Article tags */}
          <div className="article-tags" aria-label="Tag bài viết">
            <span>#on-thi-dau-vao</span>
            <span>#tieng-anh-dai-hoc</span>
            <span>#cept</span>
            <span>#toeic</span>
            <span>#chien-luoc-lam-bai</span>
          </div>

          {/* Author bio */}
          <div className="author-bio">
            <div className="ava" aria-hidden="true">IS</div>
            <div>
              <div className="n">istudy Team</div>
              <div className="r">Đội ngũ biên soạn nội dung • aistudy.com.vn</div>
              <p className="d">
                Chuyên xây dựng tài liệu luyện thi tiếng Anh — từ đầu vào đại học đến TOEIC/IELTS,
                bám sát cấu trúc đề mới nhất với phương pháp học chủ động.
              </p>
            </div>
          </div>
        </article>

        {/* Comments */}
        <section className="panel comments-card" id="binh-luan" aria-label="Bình luận">
          <div className="head">
            <span className="ico" aria-hidden="true">💬</span>
            {" "}Bình luận
          </div>
          <Comments slug={SLUG} />
        </section>
      </div>

      <Footer />
    </>
  );
}
