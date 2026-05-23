import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { KET_QUA_CSS } from "@/lib/page-css/ket-qua";

export const metadata = { title: "Kết quả bài thi — istudy" };

const CORRECT = 32;
const TOTAL = 40;
const WRONG = 8;
const SKIPPED = 0;
const SCORE = "8.0";
const TIME = "72:15 phút";
const TITLE_TEXT = "Đề tham khảo lớp 10 TP.HCM 2026";
const GRADE_LABEL = "Xuất sắc! 🎉";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PCT = CORRECT / TOTAL;
const RING_TO = CIRCUMFERENCE * (1 - PCT);

export default function KetQuaPage() {
  const pctLabel = Math.round(PCT * 100);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KET_QUA_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="container-sm">
          <nav className="breadcrumb" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span className="sep" aria-hidden="true">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link>
            <span className="sep" aria-hidden="true">›</span>
            <Link href="/de-thi-chi-tiet">TP.HCM 2026</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">Kết quả</span>
          </nav>

          <div className="result-card">
            <div
              className="ring-wrap"
              role="img"
              aria-label={`Đúng ${CORRECT} trên ${TOTAL} câu, ${pctLabel}%`}
            >
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle className="ring-bg" cx="60" cy="60" r={RADIUS} />
                <circle
                  className="ring-fg"
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  strokeDasharray={CIRCUMFERENCE}
                  style={
                    {
                      "--ring-from": `${CIRCUMFERENCE}`,
                      "--ring-to": `${RING_TO}`,
                    } as React.CSSProperties
                  }
                />
              </svg>
              <div className="ring-text" aria-hidden="true">
                <div className="num">{CORRECT}</div>
                <div className="denom">/{TOTAL} câu</div>
              </div>
            </div>

            <h1 className="result-title">Kết quả: {pctLabel}% — {GRADE_LABEL}</h1>
            <p className="result-sub">{TITLE_TEXT} • Thời gian: {TIME}</p>

            <dl className="stat-tiles" aria-label="Thống kê bài làm">
              <div className="stat-tile s-correct">
                <dd className="v">{CORRECT}</dd>
                <dt className="l">Đúng</dt>
              </div>
              <div className="stat-tile s-wrong">
                <dd className="v">{WRONG}</dd>
                <dt className="l">Sai</dt>
              </div>
              <div className="stat-tile s-skip">
                <dd className="v">{SKIPPED}</dd>
                <dt className="l">Bỏ qua</dt>
              </div>
              <div className="stat-tile s-score">
                <dd className="v">{SCORE}</dd>
                <dt className="l">Điểm</dt>
              </div>
            </dl>

            <div className="actions-row">
              <Link href="/de-thi-chi-tiet" className="act-btn">📄 Xem lại đề</Link>
              <Link href="/dap-an" className="act-btn">✅ Đáp án đầy đủ</Link>
              <Link href="/dap-an" className="act-btn act-btn--primary">📋 Chi tiết từng câu</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
