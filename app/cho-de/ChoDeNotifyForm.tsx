"use client";

/**
 * Notify-me form for the cho-de waiting page. Posts email to
 * `${CMS}/api/v1/notify/event` with the waiting event's slug as refSlug.
 */
import { useState } from "react";
import { postNotify } from "@/lib/api/notify";

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const refSlug =
      eventSlug || eventId || "thi-thu-kscl-vao-10-dot-1";
    try {
      setLoading(true);
      setMessage(null);
      const result = await postNotify("event", email, refSlug);
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
      <button
        type="submit"
        className="btn btn--primary"
        disabled={loading || sent}
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
