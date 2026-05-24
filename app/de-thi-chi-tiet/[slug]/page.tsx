import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DE_THI_CHI_TIET_CSS } from "@/lib/page-css/de-thi-chi-tiet";
import { ExamActionLink, NotifyForm } from "./ExamActions";
import {
  buildStatusStrip,
  examFromCms,
  getAllExamSlugs,
  pdfFilename,
  resolvePhase,
  type Exam,
  type ExamMeta,
} from "@/lib/render/de-thi";
import { fetchExamBySlug } from "@/lib/api/exams";
import { fetchMegaMenuKhoDe } from "@/lib/api/mega-menu";

async function resolveExam(slug: string): Promise<Exam | null> {
  const cms = await fetchExamBySlug(slug);
  if (!cms) return null;
  return examFromCms(cms);
}

type Params = { slug: string };

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
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const exam = await resolveExam(slug);
  if (!exam) notFound();
  const khoDeSlots = await fetchMegaMenuKhoDe();

  const meta = exam.meta;
  const phase = resolvePhase(meta);
  const strip = buildStatusStrip(meta);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DE_THI_CHI_TIET_CSS }} />
      <Header activeNav="kho-de" khoDeSlots={khoDeSlots} />

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
          <HeadCard meta={meta} />

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

          {/* CONTENT AREA */}
          {phase === "waiting" && <WaitingCard withExpectedList />}
          {phase === "ready-1" && meta.pdfUrl && (
            <PdfCard pdfUrl={meta.pdfUrl} filename={meta.pdfFilename} meta={meta} />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

// ============================================================================
// HEAD CARD
// ============================================================================

function HeadCard({ meta }: { meta: ExamMeta }) {
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
          <Link href={`/lam-bai?slug=${meta.slug}`} className="btn btn--primary">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Làm bài online
          </Link>
        )}
        {meta.pdfUrl && meta.allowDownload && (
          <a
            href={meta.pdfUrl}
            download={meta.pdfFilename}
            className="btn btn--outline"
            aria-label="Tải đề thi PDF"
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Tải PDF
          </a>
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
        <Link
          href={`/dap-an/${meta.slug}`}
          className={`btn btn--green btn-xlink${meta.answerUrl ? "" : " is-pending"}`}
          aria-disabled={meta.answerUrl ? undefined : true}
          style={meta.answerUrl ? undefined : { pointerEvents: "none", opacity: 0.7 }}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 11 3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          {meta.answerUrl ? "Xem đáp án" : "Đáp án"}
          {!meta.answerUrl && <span className="xlink-chip">⏳ Chưa có đáp án</span>}
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
    : "Sau khi kỳ thi chính thức kết thúc, đề Tiếng Anh sẽ được cập nhật ngay tại đây. istudy luôn nỗ lực để là nơi đăng đề sớm nhất Việt Nam.";

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

function PdfCard({
  pdfUrl,
  filename,
  meta,
}: {
  pdfUrl: string;
  filename?: string;
  meta: ExamMeta;
}) {
  const displayName = filename ?? pdfFilename(null);

  return (
    <div className="pdf-card">
      <div className="pdf-toolbar">
        <div className="pdf-name">
          <svg className="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
          <span className="pdf-name-text">{displayName}</span>
        </div>
        <div className="pdf-tools">
          <a
            className="pdf-tool"
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mở PDF trong tab mới"
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            Mở tab mới
          </a>
        </div>
      </div>
      <div className="pdf-content">
        <iframe
          src={pdfUrl}
          title={`${meta.title} — ${meta.subjectLabel}`}
          className="pdf-iframe"
          style={{ width: "100%", height: "min(80vh, 900px)", border: 0 }}
        />
        <div className="pdf-mobile-cta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M12 18v-6" />
            <path d="m9 15 3 3 3-3" />
          </svg>
          <p className="pdf-mobile-cta__lead">
            {meta.allowDownload
              ? "Trên điện thoại, PDF mở mượt hơn khi tải về máy."
              : "PDF chỉ xem trên máy tính."}
          </p>
          {meta.allowDownload && (
            <a href={pdfUrl} download={filename} className="btn btn--primary">
              Tải đề về máy
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
