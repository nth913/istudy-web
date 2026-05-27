import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCountdownClock from "@/components/HeroCountdownClock";
import {
  IconEye,
  IconCal,
  IconBook,
  IconClock,
  IconArrow,
  IconArrowXs,
  IconSearch,
} from "@/components/Icons";
import { NewsletterForm } from "@/components/NewsletterForm";
import { INDEX_CSS } from "@/lib/page-css/index";
import {
  answerUrlFor,
  computeEventState,
  examUrlFor,
  fetchActiveEvents,
  pickEvent,
  waitingUrlFor,
  type Event,
  type EventState,
} from "@/lib/events-data";
import { fetchMegaMenuKhoDe } from "@/lib/api/mega-menu";
import {
  fetchExamsList,
  type ExamListItem,
} from "@/lib/api/exams";
import {
  fetchPosts,
  formatViews,
  formatDate as formatPostDate,
  categoryLabel as postCategoryLabel,
  type PostSummary,
} from "@/lib/api/posts";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await resolveSeo({
    collection: null,
    routeTitle: "Luyện thi Tiếng Anh THPT, vào 10 & chuyên",
    routeDescription:
      "Từ vựng · Ngữ pháp · blog Tiếng Anh · Ngân hàng đề Tiếng Anh · Đề vào 10 · Đề vào chuyên",
  });
  return buildMetadata(seo, "https://aistudy.com.vn/");
}

/* -------- Mock data (English-exam content) ---------- */

const BL: Record<string, string> = {
  hot: "Hot",
  official: "Chính thức",
  new: "Mới",
  popular: "Phổ biến",
  mock: "Thử",
};
const BL_EMOJI: Record<string, string> = {
  hot: "🔥",
  official: "📋",
  new: "✨",
  popular: "⭐",
  mock: "📝",
};

const popular = [
  {
    title: "Vào lớp 10 — Đề chính thức",
    badge: "official",
    catLabel: "Vào lớp 10",
    typeLabel: "Chính thức",
    img: "📘",
    href: "/kho-de-thi?cat=vao-10&examType=chinh-thuc",
  },
  {
    title: "Vào lớp 10 — Đề thi thử",
    badge: "mock",
    catLabel: "Vào lớp 10",
    typeLabel: "Thi thử",
    img: "📗",
    href: "/kho-de-thi?cat=vao-10&examType=thi-thu",
  },
  {
    title: "Vào lớp 10 — Đề minh họa",
    badge: "new",
    catLabel: "Vào lớp 10",
    typeLabel: "Minh họa",
    img: "📙",
    href: "/kho-de-thi?cat=vao-10&examType=minh-hoa",
  },
  {
    title: "Vào Đại học — Đề chính thức",
    badge: "official",
    catLabel: "Vào Đại học",
    typeLabel: "Chính thức",
    img: "📕",
    href: "/kho-de-thi?cat=vao-dai-hoc&examType=chinh-thuc",
  },
  {
    title: "Vào Đại học — Đề thi thử",
    badge: "mock",
    catLabel: "Vào Đại học",
    typeLabel: "Thi thử",
    img: "📓",
    href: "/kho-de-thi?cat=vao-dai-hoc&examType=thi-thu",
  },
  {
    title: "Vào Đại học — Đề minh họa",
    badge: "new",
    catLabel: "Vào Đại học",
    typeLabel: "Minh họa",
    img: "📒",
    href: "/kho-de-thi?cat=vao-dai-hoc&examType=minh-hoa",
  },
] as const;

/* -------- Daily-rotating wishes for the `pre` state quote ---------- */

const WISHES: ReadonlyArray<{ text: string; by: string }> = [
  {
    text: "Học chill, thi chất. Còn vài hôm thôi — slay cái đề nhẹ tênh nha!",
    by: "— istudy cheer team 🍀",
  },
  {
    text: "Hít thở sâu, đọc kỹ đề. Bạn đã ôn rồi mà — cứ <strong>vibe</strong> thôi.",
    by: "— istudy, lo gì 💚",
  },
  {
    text:
      "Aim cao, breathe đều. <strong>Đến ngày G mình sẽ ở đây</strong> hóng cùng bạn.",
    by: "— istudy đồng hành 🎯",
  },
  {
    text: "Sắp đến giờ G rồi nha! <strong>Ngủ đủ, ăn no, làm bài chắc tay.</strong>",
    by: "— istudy chúc may mắn 🔥",
  },
  {
    text:
      "Bạn đã đi xa lắm rồi. Vài hôm nữa thôi — <strong>về đích thật ngầu</strong>.",
    by: "— istudy, tin bạn 💪",
  },
];

/* -------- Exam mapping helpers (Section 1 spotlights) ---------- */

function examCategoryLabel(cat?: string): string {
  switch (cat) {
    case "vao-10":
      return "Vào lớp 10";
    case "vao-dai-hoc":
      return "Vào ĐH";
    default:
      return "Đề thi";
  }
}

function deriveSpotlightBadge(
  exam: ExamListItem,
): "hot" | "official" | "new" {
  if (exam.tags?.hot?.enabled) return "hot";
  if (exam.examType === "chinh-thuc") return "official";
  return "new";
}

function pickWishOfDay(now: Date): { text: string; by: string } {
  const key = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = ((h << 5) - h + key.charCodeAt(i)) | 0;
  return WISHES[Math.abs(h) % WISHES.length]!;
}

/* -------- Format helpers ---------- */

function formatDayLong(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/* -------- Hero countdown card data resolution ---------- */

interface HeroCardData {
  state: EventState;
  capText: string;
  headlineMain: string;
  headlineSub: string;
  stickerText: string;
  ctaText: string;
  ctaHref: string;
  /** Only set for `pre` state — drives <HeroCountdownClock />. */
  targetIso?: string;
  /** Only set for `pre` state. */
  wish?: { text: string; by: string };
  /** Only set for `de` / `dap-an` state. */
  ready?: { emoji: string; title: string; sub: string; href: string };
}

function resolveHeroCard(event: Event | null, now: Date): HeroCardData {
  // No active event → static "Mùa thi 2026" fallback matching design v2 default.
  if (!event) {
    return {
      state: "pre",
      capText: "Mùa thi 2026",
      headlineMain: "Kỳ thi THPT Quốc Gia",
      headlineSub: "26-27 tháng 6, 2026",
      stickerText: "Time to shine",
      ctaText: "Vào ôn luyện ngay",
      ctaHref: "/kho-de-thi",
      targetIso: "2026-06-12T07:30:00+07:00",
      wish: {
        text:
          "Mỗi giờ bạn học hôm nay là <strong>một câu đúng</strong> ngày mai. Đường dài không sợ, chỉ sợ dừng lại.",
        by: "— istudy, đồng hành cùng bạn",
      },
    };
  }

  const state = computeEventState(event, now);
  const startIso = event.examStartTime || event.examEndTime;
  const dateLong = formatDayLong(startIso);
  const isToday = (() => {
    const d = new Date(startIso);
    if (Number.isNaN(d.getTime())) return false;
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  })();

  const headlineMain = (event.short || event.title).replace(/—/g, "<br>—");

  if (state === "pre") {
    return {
      state,
      capText: isToday
        ? "Đang diễn ra hôm nay"
        : event.heroEyebrow || "Sự kiện sắp diễn ra",
      headlineMain,
      headlineSub: dateLong,
      stickerText: isToday ? "Today's the day" : "Time to shine",
      ctaText: "Vào hóng đề và đáp án nào",
      ctaHref: waitingUrlFor(event),
      targetIso: startIso,
      wish: pickWishOfDay(now),
    };
  }

  if (state === "de") {
    const href = examUrlFor(event);
    return {
      state,
      capText: "Đề thi vừa lên",
      headlineMain,
      headlineSub: dateLong,
      stickerText: "Đề mới lên",
      ctaText: "Cùng xem đề nào",
      ctaHref: href,
      ready: {
        emoji: "🎉",
        title: "Đề đã lên!",
        sub: "Tiếng Anh · cập nhật vài phút trước",
        href,
      },
    };
  }

  // dap-an
  const href = answerUrlFor(event);
  return {
    state,
    capText: "Đáp án đã có",
    headlineMain,
    headlineSub: dateLong,
    stickerText: "Đáp án ra rồi",
    ctaText: "Cùng xem đáp án nào",
    ctaHref: href,
    ready: {
      emoji: "✅",
      title: "Đáp án đã có!",
      sub: "Kèm giải thích chi tiết — soi đáp án thôi",
      href,
    },
  };
}

/* ============================================================== */

export default async function HomePage() {
  const [res, khoDeSlots, spotExamsRes, postsRes] = await Promise.all([
    fetchActiveEvents(),
    fetchMegaMenuKhoDe(),
    fetchExamsList({ sort: "latest", limit: 3 }).catch(() => ({
      items: [] as ExamListItem[],
      total: 0,
      limit: 3,
      offset: 0,
    })),
    fetchPosts({ limit: 4 }),
  ]);
  const heroEvent = pickEvent(res, res.slots.hero);
  const hero = resolveHeroCard(heroEvent, new Date());

  const spotlights = spotExamsRes.items.map((exam) => ({
    slug: exam.slug,
    title: exam.title,
    badge: deriveSpotlightBadge(exam),
    views: formatViews(exam.views),
    date: formatDayLong(exam.createdAt),
    cat: examCategoryLabel(exam.category),
  }));

  const posts = postsRes.docs.map((p: PostSummary) => ({
    slug: p.slug,
    title: p.title,
    cat: postCategoryLabel(p.category),
    date: formatPostDate(p.publishedAt),
    views: formatViews(p.viewCount),
  }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INDEX_CSS }} />
      <Header activeNav="home" khoDeSlots={khoDeSlots} />

      <section className="hero">
        <div className="hero-circle" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>
                from <span className="accent">Best</span> to{" "}
                <span className="accent">Better</span>
              </h1>
              <p>
                Học tiếng Anh theo cách dễ hiểu và hiệu quả hơn.
                <br />
                Tự tin chinh phục mọi kỳ thi.
              </p>
              <form
                className="search-bar"
                action="/kho-de-thi"
                role="search"
                aria-label="Tìm đề thi"
              >
                <IconSearch />
                <input
                  placeholder="Tìm đề thi, bài giảng, từ vựng..."
                  name="q"
                  aria-label="Từ khoá tìm kiếm"
                />
                <button className="btn btn--primary" type="submit">
                  Tìm kiếm
                </button>
              </form>
            </div>

            <aside
              className="countdown-card hero-countdown"
              data-vibe="sticker"
              data-state={hero.state}
              data-sticker="on"
              aria-label="Đếm ngược kỳ thi sắp tới"
            >
              <span className="cd-cap">
                <span className="cd-pulse" aria-hidden="true" />
                <span>{hero.capText}</span>
              </span>

              <h3 className="cd-headline">
                <span
                  dangerouslySetInnerHTML={{ __html: hero.headlineMain }}
                />
                <span>{hero.headlineSub}</span>
              </h3>

              {hero.state === "pre" && hero.targetIso ? (
                <HeroCountdownClock targetIso={hero.targetIso} />
              ) : null}

              {hero.state === "pre" && hero.wish ? (
                <div className="cd-quote">
                  <svg
                    className="cd-quote-mark"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-3-6-6V7zm9 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-3-6-6V7z"
                    />
                  </svg>
                  <p dangerouslySetInnerHTML={{ __html: hero.wish.text }} />
                  <div className="cd-quote-by">{hero.wish.by}</div>
                </div>
              ) : null}

              {hero.state !== "pre" && hero.ready ? (
                <Link href={hero.ready.href} className="cd-ready">
                  <div className="cd-ready-emoji" aria-hidden="true">
                    {hero.ready.emoji}
                  </div>
                  <div className="cd-ready-title">{hero.ready.title}</div>
                  <div className="cd-ready-sub">{hero.ready.sub}</div>
                </Link>
              ) : null}

              <Link
                href={hero.ctaHref}
                className="btn btn--primary btn--small cd-cta"
              >
                <span>{hero.ctaText}</span>
                <IconArrowXs />
              </Link>

              <span className="cd-corner-sticker" aria-hidden="true">
                {hero.stickerText}
              </span>
            </aside>
          </div>
        </div>
      </section>

      <section className="stats-bar" aria-label="Thống kê istudy">
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-num">1.200+</div>
            <div className="stat-label">Đề thi</div>
          </div>
          <div className="stat">
            <div className="stat-num">50.000+</div>
            <div className="stat-label">Lượt làm bài</div>
          </div>
          <div className="stat">
            <div className="stat-num">500+</div>
            <div className="stat-label">Bài giảng</div>
          </div>
          <div className="stat">
            <div className="stat-num">20.000+</div>
            <div className="stat-label">Học sinh</div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="spotlight-h">
        <div className="section-header">
          <div>
            <h2 id="spotlight-h">🔥 Đề thi nổi bật</h2>
            <p className="sub">Đề thi được quan tâm nhất tuần này</p>
          </div>
          <Link href="/kho-de-thi" className="see-all">
            Xem tất cả <IconArrow />
          </Link>
        </div>
        <div className="grid-3" id="spotlight-grid">
          {spotlights.map((e) => (
            <Link
              key={e.slug}
              href={`/de-thi-chi-tiet/${e.slug}`}
              className="exam-card"
              aria-label={`Xem chi tiết ${e.title}`}
            >
              <div className="exam-card-head">
                <span className={`badge badge--${e.badge}`}>
                  {BL_EMOJI[e.badge]} {BL[e.badge]}
                </span>
                <span className="pill pill-red">{e.cat}</span>
              </div>
              <h3 className="exam-card-title">{e.title}</h3>
              <div className="exam-card-meta">
                <span className="meta-item">
                  <IconEye /> {e.views}
                </span>
                <span className="meta-item">
                  <IconCal /> {e.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="gray-section" aria-labelledby="popular-h">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="section-header">
            <h2 id="popular-h">📚 Bộ đề phổ biến</h2>
            <nav className="tab-pills" aria-label="Lọc bộ đề">
              <Link href="/kho-de-thi" className="tab-pill">
                Tất cả
              </Link>
              <Link href="/kho-de-thi?cat=vao-10" className="tab-pill">
                Lớp 10
              </Link>
              <Link
                href="/kho-de-thi?cat=vao-dai-hoc&examType=chinh-thuc"
                className="tab-pill"
              >
                THPT QG
              </Link>
              <Link href="/kho-de-thi?cat=vao-dai-hoc" className="tab-pill">
                Đại học
              </Link>
            </nav>
          </div>
          <div className="grid-3">
            {popular.map((e, i) => (
              <Link
                key={i}
                href={e.href}
                className="popular-card"
                aria-label={`Xem bộ đề ${e.title}`}
              >
                <div className="popular-cover" aria-hidden="true">
                  {e.img}
                  <span className="badge-abs">
                    <span className={`badge badge--${e.badge}`}>
                      {BL[e.badge]}
                    </span>
                  </span>
                </div>
                <div className="popular-body">
                  <h3>{e.title}</h3>
                  <div className="meta">
                    <span className="meta-item">
                      <IconBook /> {e.catLabel}
                    </span>
                    <span className="meta-item">
                      <IconClock /> {e.typeLabel}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="posts-h">
        <div className="section-header">
          <h2 id="posts-h">📝 Bài viết mới nhất</h2>
          <Link href="/bai-viet" className="see-all">
            Xem tất cả <IconArrow />
          </Link>
        </div>
        <div className="grid-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/bai-viet-chi-tiet/${p.slug}`}
              className="post-card"
              aria-label={`Đọc bài viết ${p.title}`}
            >
              <span className="cat">{p.cat}</span>
              <h3>{p.title}</h3>
              <div className="meta">
                <span>{p.date}</span>
                <span>{p.views} views</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta" aria-label="Đăng ký nhận thông báo">
        <div className="cta-inner">
          <h2>Đừng bỏ lỡ đề mới thi nhất!</h2>
          <p>Đăng ký nhận email khi có bài viết và đề thi mới</p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
