"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMING_SOON_CSS } from "@/lib/page-css/coming-soon";

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
        Tính năng này
        <br />
        <span className="cs-h1-mark">
          <span>{name ? `"${name}"` : "đang được"}</span>
        </span>
        <br />
        team code <span className="cs-h1-italic">cực gắt</span> nha bestie
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
        Tính năng này
        <br />
        <span className="cs-h1-mark"><span>đang được</span></span>
        <br />
        team code <span className="cs-h1-italic">cực gắt</span> nha bestie
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
  const [sent, setSent] = useState(false);
  return (
    <form
      className={`cs-notify${sent ? " is-sent" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input type="email" placeholder="email@ban.com" required />
      <button type="submit" className="btn btn--outline cs-cta-notify">
        {sent ? (
          <>
            <svg className="icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
            Đã ghi sổ nha
          </>
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
    </form>
  );
}

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <style dangerouslySetInnerHTML={{ __html: COMING_SOON_CSS }} />
      <main className="cs vibe-sticker accent-red mascot-rocket" data-eta="true">
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
                  <NotifyForm />
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
