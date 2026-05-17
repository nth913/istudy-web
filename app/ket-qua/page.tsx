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
          <nav className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="sep">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link>
            <span className="sep">›</span>
            <Link href="/de-thi-chi-tiet">TP.HCM 2026</Link>
            <span className="sep">›</span>
            <span className="current">Kết quả</span>
          </nav>

          <div className="result-card">
            <div className="ring-wrap">
              <svg viewBox="0 0 120 120">
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
                      strokeDashoffset: RING_TO,
                    } as React.CSSProperties
                  }
                />
              </svg>
              <div className="ring-text">
                <div className="num">{CORRECT}</div>
                <div className="denom">/{TOTAL} câu</div>
              </div>
            </div>

            <h1 className="result-title">Kết quả: {pctLabel}% — {GRADE_LABEL}</h1>
            <p className="result-sub">{TITLE_TEXT} • Thời gian: {TIME}</p>

            <div className="stat-tiles">
              <div className="stat-tile s-correct">
                <div className="v">{CORRECT}</div>
                <div className="l">Đúng</div>
              </div>
              <div className="stat-tile s-wrong">
                <div className="v">{WRONG}</div>
                <div className="l">Sai</div>
              </div>
              <div className="stat-tile s-skip">
                <div className="v">{SKIPPED}</div>
                <div className="l">Bỏ qua</div>
              </div>
              <div className="stat-tile s-score">
                <div className="v">{SCORE}</div>
                <div className="l">Điểm</div>
              </div>
            </div>

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
