import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { KET_QUA_CSS } from "@/lib/page-css/ket-qua";

export const metadata = { title: "Kết quả bài thi — istudy" };

const wrong = new Set([3, 14, 24, 26, 33, 37, 39]);

const sections = [
  { name: "Phần I — Trắc nghiệm ngữ pháp", desc: "Phonetics, stress, grammar, vocabulary", ratio: "13/14", pct: 92, color: "var(--green)" },
  { name: "Phần II — Đọc biển báo", desc: "", ratio: "2/2", pct: 100, color: "var(--green)" },
  { name: "Phần III — Điền từ vào đoạn văn", desc: "", ratio: "5/6", pct: 83, color: "#22C55E" },
  { name: "Phần IV — Đọc hiểu True/False", desc: "Đờn ca tài tử heritage leaflet", ratio: "4/6", pct: 67, color: "#F59E0B" },
  { name: "Phần V — Word Form", desc: "", ratio: "5/6", pct: 83, color: "#22C55E" },
  { name: "Phần VI — Tra từ điển", desc: "", ratio: "2/2", pct: 100, color: "var(--green)" },
  { name: "Phần VII — Viết lại câu", desc: "", ratio: "2/4", pct: 50, color: "#EF4444" },
];

export default function KetQuaPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KET_QUA_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="container-sm">
          <div className="result-hero">
            <div className="lbl">✅ Hoàn thành bài thi</div>
            <h1>
              Chúc mừng! Bạn đã hoàn thành đề tham khảo
              <br />
              lớp 10 TP.HCM 2026 — Môn Tiếng Anh
            </h1>
            <p className="sub">Thực hiện ngày 12/05/2026 · Thời gian làm: 68 phút 24 giây</p>
            <div className="score-row">
              <div className="big-score">
                8.25<span className="frac">/10</span>
              </div>
              <div className="score-meta">
                <div className="grade">🌟 Giỏi</div>
                <div className="pct">Trả lời đúng 33/40 câu (82.5%)</div>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="ico" style={{ background: "var(--green-bg)", color: "var(--green)" }}>✓</div>
              <div>
                <div className="v">33</div>
                <div className="l">Câu đúng</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="ico" style={{ background: "var(--red-light)", color: "var(--red)" }}>✗</div>
              <div>
                <div className="v">7</div>
                <div className="l">Câu sai</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="ico" style={{ background: "#FEF3C7", color: "#D97706" }}>⏱</div>
              <div>
                <div className="v">68:24</div>
                <div className="l">Thời gian</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="ico" style={{ background: "#DBEAFE", color: "var(--blue)" }}>📊</div>
              <div>
                <div className="v">Top 12%</div>
                <div className="l">Xếp hạng</div>
              </div>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <h2>📊 Phân tích theo phần</h2>
              {sections.map((s) => (
                <div className="section-row" key={s.name}>
                  <div className="name">
                    {s.name}
                    {s.desc && <div className="desc">{s.desc}</div>}
                  </div>
                  <div className="bar-wrap">
                    <div className="bar" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                  <div className="ratio">{s.ratio}</div>
                </div>
              ))}
            </div>

            <div className="card compare-card">
              <h2>📈 So sánh với cộng đồng</h2>
              <div className="you-line"><span>Điểm trung bình toàn quốc</span><span className="v">6.42</span></div>
              <div className="you-line"><span>Điểm trung bình TP.HCM</span><span className="v">7.08</span></div>
              <div className="you-line"><span>Điểm của bạn</span><span className="v good">8.25 ⬆</span></div>
              <div className="you-line"><span>Thời gian TB cộng đồng</span><span className="v">82 phút</span></div>
              <div className="you-line"><span>Thời gian của bạn</span><span className="v good">68 phút ⚡</span></div>
              <div className="you-line"><span>Lần làm thứ</span><span className="v">2 / 5</span></div>
              <Link href="/lam-bai" className="btn btn--outline btn--small" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>
                🔄 Làm lại đề này
              </Link>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h2>🗺️ Chi tiết từng câu</h2>
            <div className="qmap-result">
              {Array.from({ length: 40 }, (_, i) => i + 1).map((i) => (
                <div key={i} className={wrong.has(i) ? "x" : "ok"} title={`Câu ${i}`}>
                  {i}
                </div>
              ))}
            </div>
            <div className="qmap-legend">
              <div><span className="dot" style={{ background: "#D1FAE5", border: "1px solid #BBF7D0" }} /> Đúng (33 câu)</div>
              <div><span className="dot" style={{ background: "#FEE2E2", border: "1px solid #FECACA" }} /> Sai (7 câu)</div>
              <div><span className="dot" style={{ background: "var(--g100)", border: "1px solid var(--g200)" }} /> Bỏ trống (0 câu)</div>
            </div>
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <Link href="/dap-an" className="btn btn--green btn--small">📖 Xem giải thích chi tiết</Link>
            </div>
          </div>

          <div className="recs">
            <h2>💡 Đề xuất học tiếp dành riêng cho bạn</h2>
            <div className="rec-grid">
              <Link href="/bai-viet-chi-tiet" className="rec-card">
                <div className="ico">📝</div>
                <h3>Củng cố: Viết lại câu — Cấu trúc cơ bản phải nhớ</h3>
                <p>Phần bạn yếu nhất (2/4). Bài viết tổng hợp 20 cấu trúc transformation thường gặp.</p>
              </Link>
              <Link href="/bai-viet-chi-tiet" className="rec-card">
                <div className="ico">📖</div>
                <h3>Kỹ thuật đọc hiểu True/False trong 5 phút</h3>
                <p>Sai 2 câu T/F. Học kỹ thuật scan keyword và bẫy &quot;no information given&quot;.</p>
              </Link>
              <Link href="/kho-de-thi" className="rec-card">
                <div className="ico">🎯</div>
                <h3>Đề thi thử lớp 10 Hà Nội 2026 — Đề số 15</h3>
                <p>Phù hợp với trình độ hiện tại của bạn. Đề tương tự về độ khó và cấu trúc.</p>
              </Link>
            </div>
          </div>

          <div className="cta-row">
            <Link href="/kho-de-thi" className="btn btn--primary">🎯 Làm đề khác</Link>
            <Link href="/dap-an" className="btn btn--outline">📖 Xem đáp án &amp; giải thích</Link>
            <a href="#" className="btn">↗ Chia sẻ kết quả</a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
