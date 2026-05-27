import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { DAP_AN_CSS } from "@/lib/page-css/dap-an";
import { fetchExamBySlug } from "@/lib/api/exams";
import { examFromCms, type Exam, type ExamMeta } from "@/lib/render/de-thi";
import { NotifyDapAnForm } from "./DapAnActions";
import { PdfViewer } from "@/components/PdfViewer";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";

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
  const cms = await fetchExamBySlug(slug);
  if (!cms) return { title: "Không tìm thấy đáp án — istudy" };
  const exam = examFromCms(cms);
  const baseTitle = exam?.meta?.title ?? (cms as any).title ?? "";

  const seo = await resolveSeo({
    collection: "exams",
    record: { ...cms, title: `Đáp án: ${baseTitle}` } as any,
    subtitle: "Đáp án",
  });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aistudy.com.vn";
  return buildMetadata(seo, `${base}/dap-an/${slug}`);
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
  const meta = exam.meta;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DAP_AN_CSS }} />

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
            <AnswerCard answerUrl={meta.answerUrl} meta={meta} />
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
        {meta.answerUrl && meta.allowDownload && (
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
  meta,
}: {
  answerUrl: string;
  meta: ExamMeta;
}) {
  return (
    <div className="pdf-card">
      <div className="pdf-content">
        <PdfViewer src={answerUrl} ariaTitle={`Đáp án — ${meta.title}`} />
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
