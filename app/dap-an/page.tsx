"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DAP_AN_CSS } from "@/lib/page-css/dap-an";

type Question = {
  cau: number;
  pillClass?: "is-short" | "is-write";
  type: string;
  topicEmoji: string;
  topic: string;
  relatedHref?: string;
  stem: React.ReactNode;
  options?: { letter: string; text: string; correct?: boolean }[];
  answerBanner?: { label: string; value: string; variant?: "is-false" };
  explanation: React.ReactNode;
};

const questions: Question[] = [
  {
    cau: 1,
    type: "Hoàn thành câu",
    topicEmoji: "📗",
    topic: "Câu điều kiện loại 2",
    relatedHref: "#",
    stem: <>If I _______ enough money, I would buy a new laptop next month.</>,
    options: [
      { letter: "A", text: "have" },
      { letter: "B", text: "had", correct: true },
      { letter: "C", text: "have had" },
      { letter: "D", text: "will have" },
    ],
    explanation: (
      <>
        <p><strong>Câu điều kiện loại 2</strong> diễn tả điều không có thật ở hiện tại / tương lai.</p>
        <ul>
          <li>Công thức: <strong>If + S + V(quá khứ đơn), S + would + V(bare)</strong>.</li>
          <li>Vế sau là &quot;would buy&quot; → vế if bắt buộc dùng <strong>quá khứ đơn</strong>.</li>
          <li>Đáp án: <strong>B. had</strong>.</li>
        </ul>
        <div className="tip">💡 Mẹo: thấy &quot;would/could + V&quot; ở vế sau, vế if đi với quá khứ đơn.</div>
      </>
    ),
  },
  {
    cau: 2,
    type: "Hoàn thành câu",
    topicEmoji: "📘",
    topic: "Mệnh đề quan hệ",
    relatedHref: "#",
    stem: <>My sister, _______ lives in Hanoi, is a doctor.</>,
    options: [
      { letter: "A", text: "that" },
      { letter: "B", text: "who", correct: true },
      { letter: "C", text: "which" },
      { letter: "D", text: "whom" },
    ],
    explanation: (
      <ul>
        <li>Đây là <strong>mệnh đề quan hệ không xác định</strong> (có dấu phẩy).</li>
        <li>&quot;My sister&quot; là người và đóng vai trò chủ ngữ trong mệnh đề quan hệ → dùng <strong>who</strong>.</li>
        <li>Không dùng &quot;that&quot; trong mệnh đề có phẩy.</li>
      </ul>
    ),
  },
  {
    cau: 3,
    type: "Hoàn thành câu",
    topicEmoji: "📕",
    topic: "Từ vựng · Tính từ ed/ing",
    stem: <>She is very _______ about her new job at the publishing company.</>,
    options: [
      { letter: "A", text: "excite" },
      { letter: "B", text: "exciting" },
      { letter: "C", text: "excited", correct: true },
      { letter: "D", text: "excitement" },
    ],
    explanation: (
      <>
        <ul>
          <li>Sau &quot;be&quot; + giới từ &quot;about&quot; → cần <strong>tính từ</strong>.</li>
          <li><strong>excited</strong> (cảm thấy hào hứng) tả cảm xúc của <em>người</em>.</li>
          <li><strong>exciting</strong> tả tính chất của <em>vật / việc</em>.</li>
          <li>Chủ ngữ là &quot;she&quot; → chọn <strong>excited</strong>.</li>
        </ul>
        <div className="vocab">
          <div><span className="w">excited (adj)</span><span>cảm thấy hào hứng</span></div>
          <div><span className="w">exciting (adj)</span><span>thú vị, làm người khác hào hứng</span></div>
        </div>
      </>
    ),
  },
  {
    cau: 6,
    type: "Tìm từ đồng nghĩa",
    topicEmoji: "📕",
    topic: "Từ vựng · Tính từ",
    relatedHref: "#",
    stem: (
      <>
        Choose the word CLOSEST in meaning to the underlined word.
        <br />
        The professor&apos;s lecture was extremely <u>fascinating</u> and kept everyone engaged.
      </>
    ),
    options: [
      { letter: "A", text: "boring" },
      { letter: "B", text: "captivating", correct: true },
      { letter: "C", text: "ordinary" },
      { letter: "D", text: "confusing" },
    ],
    explanation: (
      <>
        <ul>
          <li><strong>fascinating</strong> = rất hấp dẫn, lôi cuốn.</li>
          <li>Từ đồng nghĩa gần nhất là <strong>captivating</strong> (lôi cuốn).</li>
        </ul>
        <div className="vocab">
          <div><span className="w">fascinating</span><span>= captivating, intriguing, gripping</span></div>
          <div><span className="w">boring</span><span>(trái nghĩa) nhàm chán</span></div>
        </div>
      </>
    ),
  },
  {
    cau: 9,
    pillClass: "is-short",
    type: "Chia động từ",
    topicEmoji: "📗",
    topic: "Quá khứ hoàn thành",
    relatedHref: "#",
    stem: <>By the time we arrived at the cinema, the movie <em>(start)</em> ____ for half an hour.</>,
    answerBanner: { label: "Đáp án:", value: "had started" },
    explanation: (
      <ul>
        <li><strong>Quá khứ hoàn thành</strong> diễn tả hành động xảy ra trước một thời điểm trong quá khứ.</li>
        <li>&quot;arrived&quot; là quá khứ đơn → hành động trước đó (start) cần <strong>had + V(p2)</strong> = <strong>had started</strong>.</li>
      </ul>
    ),
  },
];

function QCard({ q }: { q: Question }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`qcard${open ? " open" : ""}`}>
      <div className="qhead-bar">
        <div className="qhead-meta">
          <span className={`pill-cau${q.pillClass ? " " + q.pillClass : ""}`}>Câu {q.cau}</span>
          <span className="pill-type">{q.type}</span>
          <span className="pill-topic">
            <span className="emo">{q.topicEmoji}</span>
            {q.topic}
          </span>
        </div>
        {q.relatedHref && (
          <a className="related-link" href={q.relatedHref}>
            Xem ngữ pháp liên quan
          </a>
        )}
      </div>
      <div className="qbody-wrap">
        <p className="qstem">{q.stem}</p>

        {q.options && (
          <div className="opts">
            {q.options.map((o) => (
              <div className={`opt${o.correct ? " right" : ""}`} key={o.letter}>
                {o.correct && <span className="check">✓</span>}
                <span className="lt">{o.letter}.</span> {o.text}
              </div>
            ))}
          </div>
        )}

        {q.answerBanner && (
          <div className={`answer-banner${q.answerBanner.variant ? " " + q.answerBanner.variant : ""}`}>
            <span className="icon">✓</span>
            <div>
              <div className="lbl">{q.answerBanner.label}</div>
              <div className="val">{q.answerBanner.value}</div>
            </div>
          </div>
        )}

        <button className="expl-toggle" onClick={() => setOpen((o) => !o)}>
          💡 <span className="lbl">Xem giải thích chi tiết</span>
          <span className="chev">▼</span>
        </button>
        <div className="expl-body">
          <div className="expl-content">
            <div className="expl-title">🍎 Giải thích</div>
            {q.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DapAnPage() {
  const [tab, setTab] = useState<"detail" | "key" | "image">("detail");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DAP_AN_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="container-sm">
          <nav className="breadcrumb">
            <Link href="/">Trang chủ</Link><span className="sep">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link><span className="sep">›</span>
            <Link href="/de-thi-chi-tiet">Đề tham khảo TP.HCM 2026</Link><span className="sep">›</span>
            <span className="current">Đáp án</span>
          </nav>

          <div className="head-card">
            <span className="tag">✅ Đáp án chính thức từ istudy</span>
            <h1>Đáp án — Đề tham khảo lớp 10 TP.HCM 2026</h1>
            <p className="sub">Môn Tiếng Anh • 50 câu • Có giải thích chi tiết cho từng câu</p>
            <div className="head-actions">
              <Link href="/de-thi-chi-tiet" className="btn btn--outline">← Xem lại đề thi</Link>
              <Link href="/lam-bai" className="btn btn--primary">📝 Làm bài online</Link>
              <a href="#" className="btn btn--outline">⬇️ Tải đáp án PDF</a>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-mini"><div className="v">50</div><div className="l">Tổng câu</div></div>
            <div className="stat-mini g"><div className="v">13</div><div className="l">Dạng bài</div></div>
            <div className="stat-mini b"><div className="v">10pt</div><div className="l">Điểm tối đa</div></div>
            <div className="stat-mini p"><div className="v">90&apos;</div><div className="l">Thời gian</div></div>
          </div>

          <div className="tabs" role="tablist">
            <button className={`tab-btn${tab === "detail" ? " active" : ""}`} onClick={() => setTab("detail")}>📖 Đáp án chi tiết</button>
            <button className={`tab-btn${tab === "key" ? " active" : ""}`} onClick={() => setTab("key")}>📋 Bảng đáp án</button>
            <button className={`tab-btn${tab === "image" ? " active" : ""}`} onClick={() => setTab("image")}>🖼️ Ảnh đáp án</button>
          </div>

          <div className={`tab-pane${tab === "detail" ? " active" : ""}`}>
            <div className="huongdan">
              💡 <strong>Hướng dẫn:</strong> Mỗi câu hiện đầy đủ câu hỏi, các lựa chọn và đáp án đúng được highlight. Nhấn{" "}
              <strong>&quot;Xem giải thích chi tiết&quot;</strong> để mở rộng phần giải thích từng câu.
            </div>
            {questions.map((q) => (
              <QCard key={q.cau} q={q} />
            ))}
          </div>

          <div className={`tab-pane${tab === "key" ? " active" : ""}`}>
            <div className="key-board">
              <div className="key-title">
                ĐÁP ÁN — ĐỀ THAM KHẢO LỚP 10 TP.HCM 2026
                <div className="ln">Môn Tiếng Anh · 40 câu</div>
              </div>
              <div className="key-grid">
                {Array.from({ length: 40 }, (_, i) => i + 1).map((n) => (
                  <div key={n}>
                    <span className="n">{n}.</span>
                    <span className="a">{["A", "B", "C", "D"][n % 4]}</span>
                  </div>
                ))}
              </div>
              <div className="key-foot">© istudy.group — Đáp án tham khảo</div>
            </div>
          </div>

          <div className={`tab-pane${tab === "image" ? " active" : ""}`}>
            <div className="img-tab">
              <div style={{ fontSize: 64, marginBottom: 12 }}>🖼️</div>
              <div className="cap">Ảnh đáp án chính thức từ Sở GD&amp;ĐT TP.HCM</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
