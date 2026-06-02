import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchSearchConfig, DEFAULT_SEARCH_CONFIG } from '../search'

afterEach(() => vi.restoreAllMocks())

describe('fetchSearchConfig', () => {
  it('returns DEFAULT_SEARCH_CONFIG on fetch error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network') }))
    expect(await fetchSearchConfig()).toEqual(DEFAULT_SEARCH_CONFIG)
  })
  it('maps API body, adding rank to trending', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({
        maxTags: 5, maxProvinces: 3, maxTrending: 2, loadingTimeoutMs: 8000,
        defaultTags: [{ id: 'a', label: 'A' }], defaultProvinces: ['Hà Nội'],
        defaultTrending: [{ label: 'X', href: '/h', delta: null }],
      }),
    })))
    const cfg = await fetchSearchConfig()
    expect(cfg.maxTags).toBe(5)
    expect(cfg.defaultTrending[0]).toMatchObject({ rank: 1, label: 'X', href: '/h', delta: null })
  })
})
