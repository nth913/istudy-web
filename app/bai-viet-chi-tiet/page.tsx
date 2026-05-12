"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BAI_VIET_CHI_TIET_CSS } from "@/lib/page-css/bai-viet-chi-tiet";

const tocItems = [
  { href: "#dinh-nghia", label: "1. Thì hiện tại đơn là gì?" },
  { href: "#cong-thuc", label: "2. Công thức" },
  { href: "#cong-thuc-thuong", label: "2.1 Với động từ thường", lvl: 2 },
  { href: "#cong-thuc-tobe", label: "2.2 Với động từ TO BE", lvl: 2 },
  { href: "#cach-dung", label: "3. Cách dùng" },
  { href: "#dau-hieu", label: "4. Dấu hiệu nhận biết" },
  { href: "#quy-tac", label: "5. Quy tắc thêm s/es" },
  { href: "#luu-y", label: "6. Lưu ý đặc biệt" },
];

export default function BaiVietChiTietPage() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(2347);
  const [activeId, setActiveId] = useState<string>("dinh-nghia");

  useEffect(() => {
    const ids = tocItems.map((t) => t.href.slice(1));
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  function toggleLike() {
    setLiked((l) => {
      const next = !l;
      setLikes((c) => c + (next ? 1 : -1));
      return next;
    });
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BAI_VIET_CHI_TIET_CSS }} />
      <Header activeNav="blog" />

      <div className="article-banner" aria-label="Banner bài viết" />

      <div className="meta-wrap">
        <section className="panel meta-card">
          <nav className="crumbs">
            <Link href="/">Trang chủ</Link><span className="sep">›</span>
            <Link href="/bai-viet">Bài viết</Link><span className="sep">›</span>
            <Link href="/bai-viet">Ngữ pháp</Link><span className="sep">›</span>
            <span className="current">Thì hiện tại đơn</span>
          </nav>
          <h1>Thì hiện tại đơn (Simple Present): Công thức, cách dùng &amp; 50 ví dụ chi tiết</h1>
          <p className="lede">
            Tổng hợp đầy đủ kiến thức về thì hiện tại đơn cho học sinh THCS – THPT: công thức, dấu hiệu nhận biết, quy tắc
            thêm s/es, và bài tập áp dụng có đáp án — tất cả trong một bài.
          </p>
          <div className="meta-row">
            <div className="author-block">
              <div className="ava">A</div>
              <span className="n">Ai Sta Đi Team</span>
              <span className="sep">•</span>
              <span className="date">📅 12/05/2026</span>
            </div>
          </div>
          <div className="meta-row-2">
            <div className="read-stats">
              <span>⏱ 8 phút đọc</span>
              <span>👁 28.402 lượt xem</span>
            </div>
            <div className="share-block">
              <button className={`like-btn${liked ? " liked" : ""}`} onClick={toggleLike}>
                <span className="heart">♥</span>
                <span>{likes.toLocaleString("vi-VN")}</span>
              </button>
              <span className="lbl">Chia sẻ:</span>
              <button className="share-btn" title="Facebook">f</button>
              <button className="share-btn" title="X / Twitter">𝕏</button>
              <button className="share-btn" title="Sao chép liên kết">🔗</button>
              <button className="share-btn" title="Lưu">🔖</button>
            </div>
          </div>
        </section>
      </div>

      <div className="article-layout">
        <aside className="sidebar-left">
          <div className="toc-card">
            <h4>Mục lục bài viết</h4>
            <nav className="toc-list">
              {tocItems.map((t) => (
                <a
                  key={t.href}
                  href={t.href}
                  className={`${t.lvl === 2 ? "lvl-2" : ""}${activeId === t.href.slice(1) ? " active" : ""}`}
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main>
          <section className="panel inner-banner" style={{ padding: 0 }}>
            <span className="blob b1" />
            <span className="blob b2" />
            <span className="blob b3" />
            <div className="card-inside">
              <div className="eyebrow">NGỮ PHÁP TIẾNG ANH</div>
              <h2>Thì hiện tại đơn</h2>
              <div className="tag">— Present Simple Tense —</div>
            </div>
          </section>

          <section className="takeaways">
            <div className="head">🔑 KEY TAKEAWAYS</div>
            <ol>
              <li><span><b>Định nghĩa:</b> Thì hiện tại đơn diễn tả thói quen, sự thật hiển nhiên, lịch trình ở hiện tại.</span></li>
              <li><span><b>Công thức cơ bản:</b> S + V(s/es) — khẳng định; S + don&apos;t/doesn&apos;t + V — phủ định; Do/Does + S + V — nghi vấn.</span></li>
              <li><span><b>Dấu hiệu nhận biết:</b> always, usually, often, sometimes, rarely, never, every day…</span></li>
              <li><span><b>Phát âm -s/es:</b> 3 cách phát âm /ɪz/, /s/, /z/ tuỳ theo âm cuối của động từ.</span></li>
              <li><span><b>Quy tắc thêm s/es:</b> 5 quy tắc chính cho động từ kết thúc bằng -y, -o, -sh, -ch, -e, …</span></li>
            </ol>
          </section>

          <article className="panel article-body">
            <h2 id="dinh-nghia">Thì hiện tại đơn là gì?</h2>
            <p>
              <strong>Thì hiện tại đơn (Simple Present Tense)</strong> là một trong những thì cơ bản nhất trong tiếng Anh.
              Thì này được dùng để diễn tả những sự việc, hành động xảy ra thường xuyên, lặp đi lặp lại như thói quen, một
              sự thật hiển nhiên, hay những hành động xảy ra theo lịch trình cố định.
            </p>
            <p>
              Đây là thì <strong>nền tảng</strong> mà bất kỳ học sinh nào cũng phải nắm vững trước khi học các thì phức tạp
              khác. Trong đề thi vào lớp 10, thì hiện tại đơn thường xuất hiện ở các câu trắc nghiệm chia động từ và viết
              lại câu.
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
                <tr><td>Khẳng định</td><td>S + am/is/are + …</td><td>I am a student.</td></tr>
                <tr><td>Phủ định</td><td>S + am/is/are + not + …</td><td>She isn&apos;t happy.</td></tr>
                <tr><td>Nghi vấn</td><td>Am/Is/Are + S + …?</td><td>Are you ready?</td></tr>
              </tbody>
            </table>

            <h2 id="cach-dung">Cách dùng thì hiện tại đơn</h2>
            <p>Thì hiện tại đơn được sử dụng trong <strong>6 trường hợp chính</strong>:</p>
            <ol>
              <li><strong>Diễn tả thói quen, hành động lặp đi lặp lại:</strong> <em>I drink coffee every morning.</em></li>
              <li><strong>Diễn tả sự thật hiển nhiên, chân lý:</strong> <em>The Earth revolves around the Sun.</em></li>
              <li><strong>Diễn tả lịch trình cố định:</strong> <em>The bus leaves at 7 AM tomorrow.</em></li>
              <li><strong>Trong câu điều kiện loại 1:</strong> <em>If it rains, I will stay home.</em></li>
              <li><strong>Sau các trạng từ chỉ tần suất:</strong> always, usually, often, sometimes…</li>
              <li><strong>Hướng dẫn, công thức, lời chỉ đường:</strong> <em>You turn left at the second corner.</em></li>
            </ol>

            <h2 id="dau-hieu">Dấu hiệu nhận biết</h2>
            <p>Khi gặp các từ và cụm từ sau, hãy nghĩ ngay đến <strong>thì hiện tại đơn</strong>:</p>
            <table className="example-table">
              <thead><tr><th>Trạng từ tần suất</th><th>Cụm thời gian</th></tr></thead>
              <tbody>
                <tr><td>always (luôn luôn)</td><td>every day / week / month / year</td></tr>
                <tr><td>usually (thường thường)</td><td>once / twice a week</td></tr>
                <tr><td>often (thường xuyên)</td><td>three times a day</td></tr>
                <tr><td>sometimes (thỉnh thoảng)</td><td>on Mondays / weekends</td></tr>
                <tr><td>rarely / seldom (hiếm khi)</td><td>in the morning / evening</td></tr>
                <tr><td>never (không bao giờ)</td><td>generally / typically</td></tr>
              </tbody>
            </table>

            <h2 id="quy-tac">Quy tắc thêm &quot;s/es&quot; cho động từ</h2>
            <p>Với chủ ngữ ngôi thứ 3 số ít (he, she, it, tên riêng), ta cần thêm <strong>s</strong> hoặc <strong>es</strong> vào động từ:</p>
            <ul>
              <li><strong>Thêm &quot;es&quot;:</strong> động từ tận cùng bằng <em>o, s, x, ch, sh, z</em><br />VD: <em>go → goes, watch → watches, fix → fixes, miss → misses</em></li>
              <li><strong>Đổi &quot;y&quot; thành &quot;ies&quot;:</strong> động từ tận cùng bằng phụ âm + y<br />VD: <em>study → studies, fly → flies, try → tries</em></li>
              <li><strong>Giữ nguyên &quot;y&quot;:</strong> động từ tận cùng bằng nguyên âm + y<br />VD: <em>play → plays, enjoy → enjoys, buy → buys</em></li>
              <li><strong>Bất quy tắc:</strong> <em>have → has</em></li>
            </ul>

            <h2 id="luu-y">Lưu ý đặc biệt</h2>
            <div className="callout">
              <span className="ico">💡</span>
              <div className="b">
                <strong>Tip nhớ nhanh:</strong>
                Khi câu có dấu hiệu &quot;every&quot;, &quot;always&quot;, hoặc nói về sự thật hiển nhiên (mặt trời, nước
                sôi, trái đất…) → 99% là thì <strong>Hiện tại đơn</strong>!
              </div>
            </div>
          </article>
        </main>

        <aside className="sidebar-right">
          <div className="side-card">
            <div className="head">
              <h4>Bài viết liên quan</h4>
              <Link href="/bai-viet">Tất cả ›</Link>
            </div>
            <div className="related-list">
              {[
                { t: "Quy tắc thêm đuôi -ed vào sau động từ và các cách phát âm chuẩn", e: "📘", cls: "" },
                { t: "Động từ thông dụng đi với Verb-ing / to Verb-bare và 5 quy tắc chia động từ phụ", e: "📗", cls: "t2" },
                { t: "Cách thêm s/es trong thì hiện tại đơn — các trường hợp & cách phát âm chuẩn", e: "📙", cls: "t3" },
                { t: "Những động từ không chia ở thì hiện tại tiếp diễn cần biết", e: "📕", cls: "t4" },
                { t: "Quy tắc gấp đôi phụ âm: Định nghĩa và bài tập kèm đáp án", e: "📔", cls: "t5" },
              ].map((r, i) => (
                <Link key={i} className="related-item" href="/bai-viet-chi-tiet">
                  <div className={`thumb ${r.cls}`}>{r.e}</div>
                  <div className="title">{r.t}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="cta-card">
            <div className="icon-rocket">🚀</div>
            <h4>Luyện đề ngay!</h4>
            <p>Hàng trăm đề thi vào lớp 10, đại học có đáp án &amp; lời giải chi tiết.</p>
            <Link className="btn-go" href="/kho-de-thi">Vào kho đề thi →</Link>
          </div>

          <div className="side-card signup-card">
            <h4>📬 Nhận bài mới mỗi tuần</h4>
            <p className="desc">Đăng ký để không bỏ lỡ bài học hữu ích từ đội ngũ Ai Sta Đi.</p>
            <form>
              <input type="email" placeholder="Email của bạn" required />
              <button type="submit">Đăng ký</button>
            </form>
          </div>
        </aside>
      </div>

      <div className="post-article">
        <article className="panel article-body post-body">
          <h2 id="bai-tap">Bài tập áp dụng (có đáp án)</h2>
          <div className="exercise-card">
            <h4>📝 Bài 1. Chia động từ trong ngoặc</h4>
            <ol>
              <li>My father <span className="blank"></span> (work) at a hospital.</li>
              <li>They <span className="blank"></span> (not go) to school on Sundays.</li>
              <li><span className="blank"></span> Linh <span className="blank"></span> (like) ice cream?</li>
              <li>Water <span className="blank"></span> (boil) at 100°C.</li>
              <li>I usually <span className="blank"></span> (have) breakfast at 6:30.</li>
            </ol>
            <details style={{ marginTop: 14 }}>
              <summary style={{ cursor: "pointer", color: "var(--red)", fontWeight: 700, fontSize: 13 }}>▾ Xem đáp án</summary>
              <ol style={{ marginTop: 10, color: "var(--green)", fontWeight: 600 }}>
                <li>works</li>
                <li>don&apos;t go</li>
                <li>Does … like</li>
                <li>boils</li>
                <li>have</li>
              </ol>
            </details>
          </div>

          <div className="inline-cta">
            <div className="ico">🚀</div>
            <div className="copy">
              <h4>Sẵn sàng thử sức với đề thật?</h4>
              <p>Hàng trăm đề thi vào lớp 10, đại học có đáp án &amp; lời giải chi tiết, làm online ngay.</p>
            </div>
            <Link className="go-btn" href="/kho-de-thi">Luyện đề ngay →</Link>
          </div>

          <div className="article-tags">
            <span>#thi-hien-tai-don</span>
            <span>#ngu-phap-co-ban</span>
            <span>#lop-10</span>
            <span>#thpt-qg</span>
          </div>

          <div className="author-bio">
            <div className="ava">AS</div>
            <div>
              <div className="n">Ai Sta Đi Team</div>
              <div className="r">Đội ngũ biên soạn nội dung • istudy.group</div>
              <p className="d">Chuyên xây dựng tài liệu luyện thi vào lớp 10 và đại học, bám sát đề thi mới nhất với phương pháp học chủ động.</p>
            </div>
          </div>
        </article>

        <section className="panel comments-card" id="binh-luan">
          <div className="head"><span className="ico">💬</span> Bình luận (12)</div>
          <form className="comment-form">
            <div className="ava" />
            <input type="text" placeholder="Để lại bình luận của bạn…" required />
            <button type="submit">Gửi</button>
          </form>
          <div className="comment-list">
            <div className="comment">
              <div className="ava" style={{ background: "#7C3AED" }}>MH</div>
              <div className="c-body">
                <div className="c-meta"><span className="name">Minh Hằng</span> <span className="time">2 giờ trước</span></div>
                <p className="c-text">Bài viết rất chi tiết, em đã nắm được quy tắc thêm s/es rồi. Cảm ơn Ai Sta Đi Team! 🙏</p>
                <div className="c-actions"><span>♥ 24</span><span>Trả lời</span></div>
              </div>
            </div>
            <div className="comment">
              <div className="ava" style={{ background: "#16A34A" }}>DT</div>
              <div className="c-body">
                <div className="c-meta"><span className="name">Đức Trí</span> <span className="time">Hôm qua</span></div>
                <p className="c-text">Cho em hỏi: &quot;He <em>has</em> a car&quot; và &quot;He <em>have got</em> a car&quot; thì cái nào đúng ạ?</p>
                <div className="c-actions"><span>♥ 12</span><span>Trả lời</span></div>
              </div>
            </div>
            <div className="comment">
              <div className="ava" style={{ background: "#2563EB" }}>PL</div>
              <div className="c-body">
                <div className="c-meta"><span className="name">Phương Linh</span> <span className="time">3 ngày trước</span></div>
                <p className="c-text">Bài tập áp dụng dễ hiểu, đáp án rõ ràng. Mong team ra thêm bài về thì hiện tại tiếp diễn ạ!</p>
                <div className="c-actions"><span>♥ 8</span><span>Trả lời</span></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
