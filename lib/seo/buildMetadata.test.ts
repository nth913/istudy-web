import { describe, it, expect } from 'vitest'
import { buildMetadata } from './buildMetadata'
import type { ResolvedSeo } from './types'

const sample: ResolvedSeo = {
  title: 'Hello — istudy',
  description: 'Hello desc',
  ogTitle: 'Hello',
  ogDescription: 'Hello desc',
  ogImageUrl: 'https://cdn/x.png',
  ogImageAlt: 'x',
  twitterHandle: '@istudy',
}

describe('buildMetadata', () => {
  it('return Next Metadata object với openGraph + twitter', () => {
    const meta = buildMetadata(sample, 'https://aistudy.com.vn/bai-viet-chi-tiet/hello')
    expect(meta.title).toBe('Hello — istudy')
    expect(meta.description).toBe('Hello desc')
    expect(meta.openGraph?.images).toEqual([{
      url: 'https://cdn/x.png', alt: 'x', width: 1200, height: 630,
    }])
    expect(meta.openGraph?.title).toBe('Hello')
    expect(meta.openGraph?.description).toBe('Hello desc')
    expect((meta.twitter as any)?.card).toBe('summary_large_image')
    expect((meta.twitter as any)?.site).toBe('@istudy')
    expect((meta.twitter as any).images).toEqual(['https://cdn/x.png'])
    expect(meta.alternates?.canonical).toBe('https://aistudy.com.vn/bai-viet-chi-tiet/hello')
  })

  it('noindex set robots noindex,nofollow', () => {
    const meta = buildMetadata({ ...sample, noindex: true })
    expect(meta.robots).toEqual({ index: false, follow: false })
  })

  it('relative ogImageUrl pass through không bị mutate', () => {
    const meta = buildMetadata({ ...sample, ogImageUrl: '/api/og/post/x?t=Hello' })
    expect((meta.openGraph?.images as any)?.[0]).toMatchObject({ url: '/api/og/post/x?t=Hello' })
  })
})
