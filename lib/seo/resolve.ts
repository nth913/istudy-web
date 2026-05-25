import { fetchSeoConfig } from './seoConfig'
import type { CollType, MediaRef, ResolvedSeo, SeoConfigGlobal, SeoSource } from './types'

let fetcher: () => Promise<SeoConfigGlobal> = fetchSeoConfig

export function __setSeoConfigFetcher(fn: () => Promise<SeoConfigGlobal>) {
  fetcher = fn
}

function mediaUrl(m: MediaRef): string | null {
  if (!m) return null
  if (typeof m === 'string') return null
  return m.url ?? null
}

function mediaAlt(m: MediaRef): string {
  if (!m || typeof m === 'string') return ''
  return m.alt ?? ''
}

function mediaUpdatedAt(m: MediaRef): string | null {
  if (!m || typeof m === 'string') return null
  return m.updatedAt ?? null
}

const COLL_TO_OG_SEGMENT: Record<Exclude<CollType, null>, string> = {
  posts: 'post', exams: 'exam', events: 'event', books: 'book',
}

function buildAutoGenUrl(src: SeoSource, title: string, subtitle: string, v: string): string {
  const base = src.collection
    ? `/api/og/${COLL_TO_OG_SEGMENT[src.collection]}/${src.record?.slug ?? 'default'}`
    : '/api/og/default'
  const parts: string[] = []
  if (title) parts.push(`t=${encodeURIComponent(title)}`)
  if (subtitle) parts.push(`sub=${encodeURIComponent(subtitle)}`)
  if (v) parts.push(`v=${encodeURIComponent(v)}`)
  return parts.length ? `${base}?${parts.join('&')}` : base
}

export async function resolveSeo(src: SeoSource): Promise<ResolvedSeo> {
  const cfg = await fetcher()
  const suffix = cfg.defaultTitleSuffix ?? ''
  const baseTitle = src.record?.seo?.title ?? src.record?.title ?? src.routeTitle ?? cfg.defaultTitle ?? 'iStudy'
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
    buildAutoGenUrl(src, baseTitle, src.subtitle ?? '',
      mediaUpdatedAt(recordOg) ??
      src.record?.updatedAt ??
      mediaUpdatedAt(collOg) ??
      mediaUpdatedAt(globalOg) ??
      '')

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
