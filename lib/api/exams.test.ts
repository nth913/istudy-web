import { describe, it, expect, vi, beforeEach } from 'vitest'

const ORIG_FETCH = global.fetch

beforeEach(() => {
  process.env.NEXT_PUBLIC_CMS_URL = 'http://cms.test'
  global.fetch = vi.fn()
})

import { fetchExamsList, fetchSidebarFacets } from './exams'

describe('fetchExamsList', () => {
  it('builds URL with query params', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [], total: 0, limit: 20, offset: 0 }),
    })
    await fetchExamsList({ cat: 'vao-10', province: 'ha-noi', year: '2026', sort: 'views', limit: 10, offset: 5 })
    const url = (global.fetch as any).mock.calls[0][0]
    expect(url).toContain('http://cms.test/api/search-exams')
    expect(url).toContain('cat=vao-10')
    expect(url).toContain('province=ha-noi')
    expect(url).toContain('year=2026')
    expect(url).toContain('sort=views')
    expect(url).toContain('limit=10')
    expect(url).toContain('offset=5')
  })

  it('omits empty params', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [], total: 0, limit: 20, offset: 0 }),
    })
    await fetchExamsList({})
    const url = (global.fetch as any).mock.calls[0][0]
    expect(url).not.toContain('cat=')
    expect(url).not.toContain('province=')
  })

  it('returns parsed response', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [{ slug: 'a' }], total: 1, limit: 20, offset: 0 }),
    })
    const res = await fetchExamsList({})
    expect(res.total).toBe(1)
    expect(res.items[0].slug).toBe('a')
  })

  it('throws when non-200', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({ ok: false, status: 500 })
    await expect(fetchExamsList({})).rejects.toThrow('search-exams failed')
  })
})

describe('fetchSidebarFacets', () => {
  it('fetches sidebar facets', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ groups: [{ title: 'X', items: [] }] }),
    })
    const res = await fetchSidebarFacets()
    expect(res.groups.length).toBe(1)
    expect(res.groups[0].title).toBe('X')
  })

  it('returns empty groups on error', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({ ok: false, status: 500 })
    const res = await fetchSidebarFacets()
    expect(res.groups).toEqual([])
  })
})
