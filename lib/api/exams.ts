/**
 * Exam list query helpers.
 *
 * `ExamListQuery` mirrors GET filters accepted by istudy-cms endpoint
 * `/api/search-exams` (xem `istudy-cms/src/endpoints/search-exams.ts`).
 *
 * `buildQuery` serialise object → URL querystring (prefix `?`, empty khi no
 * param). Pure function, dùng từ Server Component fetch / link href / test.
 */

export interface ExamListQuery {
  cat?: string;
  q?: string;
  province?: string;
  year?: string;
  examType?: "chinh-thuc" | "thi-thu" | "minh-hoa";
  yearMax?: string;
  deReady?: boolean;
  sort?: "latest" | "popular" | "views";
  limit?: number;
  offset?: number;
}

function buildQuery(q: ExamListQuery): string {
  const sp = new URLSearchParams();
  if (q.cat) sp.set("cat", q.cat);
  if (q.q) sp.set("q", q.q);
  if (q.province) sp.set("province", q.province);
  if (q.year) sp.set("year", q.year);
  if (q.examType) sp.set("examType", q.examType);
  if (q.yearMax) sp.set("yearMax", q.yearMax);
  if (q.deReady !== undefined) sp.set("deReady", String(q.deReady));
  if (q.sort) sp.set("sort", q.sort);
  if (q.limit != null) sp.set("limit", String(q.limit));
  if (q.offset != null) sp.set("offset", String(q.offset));
  const s = sp.toString();
  return s ? `?${s}` : "";
}

/**
 * Test-only export. Production code không nên import — sử dụng wrapper fetch
 * (sẽ thêm khi page wire vào server component, plan T10).
 */
export const buildQueryForTest = buildQuery;

// ============================================================================
// CMS fetchers — list, sidebar facets, detail by slug
// ============================================================================

function cmsBase(): string {
  return process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3131";
}

export function absoluteCmsUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (/^https?:/i.test(url)) return url;
  return `${cmsBase()}${url.startsWith("/") ? url : `/${url}`}`;
}

export interface ExamThumbnail {
  id?: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: { card?: { url?: string }; og?: { url?: string } };
}

/**
 * Resolve an exam thumbnail to an absolute URL for the requested derivative.
 * Falls back to the base `url` when the size is missing; null when absent.
 */
export function examThumbnailUrl(
  thumb: ExamThumbnail | string | null | undefined,
  variant: "card" | "og" = "card",
): string | null {
  if (!thumb || typeof thumb === "string") return null;
  const sized = variant === "og" ? thumb.sizes?.og?.url : thumb.sizes?.card?.url;
  return absoluteCmsUrl(sized ?? thumb.url) ?? null;
}

export interface ExamListItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  examType: string;
  year: string;
  school?: string;
  province?: { slug: string; name: string } | null;
  tags?: { hot?: { enabled: boolean }; hay?: boolean };
  createdAt: string;
  views?: number;
  testOnline?: boolean;
  deReady?: boolean;
  dapAnReady?: boolean;
  pdfFile?: { id: string; filename: string; url?: string } | string | null;
  answerFile?: { id: string; filename: string; url?: string } | string | null;
  _status?: "draft" | "published";
  thumbnail?: ExamThumbnail | string | null;
}

export interface ExamListResponse {
  items: ExamListItem[];
  total: number;
  limit: number;
  offset: number;
}

export interface SidebarItem {
  label: string;
  filterQuery: string;
  count: number;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export interface SidebarFacetsResponse {
  groups: SidebarGroup[];
}

export interface CmsExamDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  examType: string;
  year: string;
  examDate?: string | null;
  totalQuestions?: number | null;
  durationMinutes?: number | null;
  school?: string;
  province?: { slug: string; name: string } | null;
  pdfFile?: { id: string; filename: string; url?: string } | string | null;
  answerFile?: { id: string; filename: string; url?: string } | string | null;
  views?: number;
  testOnline?: boolean;
  deReady?: boolean;
  dapAnReady?: boolean;
  _status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  thumbnail?: ExamThumbnail | string | null;
}

export async function fetchExamsList(q: ExamListQuery): Promise<ExamListResponse> {
  const url = `${cmsBase()}/api/search-exams${buildQuery(q)}`;
  const res = await fetch(url, { next: { revalidate: 31, tags: ["exams-list"] } });
  if (!res.ok) throw new Error(`search-exams failed: ${res.status}`);
  return res.json();
}

export async function fetchSidebarFacets(): Promise<SidebarFacetsResponse> {
  try {
    const res = await fetch(`${cmsBase()}/api/exams/sidebar-facets`, {
      next: { revalidate: 300, tags: ["exams-sidebar-facets"] },
    });
    if (!res.ok) return { groups: [] };
    return res.json();
  } catch {
    return { groups: [] };
  }
}

export async function fetchExamBySlug(slug: string): Promise<CmsExamDetail | null> {
  try {
    const url =
      `${cmsBase()}/api/exams?where[slug][equals]=${encodeURIComponent(slug)}` +
      `&where[_status][equals]=published&depth=1&limit=1`;
    const res = await fetch(url, { next: { revalidate: 31, tags: [`exam:${slug}`] } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Related exams for internal linking: same category, newest first, current
 * exam removed, capped. Best-effort — returns [] on any failure.
 */
export async function fetchRelatedExams(
  category: string,
  excludeSlug: string,
  limit = 6,
): Promise<ExamListItem[]> {
  try {
    const res = await fetchExamsList({ cat: category, sort: "latest", limit: limit + 1 });
    return res.items.filter((e) => e.slug !== excludeSlug).slice(0, limit);
  } catch {
    return [];
  }
}
