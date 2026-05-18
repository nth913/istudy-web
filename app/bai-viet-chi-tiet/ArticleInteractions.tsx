"use client";

/**
 * Client-side stubs for article share buttons, comment form, and newsletter
 * signup form. Wire to CMS endpoints once spec lands.
 */
import { useState } from "react";

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

export function ShareButtons() {
  // TODO(istudy-cms): wire share intents (FB share dialog, X intent URL, copy-to-clipboard, bookmark POST).
  const handleStub = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    /* TODO wire share endpoint */
  };
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
        className="share-btn"
        title="Lưu"
        aria-label="Lưu bài"
        onClick={handleStub}
      >
        🔖
      </button>
    </>
  );
}

export function CommentForm() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <form
      className="comment-form"
      aria-label="Gửi bình luận"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO(istudy-cms): POST { postSlug, body } tới /api/comments — chờ endpoint spec.
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

export function NewsletterForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      aria-label="Đăng ký nhận bài mới"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO(istudy-cms): POST { email } tới /api/subscribe/newsletter — chờ endpoint spec.
        setSent(true);
      }}
    >
      <label htmlFor="newsletter-email" style={VISUALLY_HIDDEN}>
        Email của bạn
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Email của bạn"
        required
        disabled={sent}
      />
      <button type="submit" disabled={sent}>
        {sent ? "Đã đăng ký" : "Đăng ký"}
      </button>
    </form>
  );
}
