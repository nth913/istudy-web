import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchSearch, fetchSearchMeta } from '../search'

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
