function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aistudy.com.vn").replace(/\/$/, "");
}

const LOGO = "/og/brand-3.webp";

function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const SITE = siteUrl();
  return `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function websiteSchema(): Record<string, unknown> {
  const SITE = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "istudy",
    url: `${SITE}/`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE}/kho-de-thi?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema(): Record<string, unknown> {
  const SITE = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "istudy",
    url: `${SITE}/`,
    logo: abs(LOGO),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

export interface ArticleInput {
  title: string;
  url: string;
  description?: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
}

export function articleSchema(a: ArticleInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    url: abs(a.url),
    ...(a.description ? { description: a.description } : {}),
    ...(a.image ? { image: abs(a.image) } : {}),
    ...(a.datePublished ? { datePublished: a.datePublished } : {}),
    author: { "@type": a.authorName ? "Person" : "Organization", name: a.authorName ?? "istudy" },
    publisher: {
      "@type": "Organization",
      name: "istudy",
      logo: { "@type": "ImageObject", url: abs(LOGO) },
    },
  };
}

export interface LearningResourceInput {
  title: string;
  url: string;
  description?: string;
  subject?: string;
  image?: string;
}

export function learningResourceSchema(e: LearningResourceInput): Record<string, unknown> {
  const SITE = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: e.title,
    url: abs(e.url),
    learningResourceType: "Exam",
    inLanguage: "vi",
    isAccessibleForFree: true,
    ...(e.image ? { image: abs(e.image) } : {}),
    ...(e.description ? { description: e.description } : {}),
    ...(e.subject ? { about: e.subject } : {}),
    provider: { "@type": "Organization", name: "istudy", url: `${SITE}/` },
  };
}
