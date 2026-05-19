"use client";

/**
 * Client-side stubs for dap-an page action buttons (Tải đáp án PDF, related-link,
 * notify form). The notify form is wired to `${CMS}/api/v1/notify/dap-an`;
 * other actions remain stubs.
 */
import { useRef, useState, type ReactNode } from "react";
import { postNotify } from "@/lib/api/notify";
import { Turnstile, type TurnstileHandle } from "@/components/Turnstile";

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
  maCode?: string | null;
  /** Exam slug used as refSlug for the CMS notify endpoint. */
  examSlug?: string;
}

export function NotifyDapAnForm({ maCode, examSlug }: NotifyDapAnFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    if (!token) {
      setMessage("Vui lòng hoàn tất xác thực captcha.");
      return;
    }
    const refSlug =
      examSlug || (maCode ? `dap-an-${maCode}` : "dap-an-general");
    try {
      setLoading(true);
      setMessage(null);
      const result = await postNotify("dap-an", email, refSlug, token);
      setMessage(
        result.alreadyExists
          ? "Bạn đã đăng ký rồi. Sẽ thông báo qua email."
          : "Đăng ký thành công! Sẽ thông báo qua email khi đáp án có.",
      );
      setEmail("");
      setSent(true);
    } catch (err) {
      console.error("[notify-dap-an]", err);
      setMessage("Không gửi được. Vui lòng thử lại sau.");
      turnstileRef.current?.reset();
      setToken(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="notify-form"
      aria-label="Đăng ký nhận thông báo khi đáp án có"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder={`Email để nhận thông báo khi ${maCode ? `mã ${maCode}` : "đáp án"} có`}
        aria-label="Email nhận thông báo"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || sent}
      />
      <Turnstile ref={turnstileRef} onToken={setToken} />
      <button
        type="submit"
        className="btn btn--green"
        disabled={loading || sent || !token}
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

/**
 * Horizontally scrollable tabs strip with prev/next nav buttons.
 * Mirrors the design v2 dap-an.html `data-tabs-prev` / `data-tabs-next` behavior.
 * Smooth-scrolls the inner track by ±200px on click.
 */
export function TabsScroller({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (delta: number) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: delta, behavior: "smooth" });
  };
  return (
    <div className="tabs-scroll">
      <button
        type="button"
        className="tabs-nav"
        aria-label="Cuộn trái"
        onClick={() => scrollBy(-200)}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="tabs-scroll-track" ref={trackRef}>
        <div className="tabs-scroll-list">{children}</div>
      </div>
      <button
        type="button"
        className="tabs-nav"
        aria-label="Cuộn phải"
        onClick={() => scrollBy(200)}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
