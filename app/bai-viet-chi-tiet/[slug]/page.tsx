import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BAI_VIET_CHI_TIET_CSS } from "@/lib/page-css/bai-viet-chi-tiet";
import { Comments } from "@/components/Comments";
import ArticleToc, { type TocItem } from "../ArticleToc";
import LikeButton from "../LikeButton";
import {
  NewsletterForm,
  ShareButtons,
} from "../ArticleInteractions";
import {
  fetchPostBySlug,
  fetchPosts,
  categoryLabel,
  categoryVisual,
  coverUrl,
  formatDate,
  formatViews,
  type PostSummary,
} from "@/lib/api/posts";
import { extractToc, RichText } from "@/lib/render/lexical";

export const revalidate = 120;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "Không tìm thấy bài viết — istudy" };
  return {
    title: `${post.seoTitle || post.title} — istudy`,
    description: post.seoDescription || post.excerpt || "",
  };
}

// Reading-time estimate: rough word-count from body root text content / 200 wpm.
function estimateReadingMinutes(body?: { root?: { children?: unknown[] } } | null): number {
  if (!body || !body.root) return 5;
  let text = "";
  const walk = (n: any) => {
    if (!n) return;
    if (typeof n.text === "string") text += " " + n.text;
    if (Array.isArray(n.children)) n.children.forEach(walk);
  };
  walk(body.root);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

// Hero gradient + emoji tied to category. Matches the existing color tokens
// so detail pages stay visually consistent with the list cards.
const HERO_BG_BY_CAT: Record<string, string> = {
  "ngu-phap":
    "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)",
  "tu-vung":
    "linear-gradient(135deg, #5b21b6 0%, #8b5cf6 50%, #ec4899 100%)",
  meo:
    "linear-gradient(135deg, #065f46 0%, #10b981 50%, #fbbf24 100%)",
  "tin-tuc":
    "linear-gradient(135deg, #991b1b 0%, #ef4444 50%, #f97316 100%)",
};

export default async function BaiVietChiTietPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  const tocHeadings = extractToc(post.body?.root);
  const tocItems: ReadonlyArray<TocItem> = tocHeadings.map((h) => ({
    href: `#${h.id}`,
    label: h.label,
    lvl: h.level === 3 ? 2 : h.level === 4 ? 3 : undefined,
  }));

  const cover = coverUrl(post.cover);
  const visual = categoryVisual(post.category);
  const heroBg =
    HERO_BG_BY_CAT[post.category] || HERO_BG_BY_CAT["ngu-phap"];
  const readingMin = estimateReadingMinutes(post.body as never);

  // Pull 5 related posts from the same category (excluding current).
  const relatedRes = await fetchPosts({ category: post.category, limit: 6 });
  const related: PostSummary[] = relatedRes.docs
    .filter((p) => p.slug !== post.slug)
    .slice(0, 5);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BAI_VIET_CHI_TIET_CSS }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .article-banner.hero-gradient {
              background: ${cover ? `url(${cover}) center/cover no-repeat` : heroBg};
              position: relative;
              overflow: hidden;
            }
            .article-banner.hero-gradient::before {
              content: "";
              position: absolute; inset: 0;
              background: radial-gradient(circle at 20% 20%, rgba(255,255,255,.18), transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(255,255,255,.12), transparent 40%);
              pointer-events: none;
            }
            .article-banner .hero-emoji {
              position: absolute; right: 8%; top: 50%;
              transform: translateY(-50%);
              font-size: 160px; opacity: .25; user-select: none;
              filter: drop-shadow(0 8px 24px rgba(0,0,0,.2));
            }
            .article-banner .hero-overlay {
              position: absolute; left: 8%; bottom: 22%;
              color: #fff; max-width: 60%;
            }
            .article-banner .hero-overlay .eyebrow {
              font-size: 12px; letter-spacing: 2px; font-weight: 800;
              opacity: .9; text-transform: uppercase;
            }
            .article-banner .hero-overlay h2 {
              font-size: 28px; font-weight: 800; margin: 6px 0 0;
              text-shadow: 0 2px 18px rgba(0,0,0,.25);
            }
            .article-tags-inline {
              display:flex; flex-wrap:wrap; gap:6px; margin: 8px 0 0;
            }
            .article-tags-inline span {
              background: var(--red-light); color: var(--red);
              padding: 4px 10px; border-radius: 999px;
              font-size: 12px; font-weight: 700;
            }
            .callout--quote { background: #FFF7ED; border-color: #FED7AA; }
            .article-body p, .article-body li { font-size: 15.5px; line-height: 1.75; color: var(--g700, #374151); }
            .article-body ol, .article-body ul { padding-left: 22px; }
            .article-body strong { color: var(--dark); }
          `,
        }}
      />
      <Header activeNav="blog" />

      <div
        className="article-banner hero-gradient"
        role="img"
        aria-label="Banner bài viết"
      >
        <span className="hero-emoji" aria-hidden="true">
          {visual.emoji}
        </span>
        <div className="hero-overlay">
          <div className="eyebrow">{categoryLabel(post.category)}</div>
          <h2>{post.title}</h2>
        </div>
      </div>

      <div className="meta-wrap">
        <section className="panel meta-card">
          <nav className="crumbs" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <Link href="/bai-viet">Bài viết</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <Link href={`/bai-viet?category=${post.category}`}>
              {categoryLabel(post.category)}
            </Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span className="current">{post.title}</span>
          </nav>
          <h1>{post.title}</h1>
          {post.excerpt ? <p className="lede">{post.excerpt}</p> : null}
          {post.tags && post.tags.length > 0 ? (
            <div className="article-tags-inline" aria-label="Tag bài viết">
              {post.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          ) : null}
          <div className="meta-row">
            <div className="author-block">
              <div className="ava" aria-hidden="true">
                {(post.author?.name?.[0] || "I").toUpperCase()}
              </div>
              <span className="n">
                {post.author?.name || "istudy Team"}
              </span>
              <span className="sep" aria-hidden="true">
                •
              </span>
              <span className="date">📅 {formatDate(post.publishedAt)}</span>
            </div>
          </div>
          <div className="meta-row-2">
            <div className="read-stats">
              <span>⏱ {readingMin} phút đọc</span>
              <span>👁 {formatViews(post.viewCount)} lượt xem</span>
            </div>
            <div className="share-block">
              <LikeButton
                initialLikes={post.likeCount ?? 0}
                postId={post.id}
              />
              <span className="lbl">Chia sẻ:</span>
              <ShareButtons postId={post.id} />
            </div>
          </div>
        </section>
      </div>

      <div className="article-layout">
        <aside className="sidebar-left" aria-label="Mục lục">
          {tocItems.length > 0 ? (
            <div className="toc-card">
              <h4>Mục lục bài viết</h4>
              <ArticleToc items={tocItems} />
            </div>
          ) : null}
        </aside>

        <main>
          <section
            className="panel inner-banner"
            style={{ padding: 0 }}
            aria-label="Banner chủ đề bài viết"
          >
            <span className="blob b1" aria-hidden="true" />
            <span className="blob b2" aria-hidden="true" />
            <span className="blob b3" aria-hidden="true" />
            <div className="card-inside">
              <div className="eyebrow">{categoryLabel(post.category)}</div>
              <h2>{post.title}</h2>
              <div className="tag">— istudy guide —</div>
            </div>
          </section>

          <article className="panel article-body">
            <RichText root={post.body?.root} />
          </article>
        </main>

        <aside className="sidebar-right" aria-label="Thông tin bổ sung">
          {related.length > 0 ? (
            <div className="side-card">
              <div className="head">
                <h4>Bài viết liên quan</h4>
                <Link href="/bai-viet">Tất cả ›</Link>
              </div>
              <div className="related-list">
                {related.map((r) => {
                  const v = categoryVisual(r.category);
                  return (
                    <Link
                      key={r.id}
                      className="related-item"
                      href={`/bai-viet-chi-tiet/${r.slug}`}
                    >
                      <div className="thumb" aria-hidden="true">
                        {v.emoji}
                      </div>
                      <div className="title">{r.title}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="cta-card">
            <div className="icon-rocket" aria-hidden="true">
              🚀
            </div>
            <h4>Luyện đề ngay!</h4>
            <p>
              Hàng trăm đề thi vào lớp 10, đại học có đáp án &amp; lời giải chi
              tiết.
            </p>
            <Link className="btn-go" href="/kho-de-thi">
              Vào kho đề thi →
            </Link>
          </div>

          <div className="side-card signup-card">
            <h4>📬 Nhận bài mới mỗi tuần</h4>
            <p className="desc">
              Đăng ký để không bỏ lỡ bài học hữu ích từ đội ngũ istudy.
            </p>
            <NewsletterForm />
          </div>
        </aside>
      </div>

      <div className="post-article">
        <article className="panel article-body post-body">
          <div className="inline-cta">
            <div className="ico" aria-hidden="true">
              🚀
            </div>
            <div className="copy">
              <h4>Sẵn sàng thử sức với đề thật?</h4>
              <p>
                Hàng trăm đề thi vào lớp 10, đại học có đáp án &amp; lời giải
                chi tiết, làm online ngay.
              </p>
            </div>
            <Link className="go-btn" href="/kho-de-thi">
              Luyện đề ngay →
            </Link>
          </div>

          {post.tags && post.tags.length > 0 ? (
            <div className="article-tags" aria-label="Tag bài viết">
              {post.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
          ) : null}

          <div className="author-bio">
            <div className="ava" aria-hidden="true">
              IS
            </div>
            <div>
              <div className="n">istudy Team</div>
              <div className="r">Đội ngũ biên soạn nội dung • aistudy.com.vn</div>
              <p className="d">
                Chuyên xây dựng tài liệu luyện thi vào lớp 10 và đại học, bám
                sát đề thi mới nhất với phương pháp học chủ động.
              </p>
            </div>
          </div>
        </article>

        <section
          className="panel comments-card"
          id="binh-luan"
          aria-label="Bình luận"
        >
          <div className="head">
            <span className="ico" aria-hidden="true">
              💬
            </span>{" "}
            Bình luận
          </div>
          <Comments slug={post.slug} />
        </section>
      </div>

      <Footer />
    </>
  );
}
