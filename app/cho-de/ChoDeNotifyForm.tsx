"use client";

import { useRef, useState } from "react";
import { postNotify } from "@/lib/api/notify";
import { Turnstile, type TurnstileHandle } from "@/components/Turnstile";

interface ChoDeNotifyFormProps {
  eventId: string;
  /** Optional slug — falls back to eventId or a hardcoded sample slug. */
  eventSlug?: string;
}

export function ChoDeNotifyForm({ eventId, eventSlug }: ChoDeNotifyFormProps) {
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
      eventSlug || eventId || "thi-thu-kscl-vao-10-dot-1";
    try {
      setLoading(true);
      setMessage(null);
      const result = await postNotify("event", email, refSlug, token);
      setMessage(
        result.alreadyExists
          ? "Bạn đã đăng ký rồi. Sẽ thông báo qua email."
          : "Đăng ký thành công! Sẽ thông báo khi đề lên.",
      );
      setEmail("");
      setSent(true);
    } catch (err) {
      console.error("[notify-event]", err);
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
      aria-label="Đăng ký nhận thông báo khi đề lên"
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
        {sent ? "Đã đặt lịch nhắc" : loading ? "Đang gửi…" : "Báo tôi"}
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
