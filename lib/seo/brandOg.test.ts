import { describe, it, expect, afterEach } from 'vitest'
import { djb2, pickBrandOg, absoluteUrl, BRAND_OG_POOL } from './brandOg'

describe('djb2', () => {
  it('same input → same output (deterministic)', () => {
    expect(djb2('hello')).toBe(djb2('hello'))
    expect(djb2('exams/toeic-1')).toBe(djb2('exams/toeic-1'))
  })

  it('different inputs → different outputs (no obvious collisions)', () => {
    expect(djb2('a')).not.toBe(djb2('b'))
    expect(djb2('posts/x')).not.toBe(djb2('posts/y'))
  })

  it('returns non-negative integer', () => {
    const h = djb2('anything')
    expect(Number.isInteger(h)).toBe(true)
    expect(h).toBeGreaterThanOrEqual(0)
  })
})

describe('pickBrandOg', () => {
  it('returns a path from BRAND_OG_POOL', () => {
    const path = pickBrandOg('exams/toeic-1')
    expect(BRAND_OG_POOL).toContain(path)
  })

  it('same seed → same brand (deterministic)', () => {
    expect(pickBrandOg('posts/hello')).toBe(pickBrandOg('posts/hello'))
  })

  it('distributes across all 4 buckets over 1000 seeds', () => {
    const counts = new Map<string, number>()
    for (let i = 0; i < 1000; i++) {
      const p = pickBrandOg(`seed-${i}`)
      counts.set(p, (counts.get(p) ?? 0) + 1)
    }
    expect(counts.size).toBe(BRAND_OG_POOL.length)
    for (const c of counts.values()) {
      expect(c).toBeGreaterThan(150)
      expect(c).toBeLessThan(400)
    }
  })

  it('returns /og/brand-N.webp format for N in [0,3]', () => {
    for (let i = 0; i < 20; i++) {
      const p = pickBrandOg(`s-${i}`)
      expect(p).toMatch(/^\/og\/brand-[0-3]\.webp$/)
    }
  })
})

describe('absoluteUrl', () => {
  const savedEnv = process.env.NEXT_PUBLIC_SITE_URL

  afterEach(() => {
    if (savedEnv === undefined) delete process.env.NEXT_PUBLIC_SITE_URL
    else process.env.NEXT_PUBLIC_SITE_URL = savedEnv
  })

  it('prefixes path with NEXT_PUBLIC_SITE_URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://aistudy.com.vn'
    expect(absoluteUrl('/og/brand-0.webp')).toBe('https://aistudy.com.vn/og/brand-0.webp')
  })

  it('defaults to https://aistudy.com.vn when env absent', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    expect(absoluteUrl('/og/brand-0.webp')).toBe('https://aistudy.com.vn/og/brand-0.webp')
  })

  it('trims trailing slash from base URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://aistudy.com.vn/'
    expect(absoluteUrl('/og/x.webp')).toBe('https://aistudy.com.vn/og/x.webp')
  })

  it('prepends leading slash if path missing one', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://aistudy.com.vn'
    expect(absoluteUrl('og/x.webp')).toBe('https://aistudy.com.vn/og/x.webp')
  })
})
