import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BAI_VIET_CSS } from "@/lib/page-css/bai-viet";
import {
  fetchPosts,
  categoryLabel,
  categoryVisual,
  coverUrl,
  formatDate,
  formatViews,
  type PostSummary,
} from "@/lib/api/posts";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await resolveSeo({
    collection: "posts",
    routeTitle: "Blog học Tiếng Anh — Ngữ pháp, Từ vựng, Mẹo thi",
    routeDescription:
      "Blog học Tiếng Anh iStudy: bài viết về ngữ pháp Tiếng Anh, từ vựng Tiếng Anh theo chủ đề, mẹo luyện thi cho học sinh THCS – THPT.",
    subtitle: "Bài viết",
  });
  return buildMetadata(seo, "https://aistudy.com.vn/bai-viet");
}

const GRAD_COUNT = 9;

const CAT_CHIPS: ReadonlyArray<{ slug: string; label: string }> = [
  { slug: "ngu-phap", label: "Ngữ pháp" },
  { slug: "tu-vung", label: "Từ vựng" },
  { slug: "meo", label: "Mẹo" },
  { slug: "tin-tuc", label: "Tin tức" },
];

const TAG_PILL_BY_CAT: Record<string, string> = {
  "ngu-phap": "tag-pill--grammar",
  "tu-vung": "tag-pill--vocab",
  meo: "tag-pill--strategy",
  "tin-tuc": "tag-pill--writing",
};

function tagPillClass(c?: string) {
  return TAG_PILL_BY_CAT[c || ""] || "tag-pill--grammar";
}

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function BaiVietPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category;
  const page = Number(params.page || "1");

  // Featured row uses isFeatured posts; grid uses everything published.
  // Two calls in parallel so the page renders in one round-trip.
  const [featuredRes, listRes] = await Promise.all([
    fetchPosts({ limit: 3, category: "" /* all categories featured */ }),
    fetchPosts({ category, page, limit: 12 }),
  ]);

  // Pick first 3 featured from featured fetch; fall back to first 3 list docs.
  const featured: PostSummary[] = (featuredRes.docs.filter((d) => d.isFeatured).slice(0, 3));
  const featuredFinal: PostSummary[] =
    featured.length > 0 ? featured : listRes.docs.slice(0, 3);

  // Avoid duplicating featured posts in the grid below.
  const featuredIds = new Set(featuredFinal.map((p) => p.id));
  const gridPosts = listRes.docs.filter((p) => !featuredIds.has(p.id));

  const isEmpty = listRes.docs.length === 0;
  const mainFeatured = featuredFinal[0];
  const sideFeatured = featuredFinal.slice(1, 3);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BAI_VIET_CSS }} />
      <Header activeNav="blog" />

      <div className="page-wrap">
        <div className="layout">
          <nav className="breadcrumb" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span className="current">Bài viết</span>
          </nav>

          <div className="blog-head">
            <h1>Bài viết &amp; Tips học tiếng Anh</h1>
            <p>Kiến thức từ vựng, ngữ pháp, mẹo thi cử và lộ trình học hiệu quả từ chuyên gia istudy</p>
          </div>

          {mainFeatured ? (
            <div className="featured-row">
              <Link
                href={`/bai-viet-chi-tiet/${mainFeatured.slug}`}
                className="feat-main"
              >
                {coverUrl(mainFeatured.cover) ? (
                  <div
                    className="img"
                    style={{
                      background: `url(${coverUrl(mainFeatured.cover)}) center/cover no-repeat`,
                    }}
                  />
                ) : (
                  <div className="img img--0">{categoryVisual(mainFeatured.category).emoji}</div>
                )}
                <div className="body">
                  <span className={`tag-pill ${tagPillClass(mainFeatured.category)}`}>
                    {categoryLabel(mainFeatured.category)}
                  </span>
                  <h2>{mainFeatured.title}</h2>
                  {mainFeatured.excerpt ? <p>{mainFeatured.excerpt}</p> : null}
                  <div className="meta">
                    <span>👤 istudy</span>
                    <span>📅 {formatDate(mainFeatured.publishedAt)}</span>
                    <span>👁️ {formatViews(mainFeatured.viewCount)} lượt xem</span>
                  </div>
                </div>
              </Link>

              <div className="feat-side">
                {sideFeatured.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/bai-viet-chi-tiet/${p.slug}`}
                    className="feat-side-item"
                  >
                    {coverUrl(p.cover) ? (
                      <div
                        className="img"
                        style={{
                          background: `url(${coverUrl(p.cover)}) center/cover no-repeat`,
                        }}
                      />
                    ) : (
                      <div className={`img img--${(i + 1) % GRAD_COUNT}`}>
                        {categoryVisual(p.category).emoji}
                      </div>
                    )}
                    <div className="body">
                      <span className={`tag-pill ${tagPillClass(p.category)}`}>
                        {categoryLabel(p.category)}
                      </span>
                      <h3>{p.title}</h3>
                      <div className="meta">
                        📅 {formatDate(p.publishedAt)} • 👁️ {formatViews(p.viewCount)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="cat-strip" role="group" aria-label="Lọc theo chủ đề">
            <Link
              href="/bai-viet"
              className={`cat-chip${!category ? " active" : ""}`}
              aria-current={!category ? "true" : undefined}
            >
              Tất cả
            </Link>
            {CAT_CHIPS.map((c) => (
              <Link
                key={c.slug}
                href={`/bai-viet?category=${c.slug}`}
                className={`cat-chip${category === c.slug ? " active" : ""}`}
                aria-current={category === c.slug ? "true" : undefined}
              >
                {c.label}
              </Link>
            ))}
          </div>

          {isEmpty ? (
            <div className="empty-state" style={{ padding: "60px 12px", textAlign: "center", color: "#6b7280" }}>
              <p style={{ fontSize: 16 }}>Chưa có bài viết nào trong mục này.</p>
              <p style={{ marginTop: 8 }}>
                <Link href="/bai-viet" style={{ color: "#dc2626", fontWeight: 600 }}>
                  ← Quay lại tất cả bài viết
                </Link>
              </p>
            </div>
          ) : (
            <div className="post-grid">
              {gridPosts.map((p, i) => {
                const v = categoryVisual(p.category);
                return (
                  <Link
                    key={p.id}
                    href={`/bai-viet-chi-tiet/${p.slug}`}
                    className="post-card"
                  >
                    {coverUrl(p.cover) ? (
                      <div
                        className="img"
                        style={{
                          background: `url(${coverUrl(p.cover)}) center/cover no-repeat`,
                        }}
                      />
                    ) : (
                      <div className={`img img--${i % GRAD_COUNT}`}>{v.emoji}</div>
                    )}
                    <div className="body">
                      <span className={`tag-pill ${tagPillClass(p.category)}`}>
                        {categoryLabel(p.category)}
                      </span>
                      <h3>{p.title}</h3>
                      {p.excerpt ? <p className="excerpt">{p.excerpt}</p> : null}
                      <div className="meta">
                        <span>📅 {formatDate(p.publishedAt)}</span>
                        <span>👁️ {formatViews(p.viewCount)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {listRes.hasNextPage ? (
            <div className="load-more">
              <Link
                href={`/bai-viet?${category ? `category=${category}&` : ""}page=${page + 1}`}
                className="btn btn--outline btn--large"
              >
                Trang tiếp ↓
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  );
}
