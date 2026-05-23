"use client";

import { useRef, useState } from "react";
import { postNotify, type NotifyType } from "@/lib/api/notify";
import { Turnstile, type TurnstileHandle } from "@/components/Turnstile";

interface ChoDeNotifyFormProps {
  /** CMS notify endpoint discriminator. Defaults to `event` for backward-compat. */
  notifyType?: NotifyType;
  /** Preferred slug field (new contract). Sent as `refSlug` in the POST body. */
  refSlug?: string;
  /**
   * @deprecated Alias for `refSlug` kept for existing event callers.
   * New consumers should pass `refSlug` directly.
   */
  eventSlug?: string;
  /**
   * Legacy identifier — used as a final fallback slug when neither `refSlug`
   * nor `eventSlug` are supplied, and rendered onto the form's
   * `data-event-id` attribute for analytics parity with the original form.
   */
  eventId?: string;
  /** Optional aria-label override (e.g. for exam-waiting context). */
  ariaLabel?: string;
  /** Optional submit button label override. */
  buttonLabel?: string;
  /** Optional success message override. */
  successMessage?: string;
}

export function ChoDeNotifyForm({
  notifyType = "event",
  refSlug,
  eventSlug,
  eventId,
  ariaLabel,
  buttonLabel,
  successMessage,
}: ChoDeNotifyFormProps) {
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
    const effectiveSlug =
      refSlug || eventSlug || eventId || "thi-thu-kscl-vao-10-dot-1";
    try {
      setLoading(true);
      setMessage(null);
      const result = await postNotify(notifyType, email, effectiveSlug, token);
      setMessage(
        result.alreadyExists
          ? "Bạn đã đăng ký rồi. Sẽ thông báo qua email."
          : successMessage ||
              "Đăng ký thành công! Sẽ thông báo khi đề lên.",
      );
      setEmail("");
      setSent(true);
    } catch (err) {
      console.error(`[notify-${notifyType}]`, err);
      setMessage("Không gửi được. Vui lòng thử lại sau.");
      turnstileRef.current?.reset();
      setToken(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="ev-notify-form"
      onSubmit={handleSubmit}
      data-event-id={eventId}
      data-notify-type={notifyType}
      aria-label={ariaLabel || "Đăng ký nhận thông báo khi đề lên"}
    >
      <input
        type="email"
        placeholder="Email của bạn"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || sent}
        aria-label="Email"
      />
      <Turnstile ref={turnstileRef} onToken={setToken} />
      <button
        type="submit"
        className="btn btn--primary"
        disabled={loading || sent || !token}
      >
        {sent
          ? "Đã đặt lịch nhắc"
          : loading
            ? "Đang gửi…"
            : buttonLabel || "Báo tôi"}
      </button>
      {message && (
        <p
          className="ev-notify-form__msg"
          role="status"
          style={{ marginTop: 8, fontSize: 13 }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
