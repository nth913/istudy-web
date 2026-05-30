import { describe, it, expect, afterEach } from 'vitest'
import { absoluteUrl, BRAND_OG_DEFAULT } from './brandOg'

describe('BRAND_OG_DEFAULT', () => {
  it('points to /og/brand-3.webp', () => {
    expect(BRAND_OG_DEFAULT).toBe('/og/brand-3.webp')
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
    expect(absoluteUrl('/og/brand-3.webp')).toBe('https://aistudy.com.vn/og/brand-3.webp')
  })

  it('defaults to https://aistudy.com.vn when env absent', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    expect(absoluteUrl('/og/brand-3.webp')).toBe('https://aistudy.com.vn/og/brand-3.webp')
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
