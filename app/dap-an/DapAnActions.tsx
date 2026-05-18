"use client";

/**
 * Client-side stubs for dap-an page action buttons (Tải đáp án PDF, related-link,
 * notify form). Wire to CMS endpoints once spec lands.
 */
import { useState } from "react";

interface DapAnActionLinkProps {
  className?: string;
  ariaDisabled?: boolean;
  title?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export function DapAnActionLink({
  className,
  ariaDisabled,
  title,
  ariaLabel,
  children,
}: DapAnActionLinkProps) {
  return (
    // TODO(istudy-cms): wire tới /api/answers/:slug/{pdf|share} khi CMS scaffold xong.
    <a
      href="#noop"
      className={className}
      aria-disabled={ariaDisabled}
      title={title}
      aria-label={ariaLabel}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
}

interface RelatedLinkProps {
  label?: string;
  className?: string;
}

export function RelatedLink({ label, className }: RelatedLinkProps) {
  return (
    // TODO(istudy-cms): point tới bài viết liên quan dựa trên question.topicSlug.
    <a
      className={className}
      href="#noop"
      onClick={(e) => e.preventDefault()}
    >
      {label ?? "Xem ngữ pháp liên quan"}
    </a>
  );
}

interface NotifyDapAnFormProps {
  /** Optional mã đề — khi có, đăng ký nhận thông báo riêng cho mã. */
  maCode?: string;
}

export function NotifyDapAnForm({ maCode }: NotifyDapAnFormProps) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="notify-form"
      aria-label="Đăng ký nhận thông báo khi đáp án có"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO(istudy-cms): POST { email, examSlug, maCode } tới /api/subscribe/answer
        // — chờ endpoint spec từ CMS.
        setSent(true);
      }}
    >
      <input
        type="email"
        placeholder={`Email để nhận thông báo khi ${maCode ? `mã ${maCode}` : "đáp án"} có`}
        aria-label="Email nhận thông báo"
        required
        disabled={sent}
      />
      <button type="submit" className="btn btn--green" disabled={sent}>
        {sent ? "Đã đặt lịch nhắc" : "🔔 Báo tôi khi có"}
      </button>
    </form>
  );
}
