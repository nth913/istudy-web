function cmsBase(): string {
  return process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3131'
}

export interface ExamListItem {
  id: string
  slug: string
  title: string
  category: string
  examType: string
  year: string
  school?: string
  province?: { slug: string; name: string } | null
  tags?: { hot?: { enabled: boolean }; hay?: boolean }
  createdAt: string
  views?: number
}

export interface ExamListQuery {
  cat?: string
  province?: string
  year?: string
  sort?: 'latest' | 'popular' | 'views'
  limit?: number
  offset?: number
}

export interface ExamListResponse {
  items: ExamListItem[]
  total: number
  limit: number
  offset: number
}

export interface SidebarItem {
  label: string
  filterQuery: string
  count: number
}

export interface SidebarGroup {
  title: string
  items: SidebarItem[]
}

export interface SidebarFacetsResponse {
  groups: SidebarGroup[]
}

function buildQuery(q: ExamListQuery): string {
  const sp = new URLSearchParams()
  if (q.cat) sp.set('cat', q.cat)
  if (q.province) sp.set('province', q.province)
  if (q.year) sp.set('year', q.year)
  if (q.sort) sp.set('sort', q.sort)
  if (q.limit != null) sp.set('limit', String(q.limit))
  if (q.offset != null) sp.set('offset', String(q.offset))
  const s = sp.toString()
  return s ? `?${s}` : ''
}

export async function fetchExamsList(q: ExamListQuery): Promise<ExamListResponse> {
  const url = `${cmsBase()}/api/search-exams${buildQuery(q)}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`search-exams failed: ${res.status}`)
  return res.json()
}

export async function fetchSidebarFacets(): Promise<SidebarFacetsResponse> {
  try {
    const url = `${cmsBase()}/api/exams/sidebar-facets`
    const res = await fetch(url, { next: { revalidate: 300 } })
    if (!res.ok) return { groups: [] }
    return res.json()
  } catch {
    return { groups: [] }
  }
}
