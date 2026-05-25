"use client";

/**
 * Live countdown for the cho-de waiting page.
 *
 * Three sub-states inside the broader `pre` content state:
 *  - before exam start  → counts DOWN to examStartTime
 *  - during exam window → counts DOWN to examEndTime, "đang trong giờ thi"
 *  - after examEndTime  → counts UP from examEndTime, "đang nhập đề"
 *
 * Uses a semantic <time> element with a machine-readable `dateTime` attribute
 * for the primary target so screen-readers and indexers can pick it up.
 */
import { useEffect, useMemo, useRef, useState } from "react";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

interface Phase {
  kind: "before" | "during" | "after";
  /** Short label shown above the clock per chat14 spec. */
  label: string;
  d: number;
  h: number;
  m: number;
  s: number;
  message: React.ReactNode;
}

function computePhase(startMs: number, endMs: number, now: number): Phase {
  if (now < startMs) {
    let diff = startMs - now;
    const d = Math.floor(diff / 86_400_000); diff -= d * 86_400_000;
    const h = Math.floor(diff / 3_600_000);  diff -= h * 3_600_000;
    const m = Math.floor(diff / 60_000);     diff -= m * 60_000;
    const s = Math.floor(diff / 1000);
    const dayDiff = Math.floor((startMs - now) / 86_400_000);
    let message: React.ReactNode;
    if (dayDiff <= 0) {
      message = <span><b>Kỳ thi sẽ bắt đầu hôm nay.</b> Hãy ở yên trang này hoặc bật thông báo để biết đề ngay khi có.</span>;
    } else if (dayDiff === 1) {
      message = <span><b>Còn 1 ngày nữa.</b> Ngủ sớm, chuẩn bị bút giấy, mai gặp đề tại đây.</span>;
    } else {
      message = <span><b>Còn {dayDiff} ngày.</b> Đặt lịch nhắc để chắc chắn không bỏ lỡ giờ G.</span>;
    }
    return { kind: "before", label: "Còn", d, h, m, s, message };
  }
  if (now <= endMs) {
    let diff = endMs - now;
    // During-exam: zero out days (design v2 sets cd.d = 0).
    const h = Math.floor(diff / 3_600_000);  diff -= h * 3_600_000;
    const m = Math.floor(diff / 60_000);     diff -= m * 60_000;
    const s = Math.floor(diff / 1000);
    return {
      kind: "during",
      label: "Đang diễn ra · còn",
      d: 0,
      h,
      m,
      s,
      message: (
        <span>
          <b>Đang trong giờ thi.</b> Đề sẽ được mở khi kỳ thi chính thức kết thúc.
        </span>
      ),
    };
  }
  // After-end: count UP from examEnd (zero out days per design v2).
  let diff = now - endMs;
  const h = Math.floor(diff / 3_600_000);  diff -= h * 3_600_000;
  const m = Math.floor(diff / 60_000);     diff -= m * 60_000;
  const s = Math.floor(diff / 1000);
  return {
    kind: "after",
    label: "Đề đang cập nhật · đã",
    d: 0,
    h,
    m,
    s,
    message: (
      <span>
        <b>Giờ thi đã kết thúc.</b> Đội ngũ istudy đang nhập đề lên hệ thống — thường mất 30–60 phút. Trang sẽ tự chuyển sang đề khi sẵn sàng.
      </span>
    ),
  };
}

interface ChoDeCountdownProps {
  examStartTime: string;
  examEndTime: string;
  startHHmm: string;
  endHHmm: string;
}

export function ChoDeCountdown({
  examStartTime,
  examEndTime,
}: ChoDeCountdownProps) {
  const startMs = useMemo(() => new Date(examStartTime).getTime(), [examStartTime]);
  const endMs = useMemo(() => new Date(examEndTime).getTime(), [examEndTime]);

  // Render SSR with examStartTime as the target — clients tick on mount.
  const [phase, setPhase] = useState<Phase>(() =>
    computePhase(startMs, endMs, Date.now()),
  );
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => setPhase(computePhase(startMs, endMs, Date.now()));
    tick();
    timerRef.current = window.setInterval(tick, 1000);
    return () => {
      if (timerRef.current != null) window.clearInterval(timerRef.current);
    };
  }, [startMs, endMs]);

  const targetIso = phase.kind === "before" ? examStartTime : examEndTime;
  const targetMs = phase.kind === "before" ? startMs : endMs;
  const targetDate = Number.isNaN(targetMs) ? null : new Date(targetMs);

  return (
    <>
      <div
        className={`ev-clock-label ev-clock-label--${phase.kind}`}
        aria-hidden="true"
      >
        {phase.label}
      </div>
      <time
        className="ev-clock"
        dateTime={targetIso}
        aria-live="polite"
        aria-label={
          phase.kind === "before"
            ? "Đếm ngược tới giờ thi"
            : phase.kind === "during"
              ? "Đếm ngược tới giờ kết thúc"
              : "Thời gian từ khi hết giờ thi"
        }
      >
        <span className="ev-clock-unit">
          <span className="ev-clock-num">{pad(phase.d)}</span>
          <span className="ev-clock-lbl">Ngày</span>
        </span>
        <span className="ev-clock-sep" aria-hidden="true">:</span>
        <span className="ev-clock-unit">
          <span className="ev-clock-num">{pad(phase.h)}</span>
          <span className="ev-clock-lbl">Giờ</span>
        </span>
        <span className="ev-clock-sep" aria-hidden="true">:</span>
        <span className="ev-clock-unit">
          <span className="ev-clock-num">{pad(phase.m)}</span>
          <span className="ev-clock-lbl">Phút</span>
        </span>
        <span className="ev-clock-sep" aria-hidden="true">:</span>
        <span className="ev-clock-unit">
          <span className="ev-clock-num">{pad(phase.s)}</span>
          <span className="ev-clock-lbl">Giây</span>
        </span>
      </time>
      <div
        className={`ev-state-line${phase.kind === "after" ? " is-after" : ""}`}
        role="status"
      >
        <span className="dot" aria-hidden="true" />
        {phase.message}
      </div>
      {targetDate && (
        <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          Mục tiêu: {targetDate.toLocaleString("vi-VN")}
        </span>
      )}
    </>
  );
}
