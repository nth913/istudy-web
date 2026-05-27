export type CatId = 'thpt' | 'l10' | 'hsa' | 'blog';

export interface Cat {
  id: CatId;
  label: string;
  short: string;
}

export interface PopularTag {
  id: string;
  label: string;
  hot?: boolean;
}

export interface Trending {
  rank: number;
  label: string;
  delta: string | null;
}

export interface SearchResult {
  id: string;
  cat: CatId;
  href: string;
  title: string;
  meta: string[];
}

export const CATS: Cat[] = [
  { id: 'thpt', label: 'Đề THPT', short: 'THPT' },
  { id: 'l10', label: 'Đề vào lớp 10', short: 'Vào 10' },
  { id: 'hsa', label: 'Đề HSA', short: 'HSA' },
  { id: 'blog', label: 'Blog', short: 'Blog' },
];

export const POPULAR_TAGS: PopularTag[] = [
  { id: 'tk25', label: 'Đề tham khảo 2025', hot: true },
  { id: 'wf', label: 'Word formation' },
  { id: 'rc', label: 'Reading comprehension' },
  { id: 'st', label: 'Sentence transformation' },
  { id: 'mh', label: 'Đề minh hoạ Bộ GD', hot: true },
  { id: 'hsa', label: 'HSA Đợt 1 — 2025', hot: true },
  { id: 'cond', label: 'Câu điều kiện' },
  { id: 'pron', label: 'Pronunciation & Stress' },
];

export const PROVINCES: string[] = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng',
  'Cần Thơ', 'Nghệ An', 'Thanh Hoá', 'Quảng Ninh',
  'Nam Định', 'Bắc Ninh',
];

export const TRENDING: Trending[] = [
  { rank: 1, label: 'Đề tham khảo THPT 2025', delta: '+184%' },
  { rank: 2, label: 'HSA Đợt 1 — 2025', delta: '+92%' },
  { rank: 3, label: 'Đề vào 10 Hà Nội 2024', delta: '+41%' },
  { rank: 4, label: 'Sentence transformation', delta: '+12%' },
  { rank: 5, label: 'Word formation', delta: null },
];

export const ALL_RESULTS: SearchResult[] = [
  { id: 't1', cat: 'thpt', href: '/kho-de-thi', title: 'Đề tham khảo tốt nghiệp THPT 2025 — Tiếng Anh (Bộ GD&ĐT)', meta: ['Bộ GD&ĐT', '50 câu · 60 phút', 'Có đáp án'] },
  { id: 't2', cat: 'thpt', href: '/kho-de-thi', title: 'Đề thi thử THPT 2025 — Sở GD Thanh Hoá lần 1', meta: ['Thanh Hoá', '50 câu', 'Có đáp án'] },
  { id: 't3', cat: 'thpt', href: '/kho-de-thi', title: 'Đề thi tốt nghiệp THPT 2024 — Mã đề 401', meta: ['Bộ GD&ĐT', 'Chính thức', 'Có lời giải'] },
  { id: 't4', cat: 'thpt', href: '/kho-de-thi', title: 'Đề minh hoạ THPT 2025 — chuyên đề Reading comprehension', meta: ['Bộ GD&ĐT', 'Theo chuyên đề'] },
  { id: 'l1', cat: 'l10', href: '/kho-de-thi', title: 'Đề tuyển sinh vào 10 Hà Nội 2024 — Tiếng Anh', meta: ['Sở GD Hà Nội', '40 câu · 60 phút'] },
  { id: 'l2', cat: 'l10', href: '/kho-de-thi', title: 'Đề thi vào lớp 10 chuyên Anh — THPT Chuyên Ngoại Ngữ 2024', meta: ['ULIS', 'Chuyên', 'Có đáp án'] },
  { id: 'l3', cat: 'l10', href: '/kho-de-thi', title: 'Đề tuyển sinh vào 10 TP.HCM 2024 — Tiếng Anh', meta: ['Sở GD TP.HCM', '36 câu'] },
  { id: 'l4', cat: 'l10', href: '/kho-de-thi', title: 'Đề thi thử vào 10 Hà Nội — chuyên Sentence transformation', meta: ['Hà Nội', 'Chuyên đề'] },
  { id: 'h1', cat: 'hsa', href: '/kho-de-thi', title: 'HSA Đợt 1 — 2025: Phần Tiếng Anh (ĐHQG Hà Nội)', meta: ['ĐHQG HN', 'Đánh giá năng lực'] },
  { id: 'h2', cat: 'hsa', href: '/kho-de-thi', title: 'HSA 2024 — Phần Tiếng Anh, đề luyện theo dạng', meta: ['Luyện tập', '50 câu'] },
  { id: 'b1', cat: 'blog', href: '/bai-viet', title: '10 mẹo làm Reading comprehension điểm cao — Cô Mai Phương', meta: ['Cô Mai Phương', '5 phút đọc'] },
  { id: 'b2', cat: 'blog', href: '/bai-viet', title: 'Phân biệt Present Perfect & Past Simple — bài tập kèm đáp án', meta: ['Ngữ pháp', '8 phút đọc'] },
];

export function filterResults(q: string): SearchResult[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return ALL_RESULTS.filter((r) =>
    r.title.toLowerCase().includes(needle) ||
    r.meta.join(' ').toLowerCase().includes(needle)
  );
}

export function groupByCat(list: SearchResult[]): Record<CatId, SearchResult[]> {
  const g: Record<CatId, SearchResult[]> = { thpt: [], l10: [], hsa: [], blog: [] };
  list.forEach((r) => g[r.cat].push(r));
  return g;
}

export const RECENT_KEY = 'istudy.search.recent';
export const RECENT_DEFAULTS = ['đề tham khảo 2025', 'reading comprehension lớp 10', 'Hà Nội 2024'];

export function loadRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (raw) return (JSON.parse(raw) as string[]).slice(0, 6);
  } catch {}
  return RECENT_DEFAULTS;
}

export function saveRecent(list: string[]): void {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 6))); } catch {}
}

export function pushRecent(q: string): string[] {
  const trimmed = q.trim();
  if (!trimmed) return loadRecent();
  const list = loadRecent().filter((r) => r.toLowerCase() !== trimmed.toLowerCase());
  list.unshift(trimmed);
  saveRecent(list);
  return list;
}

export function removeRecent(q: string): string[] {
  const list = loadRecent().filter((r) => r !== q);
  saveRecent(list);
  return list;
}

export function highlight(text: string, q: string): string {
  if (!q || !q.trim()) return escapeHtml(text);
  const parts = q.trim().split(/\s+/).filter(Boolean)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!parts.length) return escapeHtml(text);
  const re = new RegExp('(' + parts.join('|') + ')', 'gi');
  return escapeHtml(text).replace(re, '<mark class="spl-hl">$1</mark>');
}

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c] as string));
}
