import { absoluteUrl, pickBrandOg } from './brandOg'
import { fetchSeoConfig } from './seoConfig'
import type { CollType, MediaRef, ResolvedSeo, SeoConfigGlobal, SeoSource } from './types'

let fetcher: () => Promise<SeoConfigGlobal> = fetchSeoConfig

export function __setSeoConfigFetcher(fn: () => Promise<SeoConfigGlobal>) {
  fetcher = fn
}

function mediaUrl(m: MediaRef): string | null {
  if (!m || typeof m === 'string') return null
  const raw = m.sizes?.og?.url ?? m.url ?? null
  if (!raw) return null
  if (/^https?:\/\//.test(raw)) return raw
  if (raw.startsWith('/')) {
    const base = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3131'
    return `${base.replace(/\/$/, '')}${raw}`
  }
  return raw
}

function mediaAlt(m: MediaRef): string {
  if (!m || typeof m === 'string') return ''
  return m.alt ?? ''
}

function buildSeed(src: SeoSource): string {
  const coll = src.collection ?? 'static'
  const key = src.record?.slug ?? src.routeTitle ?? 'index'
  return `${coll}/${key}`
}

export async function resolveSeo(src: SeoSource): Promise<ResolvedSeo> {
  const cfg = await fetcher()
  const suffix = cfg.defaultTitleSuffix ?? ''
  const baseTitle = src.record?.seo?.title ?? src.record?.title ?? src.routeTitle ?? cfg.defaultTitle ?? 'istudy'
  const title = `${baseTitle}${suffix}`
  const description =
    src.record?.seo?.description ??
    src.routeDescription ??
    cfg.defaultDescription ??
    ''

  const ogTitle = src.record?.seo?.ogTitle ?? baseTitle
  const ogDescription = src.record?.seo?.ogDescription ?? description

  const recordOg = src.record?.seo?.ogImage
  const collOg = src.collection ? cfg.collectionDefaults?.[src.collection]?.ogImage : null
  const globalOg = cfg.defaultOgImage

  const ogImageUrl =
    mediaUrl(recordOg) ??
    mediaUrl(collOg) ??
    mediaUrl(globalOg) ??
    absoluteUrl(pickBrandOg(buildSeed(src)))

  const ogImageAlt =
    mediaAlt(recordOg) ||
    mediaAlt(collOg) ||
    mediaAlt(globalOg) ||
    `${baseTitle}`

  return {
    title,
    description,
    ogTitle,
    ogDescription,
    ogImageUrl,
    ogImageAlt,
    twitterHandle: cfg.twitterHandle,
    noindex: src.noindex,
  }
}
