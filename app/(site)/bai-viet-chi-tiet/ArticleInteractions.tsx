"use client";

/**
 * Client-side article-detail interactions: share buttons, comment form
 * (deprecated — Giscus replaces it on the page), and newsletter signup.
 *
 * The newsletter form is now wired to `${CMS}/api/v1/newsletter`; share
 * buttons remain stubs (TODO: native intent URLs + bookmark via interactions).
 */
import { useRef, useState } from "react";
import { postNewsletter } from "@/lib/api/notify";
import { togglePostBookmark } from "@/lib/api/interactions";
import { Turnstile, type TurnstileHandle } from "@/components/Turnstile";

const VISUALLY_HIDDEN: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

interface ShareButtonsProps {
  /** Post id used for the bookmark toggle. */
  postId?: string;
}

export function ShareButtons({ postId }: ShareButtonsProps = {}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleStub = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO(istudy-cms): wire native share intents (FB share dialog, X intent URL, copy-to-clipboard).
  };

  async function handleBookmark(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (busy) return;
    if (!postId) {
      // TODO: thread real post id from page.tsx once routes are dynamic.
      console.warn("[bookmark] missing postId — skipping");
      return;
    }
    try {
      setBusy(true);
      const result = await togglePostBookmark(postId);
      setBookmarked(Boolean(result.bookmarked));
    } catch (err) {
      console.error("[bookmark]", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="share-btn"
        title="Facebook"
        aria-label="Chia sẻ Facebook"
        onClick={handleStub}
      >
        f
      </button>
      <button
        type="button"
        className="share-btn"
        title="X / Twitter"
        aria-label="Chia sẻ X / Twitter"
        onClick={handleStub}
      >
        𝕏
      </button>
      <button
        type="button"
        className="share-btn"
        title="Sao chép liên kết"
        aria-label="Sao chép liên kết"
        onClick={handleStub}
      >
        🔗
      </button>
      <button
        type="button"
        className={`share-btn${bookmarked ? " is-active" : ""}`}
        title={bookmarked ? "Đã lưu" : "Lưu"}
        aria-label={bookmarked ? "Đã lưu bài" : "Lưu bài"}
        aria-pressed={bookmarked}
        onClick={handleBookmark}
        disabled={busy}
      >
        🔖
      </button>
    </>
  );
}

/**
 * @deprecated Replaced by `<Comments slug={...} />` (Giscus drop-in). Kept for
 * rollback safety — the page no longer renders this form.
 */
export function CommentForm() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <form
      className="comment-form"
      aria-label="Gửi bình luận"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO(istudy-cms): legacy stub — Giscus is the primary comment surface now.
        setSent(true);
        setText("");
      }}
    >
      <div className="ava" aria-hidden="true" />
      <label htmlFor="comment-input" style={VISUALLY_HIDDEN}>
        Bình luận của bạn
      </label>
      <input
        id="comment-input"
        type="text"
        placeholder={sent ? "Đã gửi bình luận. Cảm ơn anh!" : "Để lại bình luận của bạn…"}
        required
        value={text}
        onChange={(ev) => setText(ev.target.value)}
        disabled={sent}
      />
      <button type="submit" disabled={sent}>
        {sent ? "Đã gửi" : "Gửi"}
      </button>
    </form>
  );
}

interface NewsletterFormProps {
  /** Optional source label sent to CMS (defaults to `newsletter-article`). */
  source?: string;
}

export function NewsletterForm({
  source = "newsletter-article",
}: NewsletterFormProps = {}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
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
      const result = await postNewsletter(email, source, token);
      setMessage(
        result.alreadyVerified
          ? "Email này đã đăng ký rồi."
          : "Đã gửi link xác nhận đến email. Vui lòng kiểm tra hộp thư.",
      );
      setEmail("");
      setSent(true);
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
    <form aria-label="Đăng ký nhận bài mới" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" style={VISUALLY_HIDDEN}>
        Email của bạn
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Email của bạn"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || sent}
      />
      <Turnstile ref={turnstileRef} onToken={setToken} />
      <button type="submit" disabled={loading || sent || !token}>
        {sent ? "Đã đăng ký" : loading ? "Đang gửi…" : "Đăng ký"}
      </button>
      {message && (
        <p
          className="newsletter-form__msg"
          role="status"
          style={{ marginTop: 8, fontSize: 13 }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
