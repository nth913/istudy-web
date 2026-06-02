import type { MetadataRoute } from "next";

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aistudy.com.vn").replace(/\/$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const SITE = siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        // AI crawlers (GPTBot, Google-Extended, etc.) are intentionally allowed
        // via this catch-all rule — we want GEO / AI-answer-engine visibility.
        allow: "/",
        disallow: ["/ket-qua", "/lam-bai", "/coming-soon", "/api/", "/print/", "/*?preview="],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
