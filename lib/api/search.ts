import type { CatId, PopularTag, Trending } from '../search-popup-data'

export interface SearchConfigDTO {
  maxTags: number;
  maxProvinces: number;
  maxTrending: number;
  loadingTimeoutMs: number;
  defaultTags: PopularTag[];
  defaultProvinces: string[];
  defaultTrending: Trending[];
}

export const DEFAULT_SEARCH_CONFIG: SearchConfigDTO = {
  maxTags: 3,
  maxProvinces: 3,
  maxTrending: 3,
  loadingTimeoutMs: 13000,
  defaultTags: [
    { id: 'thpt', label: 'THPT' },
    { id: 'vao10', label: 'Vào 10' },
  ],
  defaultProvinces: ['Hà Nội', 'Hồ Chí Minh'],
  defaultTrending: [
    { rank: 1, label: 'Đề thi thử 2026 — Nghệ An lần 3', delta: null, href: '/de-thi-chi-tiet/exam-thi-thu-2026-nghe-an-lan-3' },
  ],
};

export async function fetchSearchConfig(): Promise<SearchConfigDTO> {
  try {
    const res = await fetch(`${base()}/api/search/config`, { next: { revalidate: 60, tags: ['search-config'] } } as RequestInit);
    if (!res.ok) throw new Error(`config ${res.status}`);
    const d = await res.json();
    return {
      maxTags: d.maxTags ?? DEFAULT_SEARCH_CONFIG.maxTags,
      maxProvinces: d.maxProvinces ?? DEFAULT_SEARCH_CONFIG.maxProvinces,
      maxTrending: d.maxTrending ?? DEFAULT_SEARCH_CONFIG.maxTrending,
      loadingTimeoutMs: d.loadingTimeoutMs ?? DEFAULT_SEARCH_CONFIG.loadingTimeoutMs,
      defaultTags: Array.isArray(d.defaultTags) ? d.defaultTags : DEFAULT_SEARCH_CONFIG.defaultTags,
      defaultProvinces: Array.isArray(d.defaultProvinces) ? d.defaultProvinces : DEFAULT_SEARCH_CONFIG.defaultProvinces,
      defaultTrending: Array.isArray(d.defaultTrending)
        ? d.defaultTrending.map((t: any, i: number) => ({ rank: i + 1, label: t.label, delta: t.delta ?? null, href: t.href }))
        : DEFAULT_SEARCH_CONFIG.defaultTrending,
    };
  } catch {
    return DEFAULT_SEARCH_CONFIG;
  }
}

export interface SearchResultDTO {
  id: string
  cat: CatId
  href: string
  title: string
  meta: string[]
  year?: string
}

export interface SearchResponse {
  thpt: SearchResultDTO[]
  l10: SearchResultDTO[]
  hsa: SearchResultDTO[]
  blog: SearchResultDTO[]
  order?: CatId[]
  total: number
  tookMs?: number
  counts?: Record<CatId, number>
}

export interface FeaturedItem {
  id: string
  cat: CatId
  href: string
  title: string
  thumbLines: string[]
  metaText: string
}

export interface MetaResponse {
  trending: Trending[]
  popularTags: PopularTag[]
  provinces: string[]
  featured: FeaturedItem | null
}

function base(): string {
  return process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3131'
}

export async function fetchSearch(q: string, signal: AbortSignal, limit = 8): Promise<SearchResponse> {
  const url = `${base()}/api/search?q=${encodeURIComponent(q).replace(/%20/g, '+')}&limit=${limit}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`search ${res.status}`)
  return res.json()
}

export async function fetchSearchMeta(): Promise<MetaResponse> {
  const url = `${base()}/api/search/meta`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`meta ${res.status}`)
  return res.json()
}

export interface DrilldownResponse {
  items: SearchResultDTO[]
  total: number
  hasMore: boolean
  facets?: { years: { year: string; count: number }[] }
}

export interface DrilldownParams {
  cat: CatId
  q: string
  year?: string
  hasAnswer?: boolean
  sort?: 'newest' | 'oldest'
  offset?: number
  limit?: number
  facets?: boolean
}

export async function fetchDrilldown(p: DrilldownParams, signal: AbortSignal): Promise<DrilldownResponse> {
  const sp = new URLSearchParams()
  sp.set('cat', p.cat)
  if (p.q) sp.set('q', p.q)
  if (p.year && p.year !== 'all') sp.set('year', p.year)
  if (p.hasAnswer) sp.set('hasAnswer', 'true')
  sp.set('sort', p.sort ?? 'newest')
  sp.set('offset', String(p.offset ?? 0))
  sp.set('limit', String(p.limit ?? 20))
  if (p.facets) sp.set('facets', 'year')
  const res = await fetch(`${base()}/api/search-drilldown?${sp.toString()}`, { signal })
  if (!res.ok) throw new Error(`drilldown ${res.status}`)
  return res.json()
}
