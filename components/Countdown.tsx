"use client";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-12T07:30:00+07:00").getTime();
const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

export default function Countdown() {
  const [v, setV] = useState({ d: "--", h: "--", m: "--", s: "--" });

  useEffect(() => {
    function tick() {
      let diff = Math.max(0, TARGET - Date.now());
      const d = Math.floor(diff / 86400000);
      diff -= d * 86400000;
      const h = Math.floor(diff / 3600000);
      diff -= h * 3600000;
      const m = Math.floor(diff / 60000);
      diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      setV({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cd-clock" id="cdClock" aria-live="polite">
      <div className="cd-unit">
        <span className="cd-num">{v.d}</span>
        <span className="cd-lbl">Ngày</span>
      </div>
      <span className="cd-sep">:</span>
      <div className="cd-unit">
        <span className="cd-num">{v.h}</span>
        <span className="cd-lbl">Giờ</span>
      </div>
      <span className="cd-sep">:</span>
      <div className="cd-unit">
        <span className="cd-num">{v.m}</span>
        <span className="cd-lbl">Phút</span>
      </div>
      <span className="cd-sep">:</span>
      <div className="cd-unit">
        <span className="cd-num">{v.s}</span>
        <span className="cd-lbl">Giây</span>
      </div>
    </div>
  );
}
