import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DE_THI_CHI_TIET_CSS } from "@/lib/page-css/de-thi-chi-tiet";
import { AdSlot } from "@/components/AdSlot";
import { ExamActionLink, NotifyForm } from "./ExamActions";
import TabStrip from "./TabStrip";
import {
  buildStatusStrip,
  examFromCms,
  getAllExamSlugs,
  getCodeStatuses,
  getExamBySlug,
  pdfFilename,
  pickActiveCode,
  resolvePhase,
  type Exam,
  type ExamCode,
  type ExamMeta,
} from "@/lib/render/de-thi";
import { fetchExamBySlug } from "@/lib/api/exams";

async function resolveExam(slug: string): Promise<Exam | null> {
  const mock = getExamBySlug(slug);
  if (mock) return mock;
  const cms = await fetchExamBySlug(slug);
  if (!cms) return null;
  return examFromCms(cms);
}

type Params = { slug: string };
type SearchParams = { ma?: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = await resolveExam(slug);
  if (!exam) return { title: "Đề thi — istudy" };
  return {
    title: `${exam.meta.title} — ${exam.meta.subjectLabel} — istudy`,
    description: exam.meta.description,
  };
}

export const dynamicParams = true;

export async function generateStaticParams(): Promise<Params[]> {
  return getAllExamSlugs().map((slug) => ({ slug }));
}

export default async function DeThiChiTietPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams?: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const { ma } = (await searchParams) ?? {};
  const exam = await resolveExam(slug);
  if (!exam) notFound();
  const meta = exam.meta;
  const phase = resolvePhase(meta);
  const codes = getCodeStatuses(meta);
  const active = phase === "ready-multi" ? pickActiveCode(codes, ma ?? null) : null;
  const strip = buildStatusStrip(meta);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DE_THI_CHI_TIET_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="container-md">
          {/* BREADCRUMB */}
          <nav className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="sep">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link>
            <span className="sep">›</span>
            {/* TODO(istudy-cms): link tới taxonomy /kho-de-thi?cat=thpt-qg khi CMS ready */}
            <Link href="/kho-de-thi">THPT Quốc gia 2026</Link>
            <span className="sep">›</span>
            <span className="current">Môn Tiếng Anh</span>
          </nav>

          {/* HEAD CARD */}
          <HeadCard meta={meta} phase={phase} active={active} />

          {/* STATUS STRIP */}
          <div className={`status-strip ${strip.variant}`}>
            <span className="ss-dot" />
            <div className="ss-grow" dangerouslySetInnerHTML={{ __html: strip.html }} />
            {strip.action && (
              <Link href={strip.action.href} className="ss-action">
                {strip.action.label}
              </Link>
            )}
          </div>

          {/* TAB STRIP — chỉ hiện khi có nhiều mã đề */}
          {phase === "ready-multi" && (
            <TabStrip codes={codes} activeCode={active?.code} slug={slug} />
          )}

          {/* CONTENT AREA */}
          {phase === "waiting" && <WaitingCard withExpectedList />}
          {phase === "ready-1" && <PdfCard maCode={null} />}
          {phase === "ready-multi" && active && (
            <>
              {active.status === "ready" ? (
                <PdfCard maCode={active.code} />
              ) : (
                <WaitingCard maCode={active.code} />
              )}
            </>
          )}
        </div>
      </div>

      <AdSlot variant="footer" slotId={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER_DE_THI} />
      <Footer />
    </>
  );
}

// ============================================================================
// HEAD CARD
// ============================================================================

function HeadCard({
  meta,
  phase,
  active,
}: {
  meta: ExamMeta;
  phase: "waiting" | "ready-1" | "ready-multi";
  active: ExamCode | null;
}) {
  const isReady =
    phase === "ready-1" || (phase === "ready-multi" && active?.status === "ready");
  const dapanHref = active ? `/dap-an?ma=${active.code}` : "/dap-an";
  const lamBaiHref = active ? `/lam-bai?ma=${active.code}` : "/lam-bai";

  // Auto-enable Tải PDF after 3 days post exam date (per de-thi-render.js renderHeadCard).
  // Parse meta.examDate (format DD/MM/YYYY) so each mock honours its own date.
  const [dd, mm, yyyy] = meta.examDate.split("/");
  const examDate = new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
  const autoEnable = isReady && Date.now() - examDate.getTime() >= 3 * 24 * 60 * 60 * 1000;
  const showPdf = meta.pdfEnabled || autoEnable;

  return (
    <div className="head-card">
      <div className="head-meta">
        <span className="badge badge--hot">🔥 Hot</span>
        <span className="badge badge--official">📋 Đề chính thức</span>
        {meta.showOnlineOption && (
          <span className="pill pill-green">🖥️ Có làm online</span>
        )}
      </div>
      <h1>
        {meta.title}
        <br />
        {meta.subjectLabel}
      </h1>
      <p className="desc">{meta.description}</p>

      <div className="info-row">
        <span>
          📖 <b>{meta.totalQuestions}</b> câu hỏi
        </span>
        <span>
          ⏱️ <b>{meta.durationMinutes}</b> phút
        </span>
        <span>
          👁️ <b>{meta.views}</b> lượt xem
        </span>
        <span>
          📅 Thi ngày <b>{meta.examDate}</b>
        </span>
        {meta.numCodes > 1 && (
          <span>
            🏷️ <b>{meta.numCodes}</b> mã đề
          </span>
        )}
      </div>

      <div className="head-actions">
        {meta.showOnlineOption && (
          <Link href={lamBaiHref} className="btn btn--primary">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Làm bài online
          </Link>
        )}
        {showPdf && (
          <ExamActionLink
            className="btn btn--outline"
            style={isReady ? undefined : { opacity: 0.5, pointerEvents: "none" }}
            title={isReady ? undefined : "Sẽ có khi đề được cập nhật"}
            ariaLabel="Tải đề thi PDF"
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Tải PDF
          </ExamActionLink>
        )}
        <ExamActionLink className="btn btn--outline" ariaLabel="In đề thi">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          In đề
        </ExamActionLink>
        <ExamActionLink className="btn btn--outline" ariaLabel="Chia sẻ đề thi">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Chia sẻ
        </ExamActionLink>
        <Link href={dapanHref} className={`btn btn--green btn-xlink${phase === "waiting" ? " is-pending" : ""}`}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 11 3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          {phase === "waiting" ? "Đáp án" : "Xem đáp án"}
          {phase === "waiting" && <span className="xlink-chip">⏳ Sẽ có sau đề</span>}
        </Link>
      </div>
    </div>
  );
}

// ============================================================================
// WAITING CARD
// ============================================================================

function WaitingCard({
  maCode,
  withExpectedList = false,
}: {
  maCode?: string;
  withExpectedList?: boolean;
}) {
  const titleText = maCode
    ? `Mã đề ${maCode} — đang được cập nhật`
    : "Đề chưa được công bố";

  const subText = maCode
    ? `Mã ${maCode} sẽ có trong vài phút nữa. Bạn có thể chọn mã khác đã có đề ở thanh tab phía trên trong khi chờ.`
    : "Sau khi kỳ thi chính thức kết thúc, đề Tiếng Anh sẽ được cập nhật ngay tại đây trong vòng 30–60 phút. istudy luôn nỗ lực để là nơi đăng đề sớm nhất Việt Nam.";

  const sections = [
    { qs: 3, label: "I. Pronunciation & Stress" },
    { qs: 3, label: "II. Grammar & Vocabulary" },
    { qs: 2, label: "III. Reading comprehension" },
  ];

  return (
    <div className="waiting-card is-de">
      <div className="waiting-head">
        <div className="waiting-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="12" height="16" rx="2" />
            <path d="M9 4v-2h6v2" />
            <path d="M9 9h6" />
            <path d="M9 13h6" />
            <path d="M9 17h4" />
          </svg>
        </div>
        <div className="waiting-text">
          <h2>{titleText}</h2>
          <p>{subText}</p>
        </div>
      </div>

      <div className="waiting-meta">
        <span>
          📡 Trạng thái: <b>{maCode ? "Đang xử lý Hẹ hẹ" : "Chưa có đề"}</b>
        </span>
        <span>
          ⏱ Cập nhật cuối: <b>vài phút trước</b>
        </span>
        <span>
          🔔 <b>{maCode ? "186" : "1.284"}</b> bestie đang hóng
        </span>
      </div>

      <div className="skel-paper-wrap">
        <div className="skel-paper">
          <div className="skel-title-bk">
            <div className="sk-l w1" />
            <div className="sk-l w2" />
          </div>
          {sections.map((sec, sIdx) => (
            <div key={sIdx} className="skel-section">
              <div className="sk-h" />
              {Array.from({ length: sec.qs }).map((_, qIdx) => {
                // Deterministic width so SSR/CSR don't differ.
                const widthPct = 50 + ((sIdx * 7 + qIdx * 13) % 30);
                return (
                  <div key={qIdx}>
                    <div className="skel-q">
                      <span className="sk-q-num" />
                      <span className="sk-q-line" style={{ width: `${widthPct}%` }} />
                    </div>
                    <div className="skel-options">
                      {["A", "B", "C", "D"].map((o) => (
                        <div key={o} className="sk-o">
                          <b>{o}.</b>
                          <div className="sk-o-line" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {withExpectedList && (
        <div className="expected-list">
          <div className="ex-item">
            <span className="ex-num">I</span>Pronunciation &amp; Stress <span className="ex-meta">4 câu</span>
          </div>
          <div className="ex-item">
            <span className="ex-num">II</span>Grammar &amp; Vocabulary <span className="ex-meta">~14 câu</span>
          </div>
          <div className="ex-item">
            <span className="ex-num">III</span>Cloze test (điền từ vào đoạn văn) <span className="ex-meta">~5 câu</span>
          </div>
          <div className="ex-item">
            <span className="ex-num">IV</span>Reading comprehension <span className="ex-meta">~10 câu</span>
          </div>
          <div className="ex-item">
            <span className="ex-num">V</span>Word formation <span className="ex-meta">~3 câu</span>
          </div>
          <div className="ex-item">
            <span className="ex-num">VI</span>Sentence transformation <span className="ex-meta">~4 câu</span>
          </div>
        </div>
      )}

      <div className="waiting-cta" id="notify">
        <NotifyForm maCode={maCode} />
      </div>
    </div>
  );
}

// ============================================================================
// PDF CARD
// ============================================================================

function PdfCard({ maCode }: { maCode: string | null }) {
  const filename = pdfFilename(maCode);

  return (
    <div className="pdf-card">
      <div className="pdf-toolbar">
        <div className="pdf-name">
          <svg className="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
          <span className="pdf-name-text">{filename}</span>
        </div>
        {/* TODO(istudy-cms): wire PDF.js toolbar (TOC, find, zoom) via client island khi PDF viewer ready. */}
        <div className="pdf-tools">
          <button className="pdf-tool" type="button" aria-label="Mục lục đề thi">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <circle cx="4" cy="6" r="1" />
              <circle cx="4" cy="12" r="1" />
              <circle cx="4" cy="18" r="1" />
            </svg>
            Mục lục
          </button>
          <button className="pdf-tool" type="button" aria-label="Tìm trong đề">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Tìm
          </button>
          <button className="pdf-tool" type="button" aria-label="Phóng to đề">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            Phóng to
          </button>
        </div>
      </div>
      <div className="pdf-content">
        <div className="pdf-page-mini">
          <div className="title-block">
            <div className="t1">BỘ GIÁO DỤC VÀ ĐÀO TẠO</div>
            <div className="t1">KỲ THI TỐT NGHIỆP THPT NĂM 2026</div>
            <div className="t2">MÔN: TIẾNG ANH</div>
            <div className="t3">Thời gian làm bài: 60 phút (không kể thời gian phát đề)</div>
            {maCode && (
              <div className="ma-stamp">
                Mã đề thi · <b>{maCode}</b>
              </div>
            )}
          </div>

          <h4>
            I. Choose the word / phrase / sentence (A, B, C or D) that best fits the space or best answers the question
            given in each sentence.
          </h4>
          <div className="q">
            <b>1.</b> Which word has the underlined part pronounced differently from that of the others?
          </div>
          <div className="o">
            A. stay<u>s</u> &nbsp;&nbsp; B. know<u>s</u> &nbsp;&nbsp; C. reset<u>s</u> &nbsp;&nbsp; D. burn<u>s</u>
          </div>
          <div className="q">
            <b>2.</b> Which word has a different stress pattern from that of the others?
          </div>
          <div className="o">A. future &nbsp;&nbsp; B. equip &nbsp;&nbsp; C. modern &nbsp;&nbsp; D. happy</div>
          <div className="q">
            <b>3.</b> Helen: You seem to be busy with something. What&apos;s that, Sam? — Sam: I _______ an article about
            our school festival.
          </div>
          <div className="o">A. wrote &nbsp;&nbsp; B. am writing &nbsp;&nbsp; C. write &nbsp;&nbsp; D. have written</div>

          <h4>II. Look at the sign or the notice. Choose the best answer (A, B, C or D).</h4>
          <div className="q">
            <b>15.</b> What does the sign tell you to do? ⚠ SCHOOL ZONE
          </div>
          <div className="o">A. Give the pupils a lift &nbsp;&nbsp; B. Slow down; school pupils ahead</div>

          <h4>III. Choose the word that best fits each space in the following passage.</h4>
          <div className="passage">
            Dear Danny,
            <br />I hope you&apos;re doing well! I&apos;d like to tell you about a (17) _______ I really enjoy — badminton.
            You don&apos;t need much to start — just a racket, a shuttlecock, and a bit of (18) _______ space.
          </div>
          <div className="o">
            <b>17.</b> A. movie &nbsp;&nbsp; B. job &nbsp;&nbsp; C. sport &nbsp;&nbsp; D. work
          </div>
          <div className="o">
            <b>18.</b> A. open &nbsp;&nbsp; B. empty &nbsp;&nbsp; C. tall &nbsp;&nbsp; D. narrow
          </div>

          <div style={{ textAlign: "center", padding: "14px 0", color: "var(--g400)", fontSize: 12 }}>
            ⋯ còn nhiều câu nữa (Đọc hiểu, Word form, Viết lại câu), tải PDF để xem đầy đủ ⋯
          </div>

          <div className="pdf-end">— HẾT —</div>
        </div>
      </div>
    </div>
  );
}
