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
  _status?: "draft" | "published";
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
  school?: string;
  province?: { slug: string; name: string } | null;
  pdfFile?: { id: string; filename: string; url?: string } | string | null;
  answerFile?: { id: string; filename: string; url?: string } | string | null;
  views?: number;
  testOnline?: boolean;
  _status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export async function fetchExamsList(q: ExamListQuery): Promise<ExamListResponse> {
  const url = `${cmsBase()}/api/search-exams${buildQuery(q)}`;
  const res = await fetch(url, { next: { revalidate: 60, tags: ["exams-list"] } });
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
    const url = `${cmsBase()}/api/exams?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`;
    const res = await fetch(url, { next: { revalidate: 60, tags: [`exam:${slug}`] } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] ?? null;
  } catch {
    return null;
  }
}
