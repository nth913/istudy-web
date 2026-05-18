"use client";

/**
 * Client-side stubs for exam-detail page action buttons (Tải PDF, In đề, Chia sẻ)
 * and the "notify when exam drops" form. Wire to real endpoints in the CMS phase.
 */
import { useState } from "react";

interface ExamActionLinkProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export function ExamActionLink({
  className,
  style,
  title,
  ariaLabel,
  children,
}: ExamActionLinkProps) {
  return (
    // TODO(istudy-cms): wire tới /api/exams/:slug/{pdf|print|share} khi CMS scaffold xong.
    <a
      href="#noop"
      className={className}
      style={style}
      title={title}
      aria-label={ariaLabel}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
}

interface NotifyFormProps {
  /** Optional mã đề — when present, "đăng ký nhận thông báo cho mã X". */
  maCode?: string;
}

export function NotifyForm({ maCode }: NotifyFormProps) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="notify-form"
      aria-label="Đăng ký nhận thông báo khi đề lên"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO(istudy-cms): POST { email, examSlug, maCode } tới /api/subscribe/exam
        // — chờ endpoint spec từ CMS.
        setSent(true);
      }}
    >
      <input
        type="email"
        placeholder={`Email để nhận thông báo khi ${maCode ? "mã " + maCode : "đề"} lên`}
        aria-label="Email nhận thông báo"
        required
        disabled={sent}
      />
      <button type="submit" className="btn btn--primary" disabled={sent}>
        {sent ? "Đã đặt lịch nhắc" : "🔔 Báo tôi khi có"}
      </button>
    </form>
  );
}
