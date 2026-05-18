"use client";
import { useEffect, useState } from "react";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

/**
 * Homepage hero countdown clock — ticks toward `targetIso` (ISO-8601 string).
 * Renders the same DOM shape as <Countdown /> so the existing `.cd-clock`
 * polaroid styling in `lib/page-css/index.ts` applies.
 *
 * Why a separate component:
 *  - The shared `<Countdown />` hardcodes the THPT QG fallback target.
 *  - The hero card must tick toward the active event's start time when
 *    `fetchActiveEvents()` returns a hero event (cms-events-spec §1.1).
 */
export default function HeroCountdownClock({ targetIso }: { targetIso: string }) {
  const [v, setV] = useState({ d: "--", h: "--", m: "--", s: "--" });

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    if (Number.isNaN(target)) return;

    function tick() {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86_400_000);
      diff -= d * 86_400_000;
      const h = Math.floor(diff / 3_600_000);
      diff -= h * 3_600_000;
      const m = Math.floor(diff / 60_000);
      diff -= m * 60_000;
      const s = Math.floor(diff / 1000);
      setV({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return (
    <div className="cd-clock" aria-live="polite" aria-label="Đếm ngược đến giờ thi">
      <div className="cd-unit">
        <span className="cd-num">{v.d}</span>
        <span className="cd-lbl">Ngày</span>
      </div>
      <span className="cd-sep" aria-hidden="true">:</span>
      <div className="cd-unit">
        <span className="cd-num">{v.h}</span>
        <span className="cd-lbl">Giờ</span>
      </div>
      <span className="cd-sep" aria-hidden="true">:</span>
      <div className="cd-unit">
        <span className="cd-num">{v.m}</span>
        <span className="cd-lbl">Phút</span>
      </div>
      <span className="cd-sep" aria-hidden="true">:</span>
      <div className="cd-unit">
        <span className="cd-num">{v.s}</span>
        <span className="cd-lbl">Giây</span>
      </div>
    </div>
  );
}
