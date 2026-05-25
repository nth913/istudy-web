"use client";

/**
 * Giscus drop-in comment thread.
 *
 * Loads the giscus client script on mount, anchored to a per-post slug via
 * `data-mapping="specific" data-term={slug}`. Gracefully renders an empty
 * `<div>` when the required env vars are absent so build/preview don't crash.
 *
 * Required env (NEXT_PUBLIC_*):
 *   - NEXT_PUBLIC_GISCUS_REPO
 *   - NEXT_PUBLIC_GISCUS_REPO_ID
 *   - NEXT_PUBLIC_GISCUS_CATEGORY
 *   - NEXT_PUBLIC_GISCUS_CATEGORY_ID
 */
import { useEffect, useRef } from "react";

interface CommentsProps {
  slug: string;
}

export function Comments({ slug }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO || "";
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "";
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "";
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "";

    if (!repo || !repoId || !category || !categoryId) {
      // Render nothing — caller should hide the section or show a placeholder.
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", slug);
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "vi");
    script.setAttribute("data-loading", "lazy");
    el.appendChild(script);

    return () => {
      if (el) el.innerHTML = "";
    };
  }, [slug]);

  return <div ref={ref} className="giscus-container" />;
}

export default Comments;
