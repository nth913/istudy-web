/**
 * Client-side helpers for the iStudy CMS like + bookmark toggle endpoints.
 *
 * Auth: anonymous cookie (`anon_id`) — must include credentials so the cookie
 * issued by the CMS persists across calls.
 */

const CMS = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3131";

async function toggle(path: string) {
  const res = await fetch(`${CMS}${path}`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}

export const togglePostLike = (id: string) =>
  toggle(`/api/v1/posts/${id}/like`) as Promise<{
    ok: boolean;
    liked: boolean;
    count: number;
  }>;

export const togglePostBookmark = (id: string) =>
  toggle(`/api/v1/posts/${id}/bookmark`) as Promise<{
    ok: boolean;
    bookmarked: boolean;
  }>;

export const toggleExamLike = (id: string) =>
  toggle(`/api/v1/exams/${id}/like`) as Promise<{
    ok: boolean;
    liked: boolean;
    count: number;
  }>;

export const toggleExamBookmark = (id: string) =>
  toggle(`/api/v1/exams/${id}/bookmark`) as Promise<{
    ok: boolean;
    bookmarked: boolean;
  }>;
