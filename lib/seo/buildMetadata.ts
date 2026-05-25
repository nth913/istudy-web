import type { Metadata } from 'next'
import type { ResolvedSeo } from './types'

export function buildMetadata(seo: ResolvedSeo, canonical?: string): Metadata {
  const meta: Metadata = {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [{
        url: seo.ogImageUrl,
        alt: seo.ogImageAlt,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [seo.ogImageUrl],
      ...(seo.twitterHandle ? { site: seo.twitterHandle } : {}),
    },
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(seo.noindex ? { robots: { index: false, follow: false } } : {}),
  }
  return meta
}
