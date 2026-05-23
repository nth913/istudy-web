import Link from "next/link";
import { ChoDeNotifyForm } from "@/app/cho-de/ChoDeNotifyForm";
import { CHO_DE_CSS } from "@/lib/page-css/cho-de";
import type { ExamListItem, CmsExamDetail } from "@/lib/api/exams";

const EXAM_TYPE_LABEL: Record<string, string> = {
  "chinh-thuc": "Chính thức",
  "thi-thu": "Thi thử",
  "minh-hoa": "Minh hoạ",
};

type Props = { exam: ExamListItem | CmsExamDetail };

export function ExamWaiting({ exam }: Props) {
  const examTypeLabel = EXAM_TYPE_LABEL[exam.examType] ?? exam.examType;
  const provinceName = (exam as ExamListItem).province?.name ?? null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CHO_DE_CSS }} />

      <div className="page-wrap">
        <div className="container-md">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="sep">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link>
            <span className="sep">›</span>
            <span className="current">{exam.title}</span>
          </nav>

          <section className="ev-hero" aria-labelledby="ev-title">
            <div className="ev-eyebrow">
              <span className="pulse" aria-hidden="true" />
              <span>Đề thi chưa cập nhật</span>
            </div>
            <h1 id="ev-title">{exam.title}</h1>
            <p className="ev-sub">
              Đề thi này chưa được đăng. Đặt lịch nhắc để không bỏ lỡ — istudy
              sẽ gửi email ngay khi đề được công bố.
            </p>

            <div className="ev-meta-row">
              {provinceName && (
                <span className="ev-meta-chip">
                  <svg
                    className="icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {provinceName}
                </span>
              )}
              <span className="ev-meta-chip">
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {exam.year}
              </span>
              <span className="ev-meta-chip is-soft">{examTypeLabel}</span>
              <span className="ev-meta-chip">
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                Môn Tiếng Anh
              </span>
            </div>
          </section>

          <div className="ev-info-grid">
            <div className="ev-info-card">
              <h3>Thông tin đề thi</h3>
              <ul className="ev-fact-list">
                <li>
                  <span className="k">Đề</span>
                  <span className="v">{exam.title}</span>
                </li>
                {provinceName && (
                  <li>
                    <span className="k">Tỉnh / TP</span>
                    <span className="v">{provinceName}</span>
                  </li>
                )}
                <li>
                  <span className="k">Năm</span>
                  <span className="v">{exam.year}</span>
                </li>
                <li>
                  <span className="k">Loại đề</span>
                  <span className="v">{examTypeLabel}</span>
                </li>
                <li>
                  <span className="k">Môn</span>
                  <span className="v">Tiếng Anh</span>
                </li>
                <li>
                  <span className="k">Trạng thái</span>
                  <span className="v">Chờ đề — trang sẽ tự mở khi có file</span>
                </li>
              </ul>
            </div>

            <div className="ev-info-card ev-notify-box">
              <h3>🔔 Nhắc tôi khi đề lên</h3>
              <p>
                Đăng ký để được thông báo ngay khi đề Tiếng Anh được công bố.
                istudy thường đăng đề trong vòng 30–60 phút sau giờ thi.
              </p>
              <ChoDeNotifyForm
                notifyType="exam"
                refSlug={exam.slug}
                ariaLabel="Form đăng ký nhận đề"
                buttonLabel="Đăng ký nhận đề"
                successMessage="Đã đăng ký! Em sẽ gửi email ngay khi đề thi cập nhật."
              />
              <div className="ev-notify-channels" aria-label="Kênh nhận thông báo">
                <label className="chan is-on">
                  <input type="checkbox" defaultChecked /> Email
                </label>
                <label className="chan">
                  <input type="checkbox" /> Trên web
                </label>
                <label className="chan">
                  <input type="checkbox" /> Zalo
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
