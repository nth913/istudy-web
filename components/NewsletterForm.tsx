"use client";

import { useRef, useState } from "react";
import { postNewsletter } from "@/lib/api/notify";
import { Turnstile, type TurnstileHandle } from "@/components/Turnstile";

const IconMail = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"
    height="20"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export function NewsletterForm() {
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
    try {
      setLoading(true);
      setMessage(null);
      const result = await postNewsletter(email, "landing-cta", token);
      if (result.alreadyVerified) {
        setMessage("Email này đã xác nhận rồi. Cảm ơn bạn!");
      } else if (result.sent) {
        setMessage("Đã gửi email xác nhận. Mở email để hoàn tất đăng ký.");
      }
      setSent(true);
      setEmail("");
    } catch (err) {
      console.error("[newsletter]", err);
      setMessage("Không gửi được. Vui lòng thử lại sau.");
      turnstileRef.current?.reset();
      setToken(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="cta-form"
      onSubmit={handleSubmit}
      aria-label="Đăng ký nhận email"
    >
      <div className="input-wrap">
        <IconMail />
        <input
          type="email"
          placeholder="Email của bạn"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading || sent}
          aria-label="Email"
        />
      </div>
      <Turnstile ref={turnstileRef} onToken={setToken} />
      <button type="submit" disabled={loading || sent || !token}>
        {sent ? "✓ Đã đăng ký" : loading ? "Đang gửi…" : "Subscribe"}
      </button>
      {message && (
        <p role="status" style={{ marginTop: 8, fontSize: 13, color: sent ? "#16A34A" : "#DC2626" }}>
          {message}
        </p>
      )}
    </form>
  );
}
