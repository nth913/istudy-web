import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchSearch, fetchSearchMeta, fetchDrilldown } from '../search'

const originalFetch = global.fetch

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_CMS_URL', 'http://cms.test')
})

afterEach(() => {
  global.fetch = originalFetch
  vi.unstubAllEnvs()
})

describe('fetchSearch', () => {
  it('builds URL with q + limit', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ thpt: [], l10: [], hsa: [], blog: [], total: 0 }) })
    global.fetch = fetchSpy as any
    const ac = new AbortController()
    await fetchSearch('đọc hiểu', ac.signal)
    expect(fetchSpy).toHaveBeenCalledWith(
      'http://cms.test/api/search?q=%C4%91%E1%BB%8Dc+hi%E1%BB%83u&limit=8',
      expect.objectContaining({ signal: ac.signal }),
    )
  })

  it('throws on non-2xx', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }) as any
    await expect(fetchSearch('x', new AbortController().signal)).rejects.toThrow(/500/)
  })

  it('returns parsed body', async () => {
    const data = { thpt: [{ id: '1', cat: 'thpt', href: '/x', title: 't', meta: [] }], l10: [], hsa: [], blog: [], total: 1 }
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => data }) as any
    const result = await fetchSearch('x', new AbortController().signal)
    expect(result).toEqual(data)
  })
})

describe('fetchSearchMeta', () => {
  it('hits /api/search/meta', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ trending: [], popularTags: [], provinces: [], featured: null }) })
    global.fetch = fetchSpy as any
    await fetchSearchMeta()
    expect(fetchSpy).toHaveBeenCalledWith('http://cms.test/api/search/meta', expect.any(Object))
  })

  it('throws on non-2xx', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 503 }) as any
    await expect(fetchSearchMeta()).rejects.toThrow(/503/)
  })
})

describe('fetchDrilldown', () => {
  it('builds URL with cat/q/year/hasAnswer/sort/offset/limit/facets', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ items: [], total: 0, hasMore: false }), { status: 200 }),
    )
    await fetchDrilldown({ cat: 'thpt', q: 'de', year: '2025', hasAnswer: true, sort: 'oldest', offset: 20, limit: 20, facets: true }, new AbortController().signal)
    const url = (spy.mock.calls[0][0] as string)
    expect(url).toContain('/api/search-drilldown?')
    expect(url).toContain('cat=thpt'); expect(url).toContain('q=de'); expect(url).toContain('year=2025')
    expect(url).toContain('hasAnswer=true'); expect(url).toContain('sort=oldest'); expect(url).toContain('offset=20')
    expect(url).toContain('facets=year')
  })
  it('omits year when "all"', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{"items":[],"total":0,"hasMore":false}', { status: 200 }))
    await fetchDrilldown({ cat: 'l10', q: 'x', year: 'all', sort: 'newest' }, new AbortController().signal)
    expect(spy.mock.calls[0][0] as string).not.toContain('year=')
  })
})
