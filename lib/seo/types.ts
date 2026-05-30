export type CollType = 'posts' | 'exams' | 'events' | 'books' | null

export type MediaRef =
  | {
      url?: string
      alt?: string
      updatedAt?: string
      sizes?: {
        og?: { url?: string | null }
      }
    }
  | string
  | null
  | undefined

export type SeoGroup = {
  title?: string | null
  description?: string | null
  ogImage?: MediaRef
  ogTitle?: string | null
  ogDescription?: string | null
} | null | undefined

export type SeoSource = {
  collection: CollType
  record?: {
    slug?: string
    title?: string
    updatedAt?: string
    seo?: SeoGroup
    [k: string]: unknown
  }
  routeTitle?: string
  routeDescription?: string
  noindex?: boolean
  subtitle?: string
}

export type SeoConfigGlobal = {
  siteName?: string
  twitterHandle?: string
  defaultTitle?: string
  defaultTitleSuffix?: string
  defaultDescription?: string
  defaultOgImage?: MediaRef
  collectionDefaults?: {
    posts?: { ogImage?: MediaRef }
    exams?: { ogImage?: MediaRef }
    events?: { ogImage?: MediaRef }
    books?: { ogImage?: MediaRef }
  }
}

export type ResolvedSeo = {
  title: string
  description: string
  canonical?: string
  ogTitle: string
  ogDescription: string
  ogImageUrl: string
  ogImageAlt: string
  twitterHandle?: string
  noindex?: boolean
}
