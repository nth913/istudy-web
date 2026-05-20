/**
 * Posts API client — talks to istudy-cms `/api/posts/*` endpoints.
 *
 * - List: GET /api/posts/list?category=&tag=&page=&limit=
 * - Detail: GET /api/posts/by-slug/:slug
 *
 * Fail-soft: list returns empty docs on error so the page still renders.
 * Detail returns null so the route can render a friendly fallback.
 */

const CMS = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3131";

export type PostCategory = "tu-vung" | "ngu-phap" | "meo" | "tin-tuc";

export interface MediaDoc {
  id: string;
  url?: string;
  filename?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category: PostCategory;
  tags?: string[];
  publishedAt?: string;
  isFeatured?: boolean;
  viewCount?: number;
  likeCount?: number;
  cover?: MediaDoc | string | null;
}

export interface PostDetail extends PostSummary {
  body?: { root: LexNode } | null;
  author?: { id: string; name?: string; email?: string } | null;
  seoTitle?: string;
  seoDescription?: string;
  relatedPosts?: PostSummary[];
}

export type LexNode = {
  type: string;
  tag?: string;
  format?: number | string;
  text?: string;
  listType?: "number" | "bullet" | "check";
  children?: LexNode[];
  url?: string;
};

export interface PostsListResponse {
  docs: PostSummary[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const TIMEOUT_MS = 4000;

async function fetchWithTimeout(
  url: string,
  init?: RequestInit,
  timeoutMs = TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(t);
  }
}

export async function fetchPosts(opts: {
  category?: PostCategory | string;
  tag?: string;
  page?: number;
  limit?: number;
} = {}): Promise<PostsListResponse> {
  const qs = new URLSearchParams();
  if (opts.category) qs.set("category", opts.category);
  if (opts.tag) qs.set("tag", opts.tag);
  qs.set("page", String(opts.page ?? 1));
  qs.set("limit", String(opts.limit ?? 12));
  const url = `${CMS}/api/posts/list?${qs.toString()}`;

  try {
    const res = await fetchWithTimeout(url, {
      next: { revalidate: 120, tags: ["posts:list"] },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    return (await res.json()) as PostsListResponse;
  } catch (err) {
    console.warn("[fetchPosts] fallback empty", err);
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
}

export async function fetchPostBySlug(slug: string): Promise<PostDetail | null> {
  const url = `${CMS}/api/posts/by-slug/${encodeURIComponent(slug)}`;
  try {
    const res = await fetchWithTimeout(url, {
      next: { revalidate: 120, tags: [`posts:${slug}`] },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`status ${res.status}`);
    return (await res.json()) as PostDetail;
  } catch (err) {
    console.warn("[fetchPostBySlug] fail", slug, err);
    return null;
  }
}

export function categoryLabel(c?: string): string {
  switch (c) {
    case "ngu-phap":
      return "NGỮ PHÁP";
    case "tu-vung":
      return "TỪ VỰNG";
    case "meo":
      return "MẸO";
    case "tin-tuc":
      return "TIN TỨC";
    default:
      return "BÀI VIẾT";
  }
}

// Map post category → visual variant (gradient + emoji) used when cover image
// is missing so detail/list pages still look sinh động.
const CATEGORY_VISUALS = {
  "ngu-phap": { emoji: "📚", grad: 0 },
  "tu-vung": { emoji: "🔤", grad: 1 },
  meo: { emoji: "💡", grad: 2 },
  "tin-tuc": { emoji: "📰", grad: 3 },
} as const;

export function categoryVisual(c?: string) {
  return (
    CATEGORY_VISUALS[(c || "") as keyof typeof CATEGORY_VISUALS] || {
      emoji: "📝",
      grad: 4,
    }
  );
}

export function coverUrl(cover: PostSummary["cover"]): string | null {
  if (!cover) return null;
  if (typeof cover === "string") return null;
  if (cover.url) {
    return cover.url.startsWith("http") ? cover.url : `${CMS}${cover.url}`;
  }
  return null;
}

export function formatDate(iso?: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  } catch {
    return "";
  }
}

export function formatViews(n?: number): string {
  if (!n || n < 1000) return String(n ?? 0);
  if (n < 1_000_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
}
