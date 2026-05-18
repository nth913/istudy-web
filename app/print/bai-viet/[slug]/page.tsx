/**
 * Print article — `/print/bai-viet/[slug]`.
 *
 * Server Component port of `/tmp/design-bundle/istudy-v2/project/bai-viet-chi-tiet-print.html`.
 * Renders a print-optimized article snapshot with:
 *  - NO <Header />
 *  - NO <Footer />
 *  - NO <MegaMenu />
 *  - NO left TOC sidebar, right sidebar, related-posts, comments, signup, CTAs
 *  - EventPopup hidden via CSS
 *
 * The `[slug]` param is currently ignored — Phase 3 ships a single hard-coded
 * mock article ("Quy tắc thêm -ing cho động từ"). When the CMS is wired up,
 * the slug will fan out to `fetchPostBySlug(slug)`.
 */
import { PRINT_BAI_VIET_CSS } from "@/lib/page-css/print-bai-viet";

export const metadata = {
  title: "Quy tắc thêm -ing cho động từ — istudy (print)",
  description:
    "Quy tắc thêm -ing vào sau động từ tiếng Anh: các trường hợp cơ bản, bất quy tắc và bài tập áp dụng — bản in.",
  robots: { index: false, follow: false },
};

type Params = { slug: string };

export default async function PrintBaiVietPage({
  params,
}: {
  params: Promise<Params>;
}) {
  // Resolve params per Next 15 conventions even though we don't use it yet.
  await params;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_BAI_VIET_CSS }} />

      <div className="article-banner" role="img" aria-label="Banner bài viết" />

      <div className="meta-wrap">
        <section className="panel meta-card">
          <nav className="crumbs" aria-label="Đường dẫn">
            <a href="/">Trang chủ</a>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <a href="/bai-viet">Bài viết</a>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <a href="/bai-viet">Ngữ pháp</a>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span className="current">Quy tắc thêm -ing cho động từ</span>
          </nav>
          <h1>
            Quy tắc thêm -ing cho động từ: 5 trường hợp cơ bản &amp; ví dụ chi
            tiết
          </h1>
          <p className="lede">
            Tổng hợp đầy đủ quy tắc thêm -ing vào sau động từ tiếng Anh: các
            trường hợp cơ bản, bất quy tắc, cách phát âm và bài tập áp dụng có
            đáp án — tất cả gói gọn trong một bài.
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
              <span className="date">📅 18/05/2026</span>
            </div>
          </div>
          <div className="meta-row-2">
            <div className="read-stats">
              <span>⏱ 7 phút đọc</span>
              <span>👁 12.480 lượt xem</span>
            </div>
          </div>
        </section>
      </div>

      <div className="article-layout">
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
              <h2>Quy tắc thêm -ing</h2>
              <div className="tag">— Verb + -ing rules —</div>
            </div>
          </section>

          <section className="takeaways" aria-label="Tóm tắt nội dung chính">
            <div className="head">🔑 KEY TAKEAWAYS</div>
            <ol>
              <li>
                <span>
                  <b>Quy tắc 1:</b> Đa số động từ chỉ cần thêm -ing trực tiếp
                  vào sau (work → working).
                </span>
              </li>
              <li>
                <span>
                  <b>Quy tắc 2:</b> Động từ tận cùng bằng -e câm thì bỏ -e rồi
                  thêm -ing (make → making, write → writing).
                </span>
              </li>
              <li>
                <span>
                  <b>Quy tắc 3:</b> Động từ một âm tiết tận cùng bằng phụ âm
                  (trừ w, x, y) + nguyên âm + phụ âm → gấp đôi phụ âm cuối rồi
                  thêm -ing (run → running).
                </span>
              </li>
              <li>
                <span>
                  <b>Quy tắc 4:</b> Động từ tận cùng bằng -ie đổi -ie thành -y
                  rồi thêm -ing (lie → lying, die → dying).
                </span>
              </li>
              <li>
                <span>
                  <b>Bất quy tắc:</b> một số động từ giữ nguyên hoặc thay đổi
                  bất thường — cần học thuộc lòng.
                </span>
              </li>
            </ol>
          </section>

          <article className="panel article-body">
            <h2 id="dinh-nghia">Khi nào cần thêm -ing vào động từ?</h2>
            <p>
              Trong tiếng Anh, đuôi <strong>-ing</strong> được thêm vào sau
              động từ trong nhiều trường hợp ngữ pháp khác nhau, trong đó phổ
              biến nhất là:
            </p>
            <ul>
              <li>
                Tạo dạng <strong>V-ing</strong> dùng cho các thì tiếp diễn (hiện
                tại tiếp diễn, quá khứ tiếp diễn, tương lai tiếp diễn).
              </li>
              <li>
                Tạo <strong>danh động từ (gerund)</strong> đứng làm chủ ngữ, tân
                ngữ hoặc đứng sau giới từ (<em>I love swimming.</em>).
              </li>
              <li>
                Đóng vai trò <strong>tính từ phân từ</strong> để mô tả người/vật
                gây ra cảm giác (<em>an interesting book</em>).
              </li>
            </ul>

            <h2 id="quy-tac-co-ban">Quy tắc 1 — Thêm -ing trực tiếp</h2>
            <p>
              Phần lớn động từ tiếng Anh chỉ cần thêm -ing nguyên vẹn vào sau
              động từ nguyên mẫu mà không cần biến đổi gì:
            </p>
            <div className="formula-box">
              <div className="lbl">CÔNG THỨC</div>
              <code>V + ing</code>
            </div>
            <table className="example-table">
              <thead>
                <tr>
                  <th>Động từ gốc</th>
                  <th>Dạng -ing</th>
                  <th>Ví dụ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>work</td>
                  <td>working</td>
                  <td>She is working in the garden.</td>
                </tr>
                <tr>
                  <td>read</td>
                  <td>reading</td>
                  <td>They are reading a novel.</td>
                </tr>
                <tr>
                  <td>play</td>
                  <td>playing</td>
                  <td>The kids are playing outside.</td>
                </tr>
              </tbody>
            </table>

            <h2 id="quy-tac-e">Quy tắc 2 — Bỏ -e câm rồi thêm -ing</h2>
            <p>
              Với động từ kết thúc bằng <strong>-e câm</strong> (không phát âm),
              ta <strong>bỏ -e</strong> rồi mới thêm -ing.
            </p>
            <div className="formula-box">
              <div className="lbl">CÔNG THỨC</div>
              <code>V(bỏ -e) + ing</code>
            </div>
            <ul>
              <li>
                make → <em>making</em>
              </li>
              <li>
                write → <em>writing</em>
              </li>
              <li>
                take → <em>taking</em>
              </li>
              <li>
                come → <em>coming</em>
              </li>
            </ul>
            <div className="callout">
              <span className="ico" aria-hidden="true">
                💡
              </span>
              <div className="b">
                <strong>Lưu ý:</strong>
                Nếu động từ kết thúc bằng -ee, -oe, -ye thì giữ nguyên: see →
                seeing, agree → agreeing, dye → dyeing.
              </div>
            </div>

            <h2 id="quy-tac-gap-doi">Quy tắc 3 — Gấp đôi phụ âm cuối</h2>
            <p>
              Áp dụng cho động từ một âm tiết, kết thúc bằng cấu trúc{" "}
              <strong>phụ âm + nguyên âm + phụ âm</strong> (CVC) — gấp đôi phụ
              âm cuối rồi thêm -ing. Không gấp đôi nếu phụ âm cuối là{" "}
              <em>w, x, y</em>.
            </p>
            <table className="example-table">
              <thead>
                <tr>
                  <th>Động từ gốc</th>
                  <th>Dạng -ing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>run</td>
                  <td>running</td>
                </tr>
                <tr>
                  <td>swim</td>
                  <td>swimming</td>
                </tr>
                <tr>
                  <td>begin</td>
                  <td>beginning</td>
                </tr>
                <tr>
                  <td>stop</td>
                  <td>stopping</td>
                </tr>
                <tr>
                  <td>fix</td>
                  <td>fixing (không gấp đôi -x)</td>
                </tr>
              </tbody>
            </table>

            <h2 id="quy-tac-ie">Quy tắc 4 — Đổi -ie thành -y</h2>
            <p>
              Động từ tận cùng bằng <strong>-ie</strong> thì đổi -ie thành -y
              rồi mới thêm -ing.
            </p>
            <ul>
              <li>
                lie → <em>lying</em>
              </li>
              <li>
                die → <em>dying</em>
              </li>
              <li>
                tie → <em>tying</em>
              </li>
            </ul>

            <h2 id="bat-quy-tac">Quy tắc 5 — Bất quy tắc &amp; lưu ý</h2>
            <div className="callout" style={{ background: "var(--red-light)", borderColor: "#FECACA" }}>
              <span className="ico" aria-hidden="true">
                ⚠️
              </span>
              <div className="b">
                <strong>Lỗi sai hay gặp:</strong>
                Học sinh thường gấp đôi phụ âm với động từ hai âm tiết mà trọng
                âm rơi vào âm đầu. Ví dụ <em>open → opening</em> (không phải
                openning) vì trọng âm rơi vào âm tiết đầu.
              </div>
            </div>

            <h2 id="bai-tap">Bài tập áp dụng (có đáp án)</h2>
            <div className="exercise-card">
              <h4>📝 Bài 1. Viết dạng -ing của các động từ sau</h4>
              <ol>
                <li>
                  swim → <span className="blank" aria-hidden="true" />
                </li>
                <li>
                  make → <span className="blank" aria-hidden="true" />
                </li>
                <li>
                  lie → <span className="blank" aria-hidden="true" />
                </li>
                <li>
                  play → <span className="blank" aria-hidden="true" />
                </li>
                <li>
                  begin → <span className="blank" aria-hidden="true" />
                </li>
              </ol>
            </div>

            <div className="article-tags" aria-label="Tag bài viết">
              <span>#quy-tac-ing</span>
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
        </main>
      </div>
    </>
  );
}
