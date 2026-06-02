import { describe, it, expect } from 'vitest'
import { resolveCanonical } from './canonical'

describe('resolveCanonical', () => {
  it('uses the record override when present', () => {
    expect(resolveCanonical({ seo: { canonicalUrl: 'https://x.com/a' } }, 'https://aistudy.com.vn/p/1')).toBe('https://x.com/a')
  })
  it('falls back to the default when no override', () => {
    expect(resolveCanonical({ seo: {} }, 'https://aistudy.com.vn/p/1')).toBe('https://aistudy.com.vn/p/1')
    expect(resolveCanonical(null, 'https://aistudy.com.vn/p/1')).toBe('https://aistudy.com.vn/p/1')
  })
})
