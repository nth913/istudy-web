"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  answerUrlFor,
  computeEventState,
  examUrlFor,
  fetchActiveEvents,
  pickEvent,
  waitingUrlFor,
  type Event,
  type EventState,
} from "@/lib/events-data";

/**
 * Floating bottom-right event popup. Displays the popup event from
 * fetchActiveEvents() with one of 3 content states:
 *
 *  - pre     : countdown clock + GenZ wish + "Vào hóng đề và đáp án nào"
 *  - de      : 🎉 banner "Đề đã lên!"   + "Cùng xem đề nào →"
 *  - dap-an  : ✅ banner "Đáp án đã có!" + "Cùng xem đáp án nào →"
 *
 * Behavior:
 *  - Self-fetches once on mount; renders nothing if no popup event.
 *  - Auto-shows after 1.2s (configurable) if user has not dismissed it.
 *  - ESC key closes (non-persistent).
 *  - "Ẩn thông báo này" persists dismissal in localStorage scoped by
 *    `<eventId>.<state>` so a new state (đề / đáp án) re-shows the popup.
 *  - Launcher pill re-opens the popup after a non-persistent close.
 *
 * A11y:
 *  - role="dialog" aria-modal="false" (non-modal, doesn't trap focus).
 *  - aria-labelledby points at the event title.
 *  - Close button has Vietnamese aria-label.
 *  - Countdown has aria-live="polite" so SR readers don't get spammed.
 */

const AUTO_SHOW_DELAY_MS = 1200;

const WISHES_PRE: ReadonlyArray<{ emoji: string; text: string }> = [
  { emoji: "🍀", text: "Học chill, thi chất. Còn vài hôm thôi — slay nhẹ cái đề là xong!" },
  { emoji: "✨", text: "Hít thở sâu, đọc kỹ đề. Bạn đã ôn rồi mà — cứ vibe thôi." },
  { emoji: "🎯", text: "Aim cao, breath đều. Đến ngày thi mình sẽ ở đây hóng kết quả cùng bạn." },
  { emoji: "🔥", text: "Sắp đến giờ G rồi nha! Ngủ đủ, ăn no, làm bài chắc tay." },
  { emoji: "💪", text: "Bạn đã đi xa lắm rồi. Vài hôm nữa thôi — về đích thật ngầu nhé!" },
];

function pickWish(): { emoji: string; text: string } {
  // Stable per day so a user sees the same wish across page navigations.
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = ((h << 5) - h + key.charCodeAt(i)) | 0;
  return WISHES_PRE[Math.abs(h) % WISHES_PRE.length]!;
}

function pad(n: number): string {
  return String(Math.max(0, n)).padStart(2, "0");
}

function dismissKey(id: string, state: EventState): string {
  return `istudy.popupDismissed.${id}.${state}`;
}

function readDismissed(id: string, state: EventState): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(dismissKey(id, state)) === "1";
  } catch {
    return false;
  }
}

function writeDismissed(id: string, state: EventState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(dismissKey(id, state), "1");
  } catch {
    // localStorage may be disabled — fail silently.
  }
}

function formatLongDay(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const days = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${days[d.getDay()]}, ${dd}/${mm}/${yyyy} · ${hh}:${min}`;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m12 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" aria-hidden="true">
      <path d="M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 6l-12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EventPopup() {
  const [event, setEvent] = useState<Event | null>(null);
  const [state, setState] = useState<EventState>("pre");
  const [open, setOpen] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());
  const titleId = useId();
  const autoShowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Fetch active events on mount, decide popup event.
  useEffect(() => {
    let cancelled = false;
    fetchActiveEvents().then((res) => {
      if (cancelled) return;
      const popupEv = pickEvent(res, res.slots.popup);
      if (!popupEv) return;
      setEvent(popupEv);
      const initialNow = new Date();
      setNow(initialNow);
      setState(computeEventState(popupEv, initialNow));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // --- Recompute state every 30s + tick countdown every 1s while open + pre.
  useEffect(() => {
    if (!event) return;
    const tick = () => {
      const next = new Date();
      setNow(next);
      const nextState = computeEventState(event, next);
      setState((prev) => (prev === nextState ? prev : nextState));
    };
    const fast = state === "pre" ? setInterval(tick, 1000) : null;
    const slow = setInterval(tick, 30_000);
    return () => {
      if (fast) clearInterval(fast);
      clearInterval(slow);
    };
  }, [event, state]);

  // --- Auto-show after AUTO_SHOW_DELAY_MS, unless dismissed for this state.
  useEffect(() => {
    if (!event) return;
    if (readDismissed(event.id, state)) {
      setShowLauncher(true);
      return;
    }
    autoShowTimer.current = setTimeout(() => {
      setOpen(true);
      setShowLauncher(false);
    }, AUTO_SHOW_DELAY_MS);
    return () => {
      if (autoShowTimer.current) {
        clearTimeout(autoShowTimer.current);
        autoShowTimer.current = null;
      }
    };
  }, [event, state]);

  // --- ESC closes (non-persistent).
  const handleClose = useCallback(
    (persist: boolean) => {
      setOpen(false);
      if (event && persist) writeDismissed(event.id, state);
      setShowLauncher(true);
    },
    [event, state],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const handleLauncherClick = useCallback(() => {
    // Reopen via launcher also clears dismissal for current event-state,
    // matching design event-popup.js:134 (clearDismiss before reopen).
    if (event && typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(dismissKey(event.id, state));
      } catch {
        // localStorage may be disabled — fail silently.
      }
    }
    setOpen(true);
    setShowLauncher(false);
  }, [event, state]);

  // --- Countdown digits (only used in `pre` state).
  const countdown = useMemo(() => {
    if (!event || state !== "pre") return { d: "--", h: "--", m: "--", s: "--" };
    const start = event.examStartTime
      ? new Date(event.examStartTime).getTime()
      : new Date(event.examEndTime).getTime();
    let diff = Math.max(0, start - now.getTime());
    const d = Math.floor(diff / 86_400_000);
    diff -= d * 86_400_000;
    const h = Math.floor(diff / 3_600_000);
    diff -= h * 3_600_000;
    const m = Math.floor(diff / 60_000);
    diff -= m * 60_000;
    const s = Math.floor(diff / 1000);
    return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
  }, [event, state, now]);

  const wish = useMemo(() => pickWish(), []);

  if (!event) return null;

  const chipLabel =
    state === "pre"
      ? (event.heroEyebrow || "Sự kiện sắp diễn ra")
      : state === "de"
        ? "Đề thi vừa lên"
        : "Đáp án đã có";

  const ctaText =
    state === "pre"
      ? "Vào hóng đề và đáp án nào"
      : state === "de"
        ? "Cùng xem đề nào"
        : "Cùng xem đáp án nào";

  const ctaHref =
    state === "pre"
      ? waitingUrlFor(event)
      : state === "de"
        ? examUrlFor(event)
        : answerUrlFor(event);

  const launcherText =
    state === "pre"
      ? "Sự kiện sắp diễn ra"
      : state === "de"
        ? "Đề thi vừa lên — xem ngay"
        : "Đáp án đã có — xem ngay";

  return (
    <>
      <aside
        className={`ev-pop${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        data-state={state}
        aria-hidden={!open}
      >
        <div className="ev-pop-card">
          <button
            type="button"
            className="ev-pop-x"
            aria-label="Đóng popup sự kiện"
            onClick={() => handleClose(false)}
          >
            <CloseIcon />
          </button>

          <span className="ev-pop-chip">
            <span className="pulse" aria-hidden="true" />
            <span>{chipLabel}</span>
          </span>

          <h4 className="ev-pop-name" id={titleId}>
            {event.short || event.title}
          </h4>
          <div className="ev-pop-date">
            <span aria-hidden="true">📅 </span>
            {formatLongDay(event.examStartTime || event.examEndTime)}
          </div>

          {state === "pre" ? (
            <>
              <div className="ev-pop-clock" aria-live="polite" aria-label="Đếm ngược đến giờ thi">
                <div className="ev-pop-clock-unit">
                  <span className="ev-pop-clock-num">{countdown.d}</span>
                  <span className="ev-pop-clock-lbl">Ngày</span>
                </div>
                <span className="ev-pop-clock-sep" aria-hidden="true">:</span>
                <div className="ev-pop-clock-unit">
                  <span className="ev-pop-clock-num">{countdown.h}</span>
                  <span className="ev-pop-clock-lbl">Giờ</span>
                </div>
                <span className="ev-pop-clock-sep" aria-hidden="true">:</span>
                <div className="ev-pop-clock-unit">
                  <span className="ev-pop-clock-num">{countdown.m}</span>
                  <span className="ev-pop-clock-lbl">Phút</span>
                </div>
                <span className="ev-pop-clock-sep" aria-hidden="true">:</span>
                <div className="ev-pop-clock-unit">
                  <span className="ev-pop-clock-num">{countdown.s}</span>
                  <span className="ev-pop-clock-lbl">Giây</span>
                </div>
              </div>

              <p className="ev-pop-wish">
                <span className="emoji" aria-hidden="true">
                  {wish.emoji}{" "}
                </span>
                {wish.text}
              </p>
            </>
          ) : (
            <a className="ev-pop-banner" href={ctaHref}>
              <div className="ev-pop-banner-emoji" aria-hidden="true">
                {state === "de" ? "🎉" : "✅"}
              </div>
              <div className="ev-pop-banner-title">
                {state === "de" ? "Đề đã lên!" : "Đáp án đã có!"}
              </div>
              <div className="ev-pop-banner-sub">
                {state === "de"
                  ? "Tiếng Anh · cập nhật vài phút trước"
                  : "Kèm giải thích chi tiết · soi đáp án thôi"}
              </div>
            </a>
          )}

          <a className="ev-pop-cta" href={ctaHref}>
            <span>{ctaText}</span>
            <ArrowIcon />
          </a>

          <div className="ev-pop-foot">
            <button
              type="button"
              className="ev-pop-mute"
              onClick={() => handleClose(true)}
            >
              Ẩn thông báo này
            </button>
          </div>
        </div>
      </aside>

      <button
        type="button"
        className={`ev-pop-launcher${showLauncher && !open ? " is-visible" : ""}`}
        data-state={state}
        onClick={handleLauncherClick}
        aria-label={`Mở lại popup sự kiện: ${launcherText}`}
      >
        <span className="dot" aria-hidden="true" />
        <span>{launcherText}</span>
      </button>
    </>
  );
}
