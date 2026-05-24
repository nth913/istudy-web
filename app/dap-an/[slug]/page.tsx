import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DAP_AN_CSS } from "@/lib/page-css/dap-an";
import { fetchExamBySlug } from "@/lib/api/exams";
import { fetchMegaMenuKhoDe } from "@/lib/api/mega-menu";
import { examFromCms, type Exam, type ExamMeta } from "@/lib/render/de-thi";
import { NotifyDapAnForm } from "./DapAnActions";

type Params = { slug: string };

async function resolveExam(slug: string): Promise<Exam | null> {
  const cms = await fetchExamBySlug(slug);
  if (!cms) return null;
  return examFromCms(cms);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = await resolveExam(slug);
  if (!exam) return { title: "Đáp án — istudy" };
  return {
    title: `Đáp án — ${exam.meta.title} — istudy`,
    description: `Đáp án ${exam.meta.title} — ${exam.meta.subjectLabel}.`,
  };
}

export const dynamicParams = true;

export async function generateStaticParams(): Promise<Params[]> {
  return [];
}

export default async function DapAnPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const exam = await resolveExam(slug);
  if (!exam) notFound();
  const khoDeSlots = await fetchMegaMenuKhoDe();
  const meta = exam.meta;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DAP_AN_CSS }} />
      <Header activeNav="kho-de" khoDeSlots={khoDeSlots} />

      <div className="page-wrap">
        <div className="container-md">
          <nav className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="sep">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link>
            <span className="sep">›</span>
            <Link href={`/de-thi-chi-tiet/${meta.slug}`}>{meta.title}</Link>
            <span className="sep">›</span>
            <span className="current">Đáp án</span>
          </nav>

          <DapAnHeadCard meta={meta} />

          {meta.answerUrl ? (
            <AnswerCard answerUrl={meta.answerUrl} filename={meta.answerFilename} meta={meta} />
          ) : (
            <WaitingCard meta={meta} />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

function DapAnHeadCard({ meta }: { meta: ExamMeta }) {
  return (
    <div className="head-card">
      <div className="head-meta">
        <span className="badge badge--official">📋 Đáp án chính thức</span>
      </div>
      <h1>
        Đáp án — {meta.title}
        <br />
        {meta.subjectLabel}
      </h1>
      <p className="desc">{meta.description}</p>

      <div className="head-actions">
        <Link
          href={`/de-thi-chi-tiet/${meta.slug}`}
          className={`btn btn--outline${meta.pdfUrl ? "" : " is-pending"}`}
          aria-disabled={meta.pdfUrl ? undefined : true}
          style={meta.pdfUrl ? undefined : { pointerEvents: "none", opacity: 0.7 }}
        >
          {meta.pdfUrl ? "Xem đề" : "Đề chưa có"}
        </Link>
        {meta.answerUrl && (
          <a
            href={meta.answerUrl}
            download={meta.answerFilename}
            className="btn btn--green"
            aria-label="Tải đáp án PDF"
          >
            Tải đáp án
          </a>
        )}
      </div>
    </div>
  );
}

function AnswerCard({
  answerUrl,
  filename,
  meta,
}: {
  answerUrl: string;
  filename?: string;
  meta: ExamMeta;
}) {
  return (
    <div className="pdf-card">
      <div className="pdf-content">
        <iframe
          src={answerUrl}
          title={`Đáp án — ${meta.title}`}
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
              ? "Trên điện thoại, đáp án mở mượt hơn khi tải về máy."
              : "Đáp án chỉ xem trên máy tính."}
          </p>
          {meta.allowDownload && (
            <a href={answerUrl} download={filename} className="btn btn--primary">
              Tải đáp án về máy
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function WaitingCard({ meta }: { meta: ExamMeta }) {
  return (
    <div className="waiting-card is-da">
      <div className="waiting-head">
        <div className="waiting-text">
          <h2>Đáp án chưa được cập nhật</h2>
          <p>
            Đáp án sẽ có ngay khi giáo viên giải xong (thường 2–4 giờ sau khi đề thi
            kết thúc). Đăng ký nhận thông báo ngay bên dưới.
          </p>
        </div>
      </div>
      <div className="waiting-cta" id="notify">
        <NotifyDapAnForm />
      </div>
      {meta.pdfUrl && (
        <p style={{ marginTop: 16 }}>
          <Link href={`/de-thi-chi-tiet/${meta.slug}`}>← Xem đề trước</Link>
        </p>
      )}
    </div>
  );
}
