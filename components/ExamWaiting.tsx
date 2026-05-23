import Link from "next/link";
import { ChoDeNotifyForm } from "@/app/cho-de/ChoDeNotifyForm";
import type { ExamListItem } from "@/lib/api/exams";

const EXAM_TYPE_LABEL: Record<string, string> = {
  "chinh-thuc": "Chính thức",
  "thi-thu": "Thi thử",
  "minh-hoa": "Minh hoạ",
};

export function ExamWaiting({ exam }: { exam: ExamListItem }) {
  const examTypeLabel = EXAM_TYPE_LABEL[exam.examType] ?? exam.examType;
  return (
    <div className="page-wrap exam-waiting-wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span className="sep" aria-hidden> › </span>
        <Link href="/kho-de-thi">Kho đề thi</Link>
        <span className="sep" aria-hidden> › </span>
        <span>{exam.title}</span>
      </nav>

      <h1 className="exam-waiting-title">{exam.title}</h1>
      <div className="exam-meta">
        {exam.province?.name && <span>📍 {exam.province.name}</span>}
        <span>📅 {exam.year}</span>
        <span>🏷️ {examTypeLabel}</span>
      </div>

      <div className="waiting-banner">
        <div className="icon" aria-hidden>⏳</div>
        <div className="title">Đề thi chưa cập nhật</div>
        <div className="sub">Đăng ký email để nhận thông báo ngay khi có đề.</div>
      </div>

      <ChoDeNotifyForm
        notifyType="exam"
        refSlug={exam.slug}
        ariaLabel="Form đăng ký nhận đề"
        buttonLabel="Đăng ký nhận đề"
        successMessage="Đã đăng ký! Em sẽ gửi email ngay khi đề thi cập nhật."
      />

      <style>{`
        .exam-waiting-wrap { max-width: 720px; margin: 0 auto; padding: 24px 16px; }
        .breadcrumb { display: flex; gap: 8px; align-items: center; font-size: 14px; color: rgb(100,116,139); margin-bottom: 16px; flex-wrap: wrap; }
        .breadcrumb a { color: inherit; text-decoration: none; }
        .breadcrumb a:hover { color: rgb(15,23,42); text-decoration: underline; }
        .breadcrumb .sep { color: rgb(148,163,184); }
        .exam-waiting-title { font-size: 28px; font-weight: 700; margin: 0 0 12px; color: rgb(15,23,42); line-height: 1.3; }
        .exam-meta { display: flex; gap: 16px; flex-wrap: wrap; font-size: 14px; color: rgb(71,85,105); margin-bottom: 24px; }
        .waiting-banner { background: rgb(254,243,199); border: 1px solid rgb(252,211,77); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px; }
        .waiting-banner .icon { font-size: 48px; line-height: 1; margin-bottom: 8px; }
        .waiting-banner .title { font-size: 18px; font-weight: 600; color: rgb(120,53,15); margin-bottom: 4px; }
        .waiting-banner .sub { font-size: 14px; color: rgb(146,64,14); }
      `}</style>
    </div>
  );
}
