const CMS = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3131'

export interface HeroConfig {
  tiltAngle: number
}

export async function fetchHeroConfig(): Promise<HeroConfig> {
  try {
    const res = await fetch(`${CMS}/api/globals/hero-config`, {
      next: { revalidate: 120 },
    })
    if (!res.ok) return { tiltAngle: 1.2 }
    const data = await res.json()
    return { tiltAngle: typeof data.tiltAngle === 'number' ? data.tiltAngle : 1.2 }
  } catch {
    return { tiltAngle: 1.2 }
  }
}
