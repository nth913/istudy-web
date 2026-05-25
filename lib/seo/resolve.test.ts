import { describe, it, expect, beforeEach } from 'vitest'
import { resolveSeo, __setSeoConfigFetcher } from './resolve'
import type { SeoConfigGlobal } from './types'

const baseConfig: SeoConfigGlobal = {
  siteName: 'iStudy',
  defaultTitle: 'iStudy — Học tiếng Anh',
  defaultTitleSuffix: ' — istudy',
  defaultDescription: 'Nền tảng học tiếng Anh',
  defaultOgImage: { url: 'https://cdn/global.png', alt: 'global' },
  collectionDefaults: {
    posts:  { ogImage: { url: 'https://cdn/coll-posts.png',  alt: 'coll posts' } },
    exams:  { ogImage: { url: 'https://cdn/coll-exams.png',  alt: 'coll exams' } },
    events: { ogImage: { url: 'https://cdn/coll-events.png', alt: 'coll events' } },
    books:  { ogImage: { url: 'https://cdn/coll-books.png',  alt: 'coll books' } },
  },
  twitterHandle: '@istudy',
}

describe('resolveSeo — 3-tier fallback', () => {
  beforeEach(() => {
    __setSeoConfigFetcher(async () => baseConfig)
  })

  it('record.seo.ogImage có URL → dùng URL record', async () => {
    const r = await resolveSeo({
      collection: 'posts',
      record: {
        slug: 'hello', title: 'Hello', updatedAt: '2026-01-01',
        seo: {
          title: 'Hello SEO', description: 'Hello desc',
          ogImage: { url: 'https://cdn/record.png', alt: 'record' },
        },
      },
    })
    expect(r.ogImageUrl).toBe('https://cdn/record.png')
    expect(r.ogImageAlt).toBe('record')
    expect(r.title).toBe('Hello SEO — istudy')
  })

  it('record.seo.ogImage trống → fallback collection default', async () => {
    const r = await resolveSeo({
      collection: 'posts',
      record: { slug: 'x', title: 'X', seo: { title: 'X', description: 'd' } },
    })
    expect(r.ogImageUrl).toBe('https://cdn/coll-posts.png')
  })

  it('collection default trống → fallback global', async () => {
    __setSeoConfigFetcher(async () => ({
      ...baseConfig,
      collectionDefaults: { posts: { ogImage: null }, exams: {}, events: {}, books: {} },
    }))
    const r = await resolveSeo({
      collection: 'posts',
      record: { slug: 'x', title: 'X' },
    })
    expect(r.ogImageUrl).toBe('https://cdn/global.png')
  })

  it('global trống → auto-gen URL `/api/og/<coll>/<slug>?t=&sub=&v=`', async () => {
    __setSeoConfigFetcher(async () => ({ siteName: 'iStudy' }))
    const r = await resolveSeo({
      collection: 'exams',
      record: { slug: 'toeic-1', title: 'TOEIC #1', updatedAt: '2026-05-01' },
      subtitle: 'Đề thi',
    })
    expect(r.ogImageUrl).toMatch(/^\/api\/og\/exam\/toeic-1\?/)
    expect(r.ogImageUrl).toContain('t=TOEIC%20%231')
    expect(r.ogImageUrl).toContain('sub=%C4%90%E1%BB%81%20thi')
    expect(r.ogImageUrl).toContain('v=2026-05-01')
  })

  it('static page (collection null) trống → auto-gen `/api/og/default`', async () => {
    __setSeoConfigFetcher(async () => ({ siteName: 'iStudy' }))
    const r = await resolveSeo({ collection: null, routeTitle: 'Trang chủ' })
    expect(r.ogImageUrl).toMatch(/^\/api\/og\/default/)
    expect(r.title).toContain('Trang chủ')
  })

  it('record.seo.ogTitle override → ogTitle dùng override', async () => {
    const r = await resolveSeo({
      collection: 'posts',
      record: { slug: 'x', title: 'A', seo: { title: 'B', ogTitle: 'C — share' } },
    })
    expect(r.ogTitle).toBe('C — share')
    expect(r.title).toBe('B — istudy')
  })

  it('noindex flag pass through', async () => {
    const r = await resolveSeo({ collection: null, routeTitle: 'Print', noindex: true })
    expect(r.noindex).toBe(true)
  })

  it('prefer sizes.og.url khi có (Payload imageSizes 1200×630)', async () => {
    const r = await resolveSeo({
      collection: 'posts',
      record: {
        slug: 'x', title: 'X',
        seo: {
          title: 'X',
          ogImage: {
            url: 'https://cdn/original-2000x3000.jpg',
            alt: 'cat',
            sizes: { og: { url: 'https://cdn/cat-1200x630.jpg' } },
          },
        },
      },
    })
    expect(r.ogImageUrl).toBe('https://cdn/cat-1200x630.jpg')
  })

  it('fallback m.url khi sizes.og.url chưa generate (legacy)', async () => {
    const r = await resolveSeo({
      collection: 'posts',
      record: {
        slug: 'x', title: 'X',
        seo: { title: 'X', ogImage: { url: 'https://cdn/legacy.png', alt: 'legacy' } },
      },
    })
    expect(r.ogImageUrl).toBe('https://cdn/legacy.png')
  })
})
