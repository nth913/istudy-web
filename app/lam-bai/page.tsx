"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LAM_BAI_CSS } from "@/lib/page-css/lam-bai";

const done = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13];
const flag = [9, 14];
const CURRENT = 5;

export default function LamBaiPage() {
  const [selected, setSelected] = useState<string>("B");
  const [seconds, setSeconds] = useState(72 * 60 + 14);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LAM_BAI_CSS }} />
      <header className="exam-header">
        <div className="left">
          <Link href="/kho-de-thi" className="logo-mini">←</Link>
          <div>
            <h1>Đề tham khảo lớp 10 TP.HCM 2026 — Môn Tiếng Anh</h1>
            <div className="sub">40 câu • 90 phút • Bắt đầu: 10:23 AM</div>
          </div>
        </div>
        <div className="timer-box">
          <div className="timer">
            <div className="l">⏱ Thời gian còn lại</div>
            <div className="v">{mm}:{ss}</div>
          </div>
          <Link href="/ket-qua" className="btn btn--primary">Nộp bài</Link>
        </div>
      </header>

      <div className="exam-layout">
        <div className="question-area">
          <div className="q-section">PHẦN I — TRẮC NGHIỆM NGỮ PHÁP</div>
          <div className="q-progress">Câu <strong>5</strong> / 40</div>
          <p className="q-text">
            <strong>Helen:</strong> You seem to be busy with something. What&apos;s that, Sam?
            <br />
            <strong>Sam:</strong> I _________ an article about our school festival.
          </p>

          <div className="options">
            {[
              { letter: "A", text: "wrote" },
              { letter: "B", text: "am writing" },
              { letter: "C", text: "write" },
              { letter: "D", text: "have written" },
            ].map((o) => (
              <div
                key={o.letter}
                className={`option${selected === o.letter ? " selected" : ""}`}
                onClick={() => setSelected(o.letter)}
              >
                <div className="letter">{o.letter}</div>
                <div>{o.text}</div>
              </div>
            ))}
          </div>

          <div className="q-nav">
            <div className="left-btns">
              <button className="btn btn--outline">← Câu trước</button>
              <button className="btn">🚩 Đánh dấu</button>
            </div>
            <button className="btn btn--primary">Câu tiếp →</button>
          </div>
        </div>

        <aside>
          <div className="panel">
            <h3>Bảng câu hỏi</h3>
            <div className="panel-stats">
              <div>
                <div className="v" style={{ color: "var(--green)" }}>12</div>
                <div className="l">Đã làm</div>
              </div>
              <div>
                <div className="v" style={{ color: "var(--g400)" }}>28</div>
                <div className="l">Còn lại</div>
              </div>
            </div>
            <div className="qmap">
              {Array.from({ length: 40 }, (_, i) => i + 1).map((i) => {
                let cls = "";
                if (i === CURRENT) cls = "current";
                else if (flag.includes(i)) cls = "flag";
                else if (done.includes(i)) cls = "done";
                return (
                  <div key={i} className={cls}>
                    {i}
                  </div>
                );
              })}
            </div>
            <div className="legend">
              <div>
                <span className="dot" style={{ background: "var(--green-bg)", border: "1px solid #BBF7D0" }} /> Đã trả lời
              </div>
              <div>
                <span className="dot" style={{ background: "var(--red)" }} /> Câu hiện tại
              </div>
              <div>
                <span className="dot" style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }} /> Đánh dấu xem lại
              </div>
              <div>
                <span className="dot" style={{ background: "var(--g50)", border: "1px solid var(--g200)" }} /> Chưa làm
              </div>
            </div>
            <Link
              href="/ket-qua"
              className="btn btn--primary btn--small"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Nộp bài ngay
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
