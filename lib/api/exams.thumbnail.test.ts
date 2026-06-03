import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { examThumbnailUrl } from './exams'

describe('examThumbnailUrl', () => {
  const prev = process.env.NEXT_PUBLIC_CMS_URL
  beforeEach(() => { process.env.NEXT_PUBLIC_CMS_URL = 'https://cdn.aistudy.com.vn' })
  afterEach(() => {
    if (prev === undefined) delete process.env.NEXT_PUBLIC_CMS_URL
    else process.env.NEXT_PUBLIC_CMS_URL = prev
  })

  it('returns null for missing / string thumbnail', () => {
    expect(examThumbnailUrl(null)).toBeNull()
    expect(examThumbnailUrl(undefined)).toBeNull()
    expect(examThumbnailUrl('media-id-only')).toBeNull()
  })

  it('prefers sizes.card.url for the card variant', () => {
    const t = { url: '/api/media/file/a.png', sizes: { card: { url: 'https://cdn.aistudy.com.vn/c.webp' } } }
    expect(examThumbnailUrl(t, 'card')).toBe('https://cdn.aistudy.com.vn/c.webp')
  })

  it('prefers sizes.og.url for the og variant', () => {
    const t = { url: '/x.png', sizes: { og: { url: 'https://cdn.aistudy.com.vn/o.jpg' }, card: { url: 'https://cdn.aistudy.com.vn/c.webp' } } }
    expect(examThumbnailUrl(t, 'og')).toBe('https://cdn.aistudy.com.vn/o.jpg')
  })

  it('falls back to base url when the requested size is missing', () => {
    const t = { url: 'https://cdn.aistudy.com.vn/base.png' }
    expect(examThumbnailUrl(t, 'card')).toBe('https://cdn.aistudy.com.vn/base.png')
  })

  it('prefixes a relative url with the CMS base', () => {
    const t = { sizes: { card: { url: '/api/media/file/c.webp' } } }
    expect(examThumbnailUrl(t, 'card')).toBe('https://cdn.aistudy.com.vn/api/media/file/c.webp')
  })
})
