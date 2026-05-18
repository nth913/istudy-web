"use client";

/**
 * Notify-me form for the cho-de waiting page. Posts email to the CMS subscribe
 * endpoint when wired. For now, swallows submit and shows the "đã ghi sổ" UI.
 */
import { useState } from "react";

interface ChoDeNotifyFormProps {
  eventId: string;
}

export function ChoDeNotifyForm({ eventId }: ChoDeNotifyFormProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO wire CMS subscribe endpoint — POST { email, eventId } once spec lands.
    // Surface eventId via a data attribute so it's visible during debugging.
    void eventId;
    setSent(true);
  };

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
        disabled={sent}
        aria-label="Email"
      />
      <button type="submit" className="btn btn--primary" disabled={sent}>
        {sent ? "Đã đặt lịch nhắc" : "Báo tôi"}
      </button>
    </form>
  );
}
