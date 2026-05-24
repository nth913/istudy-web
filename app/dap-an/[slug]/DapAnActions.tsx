"use client";

/**
 * Client-side action stubs for `/dap-an/[slug]`. Currently wires the notify
 * form to `${CMS}/api/v1/notify/dap-an`; `DapAnActionLink` is a no-op stub
 * retained for forward-compat with future Tải/Chia sẻ wiring.
 */
import { useRef, useState } from "react";
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

interface NotifyDapAnFormProps {
  /** Optional mã đề — khi có, đăng ký nhận thông báo riêng cho mã. */
  maCode?: string | null;
  /** Exam slug used as refSlug for the CMS notify endpoint. */
  examSlug?: string;
}

export function NotifyDapAnForm({ maCode, examSlug }: NotifyDapAnFormProps = {}) {
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
