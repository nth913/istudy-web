import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchMegaMenuKhoDe } from './mega-menu'

beforeEach(() => {
  vi.restoreAllMocks()
  process.env.NEXT_PUBLIC_CMS_URL = 'http://cms.test'
})

describe('fetchMegaMenuKhoDe', () => {
  it('return parsed body on 200', async () => {
    const body = {
      vao10: {
        chinhThuc: { years: [{ year: '2026', count: 3 }] },
        thiThu: { hot: [], new: [] },
        minhHoa: { hot: [], new: [] },
      },
      thptQg: {
        chinhThuc: { years: [] },
        thiThu: { hot: [], new: [] },
        minhHoa: { hot: [], new: [] },
      },
    }
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    const result = await fetchMegaMenuKhoDe()
    expect(result?.vao10.chinhThuc.years[0].year).toBe('2026')
  })

  it('return null on 5xx', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response(null, { status: 500 }))
    const result = await fetchMegaMenuKhoDe()
    expect(result).toBeNull()
  })

  it('return null on fetch throw', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network'))
    const result = await fetchMegaMenuKhoDe()
    expect(result).toBeNull()
  })

  it('pass revalidate + tag in fetch options', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('{}', {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    await fetchMegaMenuKhoDe()
    const init = fetchMock.mock.calls[0][1] as any
    expect(init?.next?.revalidate).toBe(600)
    expect(init?.next?.tags).toEqual(['mega-menu-kho-de'])
  })

  it('use NEXT_PUBLIC_CMS_URL as base', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('{}', {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    await fetchMegaMenuKhoDe()
    const url = String(fetchMock.mock.calls[0][0])
    expect(url).toBe('http://cms.test/api/mega-menu/kho-de')
  })
})
