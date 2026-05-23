"use client";

import { useState } from "react";
import { togglePostLike } from "@/lib/api/interactions";

interface LikeButtonProps {
  initialLikes: number;
  /** Post id used for the like toggle. Falls back to a placeholder when the page is not yet dynamic. */
  postId?: string;
}

export default function LikeButton({ initialLikes, postId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [busy, setBusy] = useState(false);

  async function toggleLike() {
    if (busy) return;
    // Optimistic flip — revert if the API rejects.
    const prevLiked = liked;
    const prevLikes = likes;
    const nextLiked = !prevLiked;
    setLiked(nextLiked);
    setLikes((c) => c + (nextLiked ? 1 : -1));

    if (!postId) {
      // TODO(istudy-cms): thread the real post id from page.tsx once /bai-viet-chi-tiet/[slug] is dynamic.
      console.warn("[like] postId missing — optimistic-only");
      return;
    }
    try {
      setBusy(true);
      const result = await togglePostLike(postId);
      if (typeof result?.liked === "boolean") {
        setLiked(result.liked);
      }
      if (typeof result?.count === "number") {
        setLikes(result.count);
      }
    } catch (err) {
      // Revert optimistic update on failure.
      setLiked(prevLiked);
      setLikes(prevLikes);
      console.error("[like]", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className={`like-btn${liked ? " liked" : ""}`}
      onClick={toggleLike}
      aria-pressed={liked}
      aria-label={liked ? "Bỏ thích bài viết" : "Thích bài viết"}
      disabled={busy}
    >
      <span className="heart" aria-hidden="true">
        ♥
      </span>
      <span>{likes.toLocaleString("vi-VN")}</span>
    </button>
  );
}
