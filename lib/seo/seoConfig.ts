import type { SeoConfigGlobal } from './types'

const CMS = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3131'

export async function fetchSeoConfig(): Promise<SeoConfigGlobal> {
  try {
    const res = await fetch(`${CMS}/api/globals/seo-config?depth=2`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) return {}
    return (await res.json()) as SeoConfigGlobal
  } catch {
    return {}
  }
}
