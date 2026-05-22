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
