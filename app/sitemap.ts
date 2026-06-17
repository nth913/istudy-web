import type { MetadataRoute } from "next";

const ALLOW_PREFIXES = [
  "/kho-de-thi",
  "/bai-viet",
  "/cho-de",
  "/de-thi-chi-tiet/",
  "/bai-viet-chi-tiet/",
  "/de-chinh-thuc-vao-10-2026",
];
const STATIC_FALLBACK = ["/", "/kho-de-thi", "/bai-viet", "/cho-de", "/de-chinh-thuc-vao-10-2026"];

interface SitemapDatum {
  loc: string;
  lastmod?: string;
  priority?: number;
}

function pathOf(loc: string): string {
  try {
    return new URL(loc).pathname;
  } catch {
    return loc;
  }
}

function isAllowed(path: string): boolean {
  if (path === "/") return true;
  return ALLOW_PREFIXES.some((p) => (p.endsWith("/") ? path.startsWith(p) : path === p));
}

function priorityOf(path: string): number | undefined {
  if (path === "/") return 1.0;
  if (path === "/de-chinh-thuc-vao-10-2026") return 0.9;
  if (path === "/kho-de-thi" || path === "/cho-de") return 0.8;
  if (path.startsWith("/de-thi-chi-tiet/")) return 0.7;
  if (path === "/bai-viet") return 0.6;
  return undefined;
}

function changeFreq(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "/" || path === "/kho-de-thi" || path === "/cho-de") return "daily";
  if (path === "/de-chinh-thuc-vao-10-2026") return "weekly";
  if (path.startsWith("/de-thi-chi-tiet/")) return "weekly";
  return "monthly";
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aistudy.com.vn").replace(/\/$/, "");
  const CMS = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3131";
  let data: SitemapDatum[] = [];
  try {
    const res = await fetch(`${CMS}/api/v1/sitemap-data`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const json = (await res.json()) as { urls?: SitemapDatum[] };
      data = Array.isArray(json.urls) ? json.urls : [];
    }
  } catch {
    data = [];
  }

  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();
  for (const d of data) {
    const path = pathOf(d.loc);
    if (!isAllowed(path)) continue;
    const url = `${SITE}${path}`;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      ...(d.lastmod ? { lastModified: d.lastmod } : {}),
      changeFrequency: changeFreq(path),
      ...(d.priority != null || priorityOf(path) != null ? { priority: d.priority ?? priorityOf(path) } : {}),
    });
  }

  if (entries.length === 0) {
    for (const p of STATIC_FALLBACK) {
      entries.push({ url: `${SITE}${p}`, changeFrequency: changeFreq(p), ...(priorityOf(p) != null ? { priority: priorityOf(p) } : {}) });
    }
  }
  return entries;
}
