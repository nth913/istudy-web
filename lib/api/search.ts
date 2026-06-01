import type { CatId, PopularTag, Trending } from '../search-popup-data'

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
