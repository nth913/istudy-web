import { describe, it, expect, vi } from 'vitest'
import { GET } from './route'

vi.mock('@vercel/og', () => ({
  ImageResponse: vi.fn().mockImplementation((_jsx, options) => ({
    status: 200,
    headers: new Headers({
      'content-type': 'image/png',
      'cache-control': 'public, immutable, max-age=31536000',
    }),
    options,
  })),
}))

const buildReq = (url: string) => new Request(url)

describe('/api/og route handler', () => {
  it('post type build template với title + subtitle', async () => {
    const res = await GET(buildReq('https://x.com/api/og/post/hello-world?t=Hello&sub=Blog'), {
      params: Promise.resolve({ slug: ['post', 'hello-world'] }),
    })
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('image/png')
    expect(res.headers.get('cache-control')).toContain('immutable')
  })

  it('default type khi slug=[default]', async () => {
    const res = await GET(buildReq('https://x.com/api/og/default'), {
      params: Promise.resolve({ slug: ['default'] }),
    })
    expect(res.status).toBe(200)
  })

  it('exam/event/book type accepted', async () => {
    for (const type of ['exam', 'event', 'book']) {
      const res = await GET(buildReq(`https://x.com/api/og/${type}/x?t=T`), {
        params: Promise.resolve({ slug: [type, 'x'] }),
      })
      expect(res.status).toBe(200)
    }
  })

  it('unknown type → 400', async () => {
    const res = await GET(buildReq('https://x.com/api/og/unknown/x'), {
      params: Promise.resolve({ slug: ['unknown', 'x'] }),
    })
    expect(res.status).toBe(400)
  })
})
