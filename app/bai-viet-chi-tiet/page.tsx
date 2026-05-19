import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BAI_VIET_CHI_TIET_CSS } from "@/lib/page-css/bai-viet-chi-tiet";
import { Comments } from "@/components/Comments";
import ArticleToc, { type TocItem } from "./ArticleToc";
import LikeButton from "./LikeButton";
import {
  NewsletterForm,
  ShareButtons,
} from "./ArticleInteractions";

// Static demo route — once /bai-viet-chi-tiet/[slug] becomes dynamic, source
// these from the CMS post payload (post.id, post.slug).
// TODO(istudy-cms): replace with real post.id + post.slug from `getPostBySlug`.
const POST_ID = "demo-thi-hien-tai-don";
const POST_SLUG = "thi-hien-tai-don";

export const metadata = {
  title: "Thì hiện tại đơn (Simple Present): Công thức, cách dùng & 50 ví dụ chi tiết — istudy",
  description:
    "Tổng hợp đầy đủ kiến thức về thì hiện tại đơn cho học sinh THCS – THPT: công thức, dấu hiệu nhận biết, quy tắc thêm s/es và bài tập áp dụng có đáp án.",
};

const TOC_ITEMS: ReadonlyArray<TocItem> = [
  { href: "#dinh-nghia", label: "1. Thì hiện tại đơn là gì?" },
  { href: "#cong-thuc", label: "2. Công thức" },
  { href: "#cong-thuc-thuong", label: "2.1 Với động từ thường", lvl: 2 },
  { href: "#cong-thuc-tobe", label: "2.2 Với động từ TO BE", lvl: 2 },
  { href: "#cach-dung", label: "3. Cách dùng" },
  { href: "#dau-hieu", label: "4. Dấu hiệu nhận biết" },
  { href: "#quy-tac", label: "5. Quy tắc thêm s/es" },
  { href: "#quy-tac-es", label: '5.1 Thêm "es"', lvl: 2 },
  { href: "#quy-tac-ies", label: '5.2 Đổi "y" thành "ies"', lvl: 2 },
  { href: "#quy-tac-y", label: '5.3 Giữ nguyên "y"', lvl: 2 },
  { href: "#luu-y", label: "6. Lưu ý đặc biệt" },
];

type RelatedPost = {
  title: string;
  emoji: string;
  thumbClass?: "t2" | "t3" | "t4" | "t5";
};

const RELATED_POSTS: ReadonlyArray<RelatedPost> = [
  {
    title: "Quy tắc thêm đuôi -ed vào sau động từ và các cách phát âm chuẩn",
    emoji: "📘",
  },
  {
    title:
      "Động từ thông dụng đi với Verb-ing / to Verb-bare và 5 quy tắc chia động từ phụ",
    emoji: "📗",
    thumbClass: "t2",
  },
  {
    title:
      "Cách thêm s/es trong thì hiện tại đơn — các trường hợp & cách phát âm chuẩn",
    emoji: "📙",
    thumbClass: "t3",
  },
  {
    title: "Những động từ không chia ở thì hiện tại tiếp diễn cần biết",
    emoji: "📕",
    thumbClass: "t4",
  },
  {
    title: "Quy tắc gấp đôi phụ âm: Định nghĩa và bài tập kèm đáp án",
    emoji: "📔",
    thumbClass: "t5",
  },
];

export default function BaiVietChiTietPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BAI_VIET_CHI_TIET_CSS }} />
      <Header activeNav="blog" />

      <div className="article-banner" role="img" aria-label="Banner bài viết" />

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
            <Link href="/bai-viet">Ngữ pháp</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span className="current">Thì hiện tại đơn</span>
          </nav>
          <h1>
            Thì hiện tại đơn (Simple Present): Công thức, cách dùng &amp; 50 ví
            dụ chi tiết
          </h1>
          <p className="lede">
            Tổng hợp đầy đủ kiến thức về thì hiện tại đơn cho học sinh THCS –
            THPT: công thức, dấu hiệu nhận biết, quy tắc thêm s/es, và bài tập
            áp dụng có đáp án — tất cả trong một bài.
          </p>
          <div className="meta-row">
            <div className="author-block">
              <div className="ava" aria-hidden="true">
                A
              </div>
              <span className="n">Ai Sta Đi Team</span>
              <span className="sep" aria-hidden="true">
                •
              </span>
              <span className="date">📅 12/05/2026</span>
            </div>
          </div>
          <div className="meta-row-2">
            <div className="read-stats">
              <span>⏱ 8 phút đọc</span>
              <span>👁 28.402 lượt xem</span>
            </div>
            <div className="share-block">
              <LikeButton initialLikes={2347} postId={POST_ID} />
              <span className="lbl">Chia sẻ:</span>
              <ShareButtons postId={POST_ID} />
            </div>
          </div>
        </section>
      </div>

      <div className="article-layout">
        <aside className="sidebar-left" aria-label="Mục lục">
          <div className="toc-card">
            <h4>Mục lục bài viết</h4>
            <ArticleToc items={TOC_ITEMS} />
          </div>
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
              <div className="eyebrow">NGỮ PHÁP TIẾNG ANH</div>
              <h2>Thì hiện tại đơn</h2>
              <div className="tag">— Present Simple Tense —</div>
            </div>
          </section>

          <section className="takeaways" aria-label="Tóm tắt nội dung chính">
            <div className="head">🔑 KEY TAKEAWAYS</div>
            <ol>
              <li>
                <span>
                  <b>Định nghĩa:</b> Thì hiện tại đơn diễn tả thói quen, sự thật
                  hiển nhiên, lịch trình ở hiện tại.
                </span>
              </li>
              <li>
                <span>
                  <b>Công thức cơ bản:</b> S + V(s/es) — khẳng định; S +
                  don&apos;t/doesn&apos;t + V — phủ định; Do/Does + S + V —
                  nghi vấn.
                </span>
              </li>
              <li>
                <span>
                  <b>Dấu hiệu nhận biết:</b> always, usually, often, sometimes,
                  rarely, never, every day…
                </span>
              </li>
              <li>
                <span>
                  <b>Phát âm -s/es:</b> 3 cách phát âm /ɪz/, /s/, /z/ tuỳ theo
                  âm cuối của động từ.
                </span>
              </li>
              <li>
                <span>
                  <b>Quy tắc thêm s/es:</b> 5 quy tắc chính cho động từ kết thúc
                  bằng -y, -o, -sh, -ch, -e, …
                </span>
              </li>
            </ol>
          </section>

          <article className="panel article-body">
            <h2 id="dinh-nghia">Thì hiện tại đơn là gì?</h2>
            <p>
              <strong>Thì hiện tại đơn (Simple Present Tense)</strong> là một
              trong những thì cơ bản nhất trong tiếng Anh. Thì này được dùng để
              diễn tả những sự việc, hành động xảy ra thường xuyên, lặp đi lặp
              lại như thói quen, một sự thật hiển nhiên, hay những hành động xảy
              ra theo lịch trình cố định.
            </p>
            <p>
              Đây là thì <strong>nền tảng</strong> mà bất kỳ học sinh nào cũng
              phải nắm vững trước khi học các thì phức tạp khác. Trong đề thi
              vào lớp 10, thì hiện tại đơn thường xuất hiện ở các câu trắc
              nghiệm chia động từ và viết lại câu.
            </p>

            <h2 id="cong-thuc">Công thức thì hiện tại đơn</h2>
            <h3 id="cong-thuc-thuong">Với động từ thường (Ordinary verbs)</h3>
            <div className="formula-box">
              <div className="lbl">(+) KHẲNG ĐỊNH</div>
              <code>S + V(s/es) + O</code>
            </div>
            <div className="formula-box">
              <div className="lbl">(−) PHỦ ĐỊNH</div>
              <code>S + do/does + not + V(bare) + O</code>
            </div>
            <div className="formula-box">
              <div className="lbl">(?) NGHI VẤN</div>
              <code>Do/Does + S + V(bare) + O ?</code>
            </div>

            <h3 id="cong-thuc-tobe">Với động từ TO BE</h3>
            <table className="example-table">
              <thead>
                <tr>
                  <th>Dạng</th>
                  <th>Công thức</th>
                  <th>Ví dụ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Khẳng định</td>
                  <td>S + am/is/are + …</td>
                  <td>I am a student.</td>
                </tr>
                <tr>
                  <td>Phủ định</td>
                  <td>S + am/is/are + not + …</td>
                  <td>She isn&apos;t happy.</td>
                </tr>
                <tr>
                  <td>Nghi vấn</td>
                  <td>Am/Is/Are + S + …?</td>
                  <td>Are you ready?</td>
                </tr>
              </tbody>
            </table>

            <h2 id="cach-dung">Cách dùng thì hiện tại đơn</h2>
            <p>
              Thì hiện tại đơn được sử dụng trong{" "}
              <strong>6 trường hợp chính</strong>:
            </p>
            <ol>
              <li>
                <strong>Diễn tả thói quen, hành động lặp đi lặp lại:</strong>{" "}
                <em>I drink coffee every morning.</em>
              </li>
              <li>
                <strong>Diễn tả sự thật hiển nhiên, chân lý:</strong>{" "}
                <em>The Earth revolves around the Sun.</em>
              </li>
              <li>
                <strong>Diễn tả lịch trình cố định:</strong>{" "}
                <em>The bus leaves at 7 AM tomorrow.</em>
              </li>
              <li>
                <strong>Trong câu điều kiện loại 1:</strong>{" "}
                <em>If it rains, I will stay home.</em>
              </li>
              <li>
                <strong>Sau các trạng từ chỉ tần suất:</strong> always, usually,
                often, sometimes…
              </li>
              <li>
                <strong>Hướng dẫn, công thức, lời chỉ đường:</strong>{" "}
                <em>You turn left at the second corner.</em>
              </li>
            </ol>

            <h2 id="dau-hieu">Dấu hiệu nhận biết</h2>
            <p>
              Khi gặp các từ và cụm từ sau, hãy nghĩ ngay đến{" "}
              <strong>thì hiện tại đơn</strong>:
            </p>
            <table className="example-table">
              <thead>
                <tr>
                  <th>Trạng từ tần suất</th>
                  <th>Cụm thời gian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>always (luôn luôn)</td>
                  <td>every day / week / month / year</td>
                </tr>
                <tr>
                  <td>usually (thường thường)</td>
                  <td>once / twice a week</td>
                </tr>
                <tr>
                  <td>often (thường xuyên)</td>
                  <td>three times a day</td>
                </tr>
                <tr>
                  <td>sometimes (thỉnh thoảng)</td>
                  <td>on Mondays / weekends</td>
                </tr>
                <tr>
                  <td>rarely / seldom (hiếm khi)</td>
                  <td>in the morning / evening</td>
                </tr>
                <tr>
                  <td>never (không bao giờ)</td>
                  <td>generally / typically</td>
                </tr>
              </tbody>
            </table>

            <h2 id="quy-tac">Quy tắc thêm &quot;s/es&quot; cho động từ</h2>
            <p>
              Với chủ ngữ ngôi thứ 3 số ít (he, she, it, tên riêng), ta cần thêm{" "}
              <strong>s</strong> hoặc <strong>es</strong> vào động từ:
            </p>
            <ul>
              <li id="quy-tac-es">
                <strong>Thêm &quot;es&quot;:</strong> động từ tận cùng bằng{" "}
                <em>o, s, x, ch, sh, z</em>
                <br />
                VD:{" "}
                <em>
                  go → goes, watch → watches, fix → fixes, miss → misses
                </em>
              </li>
              <li id="quy-tac-ies">
                <strong>Đổi &quot;y&quot; thành &quot;ies&quot;:</strong> động
                từ tận cùng bằng phụ âm + y<br />
                VD: <em>study → studies, fly → flies, try → tries</em>
              </li>
              <li id="quy-tac-y">
                <strong>Giữ nguyên &quot;y&quot;:</strong> động từ tận cùng bằng
                nguyên âm + y<br />
                VD: <em>play → plays, enjoy → enjoys, buy → buys</em>
              </li>
              <li>
                <strong>Bất quy tắc:</strong> <em>have → has</em>
              </li>
            </ul>

            <h2 id="luu-y">Lưu ý đặc biệt</h2>
            <div className="callout">
              <span className="ico" aria-hidden="true">
                💡
              </span>
              <div className="b">
                <strong>Tip nhớ nhanh:</strong>
                Khi câu có dấu hiệu &quot;every&quot;, &quot;always&quot;, hoặc
                nói về sự thật hiển nhiên (mặt trời, nước sôi, trái đất…) → 99%
                là thì <strong>Hiện tại đơn</strong>!
              </div>
            </div>
            <div
              className="callout"
              style={{ background: "var(--red-light)", borderColor: "#FECACA" }}
            >
              <span className="ico" aria-hidden="true">
                ⚠️
              </span>
              <div className="b">
                <strong>Lỗi sai hay gặp:</strong>
                Học sinh thường quên thêm &quot;s/es&quot; với chủ ngữ
                &quot;he/she/it&quot;. Ví dụ sai:{" "}
                <em>&quot;She play tennis&quot;</em> → đúng là{" "}
                <em>&quot;She plays tennis&quot;</em>.
              </div>
            </div>
          </article>
        </main>

        <aside className="sidebar-right" aria-label="Thông tin bổ sung">
          <div className="side-card">
            <div className="head">
              <h4>Bài viết liên quan</h4>
              <Link href="/bai-viet">Tất cả ›</Link>
            </div>
            <div className="related-list">
              {RELATED_POSTS.map((r, i) => (
                <Link
                  key={i}
                  className="related-item"
                  href="/bai-viet-chi-tiet"
                >
                  <div
                    className={`thumb${r.thumbClass ? ` ${r.thumbClass}` : ""}`}
                    aria-hidden="true"
                  >
                    {r.emoji}
                  </div>
                  <div className="title">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>

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
              Đăng ký để không bỏ lỡ bài học hữu ích từ đội ngũ Ai Sta Đi.
            </p>
            <NewsletterForm />
          </div>
        </aside>
      </div>

      <div className="post-article">
        <article className="panel article-body post-body">
          <h2 id="bai-tap">Bài tập áp dụng (có đáp án)</h2>
          <div className="exercise-card">
            <h4>📝 Bài 1. Chia động từ trong ngoặc</h4>
            <ol>
              <li>
                My father <span className="blank" aria-hidden="true" /> (work)
                at a hospital.
              </li>
              <li>
                They <span className="blank" aria-hidden="true" /> (not go) to
                school on Sundays.
              </li>
              <li>
                <span className="blank" aria-hidden="true" /> Linh{" "}
                <span className="blank" aria-hidden="true" /> (like) ice cream?
              </li>
              <li>
                Water <span className="blank" aria-hidden="true" /> (boil) at
                100°C.
              </li>
              <li>
                I usually <span className="blank" aria-hidden="true" /> (have)
                breakfast at 6:30.
              </li>
            </ol>
            <details style={{ marginTop: 14 }}>
              <summary
                style={{
                  cursor: "pointer",
                  color: "var(--red)",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                ▾ Xem đáp án
              </summary>
              <ol
                style={{
                  marginTop: 10,
                  color: "var(--green)",
                  fontWeight: 600,
                }}
              >
                <li>works</li>
                <li>don&apos;t go</li>
                <li>Does … like</li>
                <li>boils</li>
                <li>have</li>
              </ol>
            </details>
          </div>

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

          <div className="article-tags" aria-label="Tag bài viết">
            <span>#thi-hien-tai-don</span>
            <span>#ngu-phap-co-ban</span>
            <span>#lop-10</span>
            <span>#thpt-qg</span>
          </div>

          <div className="author-bio">
            <div className="ava" aria-hidden="true">
              AS
            </div>
            <div>
              <div className="n">Ai Sta Đi Team</div>
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
          <Comments slug={POST_SLUG} />
        </section>
      </div>

      <Footer />
    </>
  );
}
