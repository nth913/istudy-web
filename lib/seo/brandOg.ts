export const BRAND_OG_DEFAULT = '/og/brand-3.webp' as const

export function absoluteUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aistudy.com.vn').replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}
