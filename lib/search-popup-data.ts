export type CatId = 'thpt' | 'l10' | 'hsa' | 'blog';

export interface Cat {
  id: CatId;
  label: string;
  short: string;
}

export interface PopularTag {
  id: string;
  label: string;
  slug?: string;
  hot?: boolean;
}

export interface Trending {
  rank: number;
  label: string;
  delta: string | null;
  href?: string;
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

export function resolveSectionOrder(order?: CatId[]): Cat[] {
  if (!order?.length) return [...CATS];                  // thiếu/undefined → canonical (copy: tránh share mutable ref)
  const byId = new Map(CATS.map((c) => [c.id, c]));
  const seen = new Set<CatId>();
  const out: Cat[] = [];
  for (const id of order) {
    const c = byId.get(id);
    if (c && !seen.has(id)) { out.push(c); seen.add(id); }   // bỏ id lạ + dedup
  }
  for (const c of CATS) if (!seen.has(c.id)) out.push(c);    // bù cat thiếu theo canonical
  return out;
}

export const RECENT_KEY = 'istudy.search.recent';
export const RECENT_MAX = 6;

export function loadRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.slice(0, RECENT_MAX);
    }
  } catch {}
  return [];
}

export function saveRecent(list: string[]): void {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_MAX))); } catch {}
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
  const re = new RegExp(parts.join('|'), 'gi');
  let out = '';
  let last = 0;
  for (const m of text.matchAll(re)) {
    const idx = m.index!;
    out += escapeHtml(text.slice(last, idx))
      + '<mark class="spl-hl">' + escapeHtml(m[0]) + '</mark>';
    last = idx + m[0].length;
  }
  out += escapeHtml(text.slice(last));
  return out;
}

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c] as string));
}

export interface SectionView<T> { loading: boolean; items: T[] }
export function resolveSectionItems<T>(opts: {
  metaState: 'loading' | 'ready' | 'error';
  timedOut: boolean;
  real: T[];
  def: T[];
  count: number;
}): SectionView<T> {
  const { metaState, timedOut, real, def, count } = opts;
  if (metaState === 'ready' && real.length > 0) return { loading: false, items: real.slice(0, count) };
  if (metaState === 'ready' || metaState === 'error' || timedOut) return { loading: false, items: def.slice(0, count) };
  return { loading: true, items: [] };
}
