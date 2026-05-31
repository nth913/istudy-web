import type { CatId, PopularTag, Trending } from '../search-popup-data'

export interface SearchResultDTO {
  id: string
  cat: CatId
  href: string
  title: string
  meta: string[]
}

export interface SearchResponse {
  thpt: SearchResultDTO[]
  l10: SearchResultDTO[]
  hsa: SearchResultDTO[]
  blog: SearchResultDTO[]
  order?: CatId[]
  total: number
  tookMs?: number
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
