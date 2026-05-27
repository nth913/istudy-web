export const BRAND_OG_POOL = [
  '/og/brand-0.webp',
  '/og/brand-1.webp',
  '/og/brand-2.webp',
  '/og/brand-3.webp',
] as const

export function djb2(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0
  }
  return h >>> 0
}

export function pickBrandOg(seed: string): (typeof BRAND_OG_POOL)[number] {
  return BRAND_OG_POOL[djb2(seed) % BRAND_OG_POOL.length]
}

export function absoluteUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aistudy.com.vn').replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}
