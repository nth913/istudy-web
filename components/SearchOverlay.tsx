"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

// English-exam keyword suggestions (10–13).
const SUGGESTIONS: string[] = [
  "IELTS Reading",
  "IELTS Writing Task 2",
  "TOEIC Part 5",
  "Câu điều kiện",
  "Mệnh đề quan hệ",
  "Đề minh hoạ 2026",
  "Đề vào 10 Hà Nội",
  "THPT Quốc gia 2026",
  "Word formation",
  "Phrasal verbs",
  "Trọng âm 3 âm tiết",
  "Speaking part 2",
];

/**
 * Centered modal search overlay. Triggered from header search button.
 *
 * Features
 *  - ESC closes
 *  - Enter submits → navigates to /kho-de-thi?q=<term>
 *  - Focus moves to input on open
 *  - ARIA dialog
 *  - Backdrop click closes
 *  - Body scroll lock
 *  - Suggestion chips fill the input + submit on click
 */
export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current =
      typeof document !== "undefined"
        ? (document.activeElement as HTMLElement | null)
        : null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => inputRef.current?.focus(), 0);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  // Reset term when overlay closes
  useEffect(() => {
    if (!open) setTerm("");
  }, [open]);

  function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    onClose();
    router.push(`/kho-de-thi?q=${encodeURIComponent(trimmed)}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(term);
  }

  if (!open) return null;

  return (
    <div
      className="so-backdrop is-open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="so-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="so-header">
          <span id={titleId} className="so-title">
            Tìm đề thi, bài viết, ngữ pháp…
          </span>
          <button
            type="button"
            className="so-close"
            onClick={onClose}
            aria-label="Đóng tìm kiếm"
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form className="so-form" onSubmit={handleSubmit} role="search">
          <svg
            className="icon so-form-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="so-input"
            placeholder="Nhập từ khoá rồi nhấn Enter…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            aria-label="Từ khoá tìm kiếm"
            autoComplete="off"
          />
          <button
            type="submit"
            className="btn btn--primary btn--small so-submit"
            disabled={!term.trim()}
          >
            Tìm
          </button>
        </form>

        <div className="so-suggest">
          <div className="so-suggest-title">Gợi ý phổ biến</div>
          <div className="so-suggest-chips">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="so-chip"
                onClick={() => submit(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
