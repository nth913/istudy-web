"use client";

/**
 * Client-side stubs for exam-detail page action buttons (Tải PDF, In đề, Chia sẻ)
 * and the "notify when exam drops" form. The notify form is wired to
 * `${CMS}/api/v1/notify/exam`; the other action links remain stubs.
 */
import { useState } from "react";
import { postNotify } from "@/lib/api/notify";

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
  /** Exam slug (used as refSlug for the CMS notify endpoint). */
  examSlug?: string;
}

export function NotifyForm({ maCode, examSlug }: NotifyFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const refSlug =
      examSlug || (maCode ? `exam-${maCode}` : "exam-general");
    try {
      setLoading(true);
      setMessage(null);
      const result = await postNotify("exam", email, refSlug);
      setMessage(
        result.alreadyExists
          ? "Bạn đã đăng ký rồi. Sẽ thông báo qua email."
          : "Đăng ký thành công! Sẽ thông báo qua email khi đề lên.",
      );
      setEmail("");
      setSent(true);
    } catch (err) {
      console.error("[notify-exam]", err);
      setMessage("Không gửi được. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="notify-form"
      aria-label="Đăng ký nhận thông báo khi đề lên"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder={`Email để nhận thông báo khi ${maCode ? "mã " + maCode : "đề"} lên`}
        aria-label="Email nhận thông báo"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || sent}
      />
      <button
        type="submit"
        className="btn btn--primary"
        disabled={loading || sent}
      >
        {sent ? "Đã đặt lịch nhắc" : loading ? "Đang gửi…" : "🔔 Báo tôi khi có"}
      </button>
      {message && (
        <p
          className="notify-form__msg"
          role="status"
          style={{ marginTop: 8, fontSize: 13 }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
