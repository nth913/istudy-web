"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMING_SOON_CSS } from "@/lib/page-css/coming-soon";
import { postNotify } from "@/lib/api/notify";

const NICE: Record<string, string> = {
  "khoa-hoc": "Khoá học theo lộ trình",
  "thi-thu": "Phòng thi thử online",
  "tai-lieu": "Tài liệu & bài giảng",
  "live": "Lớp Live hằng tuần",
  "ai": "Học cùng AI",
  "dark": "Chế độ tối",
  "search": "Tìm kiếm",
  "login": "Đăng nhập",
  "signup": "Đăng ký",
  "notify": "Trung tâm thông báo",
  "profile": "Trang cá nhân",
};

function FeatureCopy() {
  const sp = useSearchParams();
  const raw = (sp.get("feature") || sp.get("from") || "").trim();
  const name = raw ? NICE[raw.toLowerCase()] || raw : null;
  return (
    <>
      <h1 className="cs-h1">
        Tính năng
        <br />
        <span className="cs-h1-mark">
          <span>{name ? `"${name}"` : "đang được"}</span>
        </span>
        <br />
        đang được team phát triển <span className="cs-h1-italic">cực gắt</span> nha bestie
        <svg className="cs-h1-spark" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 L13.5 9 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 9 Z" fill="currentColor" />
        </svg>
      </h1>
      <p className="cs-sub">
        {name || "Cái bạn vừa bấm"} sẽ sớm lên kệ thôi — team istudy đang chăm chút từng pixel để đảm bảo nó <b>slay hết nấc</b>. Trong lúc chờ thì chill với mấy món đang on-air bên dưới nhé.
      </p>
    </>
  );
}

function FeatureCopyFallback() {
  return (
    <>
      <h1 className="cs-h1">
        Tính năng
        <br />
        <span className="cs-h1-mark"><span>đang được</span></span>
        <br />
        đang được team phát triển <span className="cs-h1-italic">cực gắt</span> nha bestie
        <svg className="cs-h1-spark" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 L13.5 9 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 9 Z" fill="currentColor" />
        </svg>
      </h1>
      <p className="cs-sub">
        Cái bạn vừa bấm sẽ sớm lên kệ thôi — team istudy đang chăm chút từng pixel để đảm bảo nó <b>slay hết nấc</b>. Trong lúc chờ thì chill với mấy món đang on-air bên dưới nhé.
      </p>
    </>
  );
}

function NotifyForm() {
  const sp = useSearchParams();
  const featureSlug =
    (sp.get("feature") || sp.get("from") || "general").trim() || "general";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      setMessage(null);
      const result = await postNotify("feature", email, featureSlug);
      setMessage(
        result.alreadyExists
          ? "Bạn đã đăng ký rồi. Sẽ thông báo qua email."
          : "Đã ghi sổ! Sẽ báo bạn khi tính năng lên sóng.",
      );
      setEmail("");
      setSent(true);
    } catch (err) {
      console.error("[notify-feature]", err);
      setMessage("Không gửi được. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={`cs-notify${sent ? " is-sent" : ""}`}
      aria-label="Đăng ký nhận thông báo khi tính năng lên sóng"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="email@ban.com"
        required
        aria-label="Email nhận thông báo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || sent}
      />
      <button
        type="submit"
        className="btn btn--outline cs-cta-notify"
        disabled={loading || sent}
      >
        {sent ? (
          <>
            <svg className="icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
            Đã ghi sổ nha
          </>
        ) : loading ? (
          <>Đang gửi…</>
        ) : (
          <>
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Báo tôi khi xong
          </>
        )}
      </button>
      {message && (
        <p
          className="cs-notify__msg"
          role="status"
          style={{ marginTop: 8, fontSize: 13, gridColumn: "1 / -1" }}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <style dangerouslySetInnerHTML={{ __html: COMING_SOON_CSS }} />
      <main className="cs vibe-sticker accent-red mascot-book" data-eta="true" data-mascot="book">
        <section className="cs-hero">
          <div className="cs-deco" aria-hidden="true">
            <span className="cs-tape cs-tape--1" />
            <span className="cs-tape cs-tape--2" />
            <span className="cs-tape cs-tape--3" />
            <svg className="cs-spark cs-spark--1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2 L13.5 9 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 9 Z" fill="currentColor" />
            </svg>
            <svg className="cs-spark cs-spark--2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2 L13.5 9 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 9 Z" fill="currentColor" />
            </svg>
            <svg className="cs-spark cs-spark--3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2 L13.5 9 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 9 Z" fill="currentColor" />
            </svg>
            <svg className="cs-doodle cs-doodle--curl" viewBox="0 0 120 60" fill="none" aria-hidden="true">
              <path d="M4 30 C20 4, 40 56, 60 30 S 100 4, 116 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="cs-doodle cs-doodle--arrow" viewBox="0 0 140 80" fill="none" aria-hidden="true">
              <path d="M8 60 C 30 10, 60 10, 90 30 C 110 42, 118 50, 126 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M120 48 L130 60 L116 64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <svg className="cs-doodle cs-doodle--scribble" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="3 8" strokeLinecap="round" />
            </svg>
            <span className="cs-blob cs-blob--1" />
            <span className="cs-blob cs-blob--2" />
          </div>

          <div className="cs-hero-inner">
            <div className="cs-hero-grid">
              <div className="cs-hero-copy">
                <div className="cs-stamp">
                  <span className="cs-stamp-dot" />
                  Đang được team nấu
                  <span className="cs-stamp-tag">WIP · v2</span>
                </div>

                <Suspense fallback={<FeatureCopyFallback />}>
                  <FeatureCopy />
                </Suspense>

                <div className="cs-eta">
                  <div className="cs-eta-head">
                    <div className="cs-eta-lbl">
                      <svg className="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      Tiến độ phát triển
                    </div>
                    <div className="cs-eta-val">
                      <span data-eta-pct>67</span><span className="cs-eta-pct-sym">%</span>
                      <span className="cs-eta-sep">·</span>
                      <span className="cs-eta-when">Lên sóng <b>tháng 7/2026</b></span>
                    </div>
                  </div>
                  <div className="cs-eta-bar">
                    <div className="cs-eta-fill" style={{ width: "67%" }} />
                    <div className="cs-eta-thumb" style={{ left: "67%" }}>
                      <span className="cs-eta-thumb-flag">đang ở đây</span>
                    </div>
                  </div>
                  <div className="cs-eta-ticks">
                    <span>Phác thảo</span>
                    <span>Thiết kế</span>
                    <span className="is-current">Đang code</span>
                    <span>Beta</span>
                    <span>Lên sóng</span>
                  </div>
                </div>

                <div className="cs-ctas">
                  <Link href="/" className="btn btn--primary cs-cta-primary">
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="m12 19-7-7 7-7" />
                      <path d="M19 12H5" />
                    </svg>
                    Quay về trang chủ
                  </Link>
                  <Suspense fallback={null}>
                    <NotifyForm />
                  </Suspense>
                </div>

                <div className="cs-trust">
                  <span className="cs-trust-avatars">
                    <span style={{ background: "#FECACA" }}>A</span>
                    <span style={{ background: "#FED7AA" }}>N</span>
                    <span style={{ background: "#FBCFE8" }}>M</span>
                    <span style={{ background: "#BFDBFE" }}>+</span>
                  </span>
                  <span className="cs-trust-txt"><b>1.284</b> bestie đã đăng ký được báo khi tính năng này lên sóng</span>
                </div>
              </div>

              <div className="cs-hero-art">
                <div className="cs-art-frame">
                  <span className="cs-art-cap">code session · 02:47AM</span>

                  {/* Mascot: BOOK (default) */}
                  <svg className="cs-mascot cs-mascot--book" viewBox="0 0 360 360" aria-hidden="true">
                    <ellipse cx="180" cy="320" rx="110" ry="14" fill="rgba(26,26,26,.10)" />
                    <g transform="translate(60 110)">
                      <path d="M0 30 L0 170 Q60 150, 120 168 L120 28 Q60 10, 0 30 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                      <path d="M240 30 L240 170 Q180 150, 120 168 L120 28 Q180 10, 240 30 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                      <line x1="120" y1="28" x2="120" y2="168" stroke="#1A1A1A" strokeWidth="3" />
                      <g stroke="#D4D4D4" strokeWidth="3" strokeLinecap="round">
                        <line x1="18" y1="60" x2="100" y2="58" />
                        <line x1="18" y1="78" x2="92" y2="76" />
                        <line x1="18" y1="96" x2="104" y2="94" />
                        <line x1="18" y1="114" x2="78" y2="112" />
                        <line x1="140" y1="60" x2="222" y2="62" />
                        <line x1="140" y1="78" x2="214" y2="80" />
                        <line x1="140" y1="96" x2="222" y2="98" />
                        <line x1="140" y1="114" x2="200" y2="116" />
                      </g>
                      <path d="M-4 168 L120 200 L244 168 L120 232 Z" fill="var(--cs-accent)" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                    </g>
                    <g className="cs-face">
                      <ellipse cx="148" cy="218" rx="14" ry="7" fill="rgba(232,25,44,.28)" />
                      <ellipse cx="232" cy="218" rx="14" ry="7" fill="rgba(232,25,44,.28)" />
                      <g fill="#1A1A1A">
                        <circle cx="158" cy="200" r="6" />
                        <circle cx="222" cy="200" r="6" />
                        <circle cx="160" cy="198" r="1.6" fill="#fff" />
                        <circle cx="224" cy="198" r="1.6" fill="#fff" />
                      </g>
                      <path d="M170 222 Q190 238 210 222" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </g>
                    <g transform="translate(132 92)">
                      <path d="M0 50 Q48 -10, 96 50 L96 56 L0 56 Z" fill="#FFB200" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                      <rect x="-8" y="54" width="112" height="10" rx="3" fill="#FFB200" stroke="#1A1A1A" strokeWidth="3" />
                      <rect x="42" y="6" width="12" height="46" fill="rgba(0,0,0,.12)" />
                      <circle cx="48" cy="22" r="6" fill="#fff" stroke="#1A1A1A" strokeWidth="2.5" />
                    </g>
                    <g transform="translate(258 174) rotate(28)">
                      <rect x="0" y="0" width="60" height="10" rx="3" fill="#D4D4D4" stroke="#1A1A1A" strokeWidth="2.5" />
                      <path d="M58 -6 a14 14 0 1 1 -14 22 l4 -8 a6 6 0 1 0 6 -10 z" fill="#D4D4D4" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
                    </g>
                    <g transform="translate(70 70)">
                      <g className="cs-gear">
                        <path d="M0 -22 L4 -22 L6 -14 L12 -16 L14 -12 L10 -6 L18 -2 L18 4 L10 4 L12 12 L8 14 L4 8 L0 14 L-4 14 L-6 8 L-12 12 L-14 8 L-10 2 L-18 0 L-18 -4 L-10 -6 L-14 -12 L-10 -14 L-6 -8 L-4 -16 Z" fill="#E8192C" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
                        <circle r="4" fill="#FFFAF0" stroke="#1A1A1A" strokeWidth="2" />
                      </g>
                    </g>
                    <g className="cs-heart" transform="translate(290 80)">
                      <path d="M0 8 C -8 -2, -18 -2, -18 8 C -18 18, 0 26, 0 26 C 0 26, 18 18, 18 8 C 18 -2, 8 -2, 0 8 Z" fill="#FF6B7A" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
                    </g>
                    <g className="cs-zz" fill="#1A1A1A" fontFamily="Fredoka, sans-serif" fontWeight="700">
                      <text x="42" y="160" fontSize="18" transform="rotate(-12 42 160)">Z</text>
                      <text x="30" y="140" fontSize="14" transform="rotate(-14 30 140)">z</text>
                    </g>
                  </svg>

                  {/* Mascot: COFFEE */}
                  <svg className="cs-mascot cs-mascot--coffee" viewBox="0 0 360 360" aria-hidden="true">
                    <ellipse cx="180" cy="320" rx="110" ry="14" fill="rgba(26,26,26,.10)" />
                    <g stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" className="cs-steam">
                      <path d="M150 40 C 140 60, 160 70, 150 90" />
                      <path d="M180 30 C 170 50, 190 60, 180 80" />
                      <path d="M210 40 C 200 60, 220 70, 210 90" />
                    </g>
                    <ellipse cx="180" cy="280" rx="120" ry="18" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
                    <ellipse cx="180" cy="276" rx="120" ry="14" fill="var(--cs-accent)" stroke="#1A1A1A" strokeWidth="3" />
                    <path d="M90 130 L100 270 Q180 290, 260 270 L270 130 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                    <ellipse cx="180" cy="135" rx="88" ry="14" fill="#4A2C20" stroke="#1A1A1A" strokeWidth="3" />
                    <path d="M270 150 C 320 150, 320 230, 260 230" fill="none" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
                    <g>
                      <ellipse cx="148" cy="216" rx="14" ry="7" fill="rgba(232,25,44,.28)" />
                      <ellipse cx="222" cy="216" rx="14" ry="7" fill="rgba(232,25,44,.28)" />
                      <g fill="#1A1A1A">
                        <path d="M152 196 q6 -6 12 0" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
                        <path d="M208 196 q6 -6 12 0" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
                      </g>
                      <path d="M170 230 Q190 240 210 230" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </g>
                    <text x="180" y="266" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="14" fontWeight="700" fill="#fff">DEV FUEL</text>
                  </svg>

                  {/* Mascot: ROCKET */}
                  <svg className="cs-mascot cs-mascot--rocket" viewBox="0 0 360 360" aria-hidden="true">
                    <ellipse cx="180" cy="320" rx="110" ry="14" fill="rgba(26,26,26,.10)" />
                    <g className="cs-rocket-body">
                      <g className="cs-flame">
                        <path d="M150 250 Q180 320 210 250 Q190 270 180 260 Q170 270 150 250 Z" fill="#FFB200" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                        <path d="M160 250 Q180 300 200 250 Q190 264 180 256 Q170 264 160 250 Z" fill="#E8192C" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
                      </g>
                      <path d="M110 220 L150 200 L150 250 Z" fill="var(--cs-accent)" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                      <path d="M250 220 L210 200 L210 250 Z" fill="var(--cs-accent)" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                      <path d="M150 100 Q180 60 210 100 L210 240 L150 240 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
                      <circle cx="180" cy="140" r="22" fill="#BFDBFE" stroke="#1A1A1A" strokeWidth="3" />
                      <circle cx="180" cy="140" r="22" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="4" strokeDasharray="6 50" transform="rotate(-30 180 140)" />
                      <g transform="translate(180 140)">
                        <circle cx="-6" cy="-2" r="2.4" fill="#1A1A1A" />
                        <circle cx="6" cy="-2" r="2.4" fill="#1A1A1A" />
                        <path d="M-6 6 Q0 10 6 6" stroke="#1A1A1A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                      </g>
                      <rect x="150" y="190" width="60" height="10" fill="var(--cs-accent)" stroke="#1A1A1A" strokeWidth="2.5" />
                    </g>
                  </svg>
                  <span className="cs-corner-sticker">đỉnh nóc<br />kịch trần</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cs-while">
          <div className="cs-while-inner">
            <div className="cs-while-head">
              <div>
                <h2 className="cs-while-title">
                  Trong lúc chờ{" "}
                  <span className="cs-while-title-mark">chill</span>{" "}
                  với mấy món này nha
                </h2>
                <p className="cs-while-sub">Hết bài tập thì hết deadline — mấy thứ dưới đang on-air, vào quẩy là ăn điểm liền.</p>
              </div>
              <Link href="/" className="see-all">
                Tất cả tính năng
                <svg className="icon icon-sm" viewBox="0 0 24 24">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="cs-while-grid">
              <Link href="/kho-de-thi" className="cs-tile cs-tile--red">
                <div className="cs-tile-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="m9 14 2 2 4-4" />
                  </svg>
                </div>
                <div className="cs-tile-tag">12.482 đề · cập nhật hôm nay</div>
                <h3>Kho đề thi</h3>
                <p>Đề chính thức + đề thi thử Sở GD 34 tỉnh. Tải PDF, làm online, có chấm tự động.</p>
                <div className="cs-tile-cta">Vào kho đề
                  <svg className="icon icon-sm" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </div>
              </Link>

              <Link href="/lam-bai" className="cs-tile cs-tile--green">
                <div className="cs-tile-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="cs-tile-tag">60 phút · 40 câu · y như thi thật</div>
                <h3>Thi thử online</h3>
                <p>Mô phỏng phòng thi 100%: đếm ngược, chấm tự động, phân tích lỗi sai theo chuyên đề.</p>
                <div className="cs-tile-cta">Vào phòng thi
                  <svg className="icon icon-sm" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </div>
              </Link>

              <Link href="/bai-viet" className="cs-tile cs-tile--purple">
                <div className="cs-tile-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div className="cs-tile-tag">2.140 bài · cập nhật mỗi tuần</div>
                <h3>Ngữ pháp & Từ vựng</h3>
                <p>Toàn bộ 12 thì, câu điều kiện, mệnh đề quan hệ + 3.000 từ Oxford. Có flashcard, có quiz.</p>
                <div className="cs-tile-cta">Đọc ngay
                  <svg className="icon icon-sm" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </div>
              </Link>

              <Link href="/dap-an" className="cs-tile cs-tile--orange">
                <div className="cs-tile-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 11 3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div className="cs-tile-tag">Giải chi tiết · video chữa</div>
                <h3>Đáp án & lời giải</h3>
                <p>Đáp án full + giải thích từng câu + video chữa đề bởi giáo viên 9.0 IELTS / GV chuyên thi cử.</p>
                <div className="cs-tile-cta">Xem đáp án
                  <svg className="icon icon-sm" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </div>
              </Link>
            </div>

            <div className="cs-fyi">
              <span className="cs-fyi-eyebrow">FYI nè bestie</span>
              <p>
                Trang này hiện ra khi bạn click vào tính năng <b>chưa được làm xong</b> trong istudy.
                Team đang prioritize theo lượt vote — bạn vote bằng cách <b>để lại email</b> ở trên, càng nhiều bestie hóng thì càng được ưu tiên ra trước nha.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
