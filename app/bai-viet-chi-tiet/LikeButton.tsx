"use client";

import { useState } from "react";

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  function toggleLike() {
    setLiked((l) => {
      const next = !l;
      setLikes((c) => c + (next ? 1 : -1));
      return next;
    });
  }

  return (
    <button
      type="button"
      className={`like-btn${liked ? " liked" : ""}`}
      onClick={toggleLike}
      aria-pressed={liked}
      aria-label={liked ? "Bỏ thích bài viết" : "Thích bài viết"}
    >
      <span className="heart" aria-hidden="true">
        ♥
      </span>
      <span>{likes.toLocaleString("vi-VN")}</span>
    </button>
  );
}
