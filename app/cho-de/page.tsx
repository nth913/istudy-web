/**
 * /cho-de — Waiting page for an upcoming English exam event.
 *
 * Server Component. Reads `?event=<id-or-slug>` from searchParams, fetches the
 * active-events payload, picks the matching event and renders a detailed
 * countdown to `examEndTime` when the content state is `pre`.
 *
 * Fallback (no match OR state ≠ 'pre'): render a friendly empty-state pointing
 * back to home. Per spec §1.1, once `de`/`dap-an` are reached, traffic is
 * supposed to land on /de-thi-chi-tiet or /dap-an instead — this page is the
 * waiting-room destination from the homepage hero's `pre` CTA only.
 *
 * Source design: /tmp/design-bundle/istudy-v2/project/cho-de.html. The live
 * countdown tick + notify form are split into the `ChoDeCountdown` and
 * `ChoDeNotifyForm` client components to keep this file a pure RSC.
 */
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  fetchActiveEvents,
  computeEventState,
  dayDiffFromEvent,
  relDayPhrase,
  type Event,
} from "@/lib/events-data";
import { CHO_DE_CSS } from "@/lib/page-css/cho-de";
import { ChoDeCountdown } from "./ChoDeCountdown";
import { ChoDeNotifyForm } from "./ChoDeNotifyForm";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const dynamic = "force-dynamic";

interface ChoDePageProps {
  searchParams: Promise<{ event?: string }>;
}

function findEvent(events: Event[], key?: string): Event | null {
  if (!key) return null;
  return (
    events.find((e) => e.id === key) ??
    events.find((e) => e.slug === key) ??
    null
  );
}

/** Format an ISO date as "Thứ X, dd/MM/yyyy" (Vietnamese long form). */
function formatVietnameseDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const days = [
    "Chủ nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${days[d.getDay()]}, ${dd}/${mm}/${d.getFullYear()}`;
}

/** Format an ISO time as HH:mm. */
function formatHHmm(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export async function generateMetadata({ searchParams: _searchParams }: ChoDePageProps) {
  const seo = await resolveSeo({
    collection: "events",
    routeTitle: "Chờ đề thi",
    routeDescription: "Sự kiện sắp diễn ra của iStudy",
    subtitle: "Sự kiện",
  });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aistudy.com.vn";
  return buildMetadata(seo, `${base}/cho-de`);
}

export default async function ChoDePage({ searchParams }: ChoDePageProps) {
  const sp = await searchParams;
  const payload = await fetchActiveEvents();
  const ev = findEvent(payload.events, sp.event);
  const now = new Date();
  const state = ev ? computeEventState(ev, now) : null;

  const isPre = ev && state === "pre";

  return (
    <>
      <Header activeNav="kho-de" />
      <style dangerouslySetInnerHTML={{ __html: CHO_DE_CSS }} />

      <div className="page-wrap">
        <div className="container-md">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="sep">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link>
            <span className="sep">›</span>
            <span className="current">{ev?.short || ev?.title || "Đợi đề thi"}</span>
          </nav>

          {isPre && ev ? (
            <PreState event={ev} />
          ) : (
            <EmptyState event={ev} state={state} />
          )}

          {/* Related events (other events in payload, excluding current) */}
          {payload.events.length > 1 && (
            <RelatedEvents events={payload.events} currentId={ev?.id} />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

function PreState({ event }: { event: Event }) {
  const examStart = event.examStartTime || event.examEndTime;
  const examDateLabel = formatVietnameseDate(examStart);
  const startHHmm = formatHHmm(examStart);
  const endHHmm = formatHHmm(event.examEndTime);
  const eyebrow = event.heroEyebrow || "Sự kiện sắp diễn ra";

  return (
    <>
      <section className="ev-hero" aria-labelledby="ev-title">
        <div className="ev-eyebrow">
          <span className="pulse" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
        <h1 id="ev-title">{event.title}</h1>
        <p className="ev-sub">
          Đặt lịch nhắc để không bỏ lỡ. Ngay khi đề được công bố, istudy sẽ đẩy
          thông báo và mở trang đề ngay tại đường dẫn này.
        </p>

        <div className="ev-meta-row">
          <span className="ev-meta-chip">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {examDateLabel}
          </span>
          <span className="ev-meta-chip">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            Môn Tiếng Anh
          </span>
          {typeof event.priority === "number" && (
            <span className="ev-meta-chip is-soft">
              Ưu tiên #{event.priority}
            </span>
          )}
        </div>

        <ChoDeCountdown
          examStartTime={examStart}
          examEndTime={event.examEndTime}
          startHHmm={startHHmm}
          endHHmm={endHHmm}
        />
      </section>

      <ScheduleStrip startHHmm={startHHmm} endHHmm={endHHmm} />

      <div className="ev-info-grid">
        <div className="ev-info-card">
          <h3>Thông tin sự kiện</h3>
          <ul className="ev-fact-list">
            <li>
              <span className="k">Sự kiện</span>
              <span className="v">{event.title}</span>
            </li>
            <li>
              <span className="k">Ngày thi</span>
              <span className="v">{examDateLabel}</span>
            </li>
            {startHHmm && endHHmm && (
              <li>
                <span className="k">Giờ thi</span>
                <span className="v">{startHHmm} — {endHHmm}</span>
              </li>
            )}
            <li>
              <span className="k">Môn</span>
              <span className="v">Tiếng Anh</span>
            </li>
            <li>
              <span className="k">Hệ thống đề</span>
              <span className="v">Trang này sẽ tự mở đề khi có</span>
            </li>
            <li>
              <span className="k">Đáp án</span>
              <span className="v">Cập nhật rỉ rả 2–4 giờ sau giờ thi</span>
            </li>
          </ul>
        </div>

        <div className="ev-info-card ev-notify-box">
          <h3>🔔 Nhắc tôi khi đề lên</h3>
          <p>
            Đăng ký để được thông báo ngay khi đề Tiếng Anh được công bố. istudy
            thường lên đề trong vòng 30–60 phút sau giờ thi.
          </p>
          <ChoDeNotifyForm eventId={event.id} />
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
    </>
  );
}

function ScheduleStrip({
  startHHmm,
  endHHmm,
}: {
  startHHmm: string;
  endHHmm: string;
}) {
  // Static 4-step timeline. In the `pre` state, step 1 ("Ôn tập nước rút")
  // is "now"; steps 2–4 are upcoming.
  const steps: Array<{ when: string; title: string; desc: string; state: "now" | "todo" | "done" }> = [
    {
      when: "Trước thi",
      title: "Ôn tập nước rút",
      desc: "Luyện đề mẫu và xem chuyên đề trọng tâm.",
      state: "now",
    },
    {
      when: startHHmm || "07:30",
      title: "Bắt đầu thi",
      desc: "Thí sinh vào phòng thi chính thức.",
      state: "todo",
    },
    {
      when: endHHmm || "09:30",
      title: "Hết giờ thi",
      desc: "Đề được phép phổ biến, istudy nhập đề.",
      state: "todo",
    },
    {
      when: "+30–60 phút",
      title: "Đề lên istudy",
      desc: "Đề + đáp án dự kiến hoàn tất trong 2–4 giờ.",
      state: "todo",
    },
  ];
  return (
    <ol className="ev-schedule" aria-label="Lịch trình kỳ thi">
      {steps.map((s, i) => (
        <li key={i} className={`ev-step ${s.state}`}>
          <span className="step-num" aria-hidden="true">{i + 1}</span>
          <span className="when">{s.when}</span>
          <h4>{s.title}</h4>
          <p>{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

function EmptyState({ event, state }: { event: Event | null; state: string | null }) {
  // Two cases:
  //  - no matching event in payload
  //  - event found but already past pre (de / dap-an): redirect-style copy.
  if (event && state === "de") {
    return (
      <div className="ev-empty">
        <h2>Đề đã lên!</h2>
        <p>
          Kỳ thi <b>{event.title}</b> đã có đề trên hệ thống. Vào xem ngay
          tại trang đề thi nha.
        </p>
        <Link
          href="/de-thi-chi-tiet"
          className="btn btn--primary"
        >
          Vào xem đề ngay →
        </Link>
      </div>
    );
  }
  if (event && state === "dap-an") {
    return (
      <div className="ev-empty">
        <h2>Đáp án đã có!</h2>
        <p>
          Kỳ thi <b>{event.title}</b> đã có đáp án + lời giải đầy đủ. Vào xem
          tại trang đáp án nha.
        </p>
        <Link
          href="/dap-an"
          className="btn btn--primary"
        >
          Xem đáp án →
        </Link>
      </div>
    );
  }
  return (
    <div className="ev-empty">
      <h2>Hiện chưa có kỳ thi nào đang chờ đề</h2>
      <p>
        Trang này hiển thị khi có kỳ thi Tiếng Anh sắp diễn ra và đề chưa lên hệ
        thống. Bạn có thể quay về trang chủ để xem các kỳ thi gần nhất hoặc vào
        kho đề thi để luyện ngay.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/" className="btn btn--primary">
          Quay về trang chủ
        </Link>
        <Link href="/kho-de-thi" className="btn btn--outline">
          Vào kho đề thi
        </Link>
      </div>
    </div>
  );
}

function RelatedEvents({
  events,
  currentId,
}: {
  events: Event[];
  currentId?: string;
}) {
  const others = events
    .filter((e) => e.id !== currentId)
    .slice(0, 3);
  if (others.length === 0) return null;
  return (
    <section className="ev-related" aria-labelledby="ev-related-title">
      <h3 id="ev-related-title">Các sự kiện khác</h3>
      <div className="ev-related-grid">
        {others.map((o) => {
          const startIso = o.examStartTime || o.examEndTime;
          const start = new Date(startIso);
          const dateLabel = Number.isNaN(start.getTime())
            ? ""
            : `${String(start.getDate()).padStart(2, "0")}/${String(start.getMonth() + 1).padStart(2, "0")}/${start.getFullYear()}`;
          const diff = dayDiffFromEvent(o, new Date());
          const relLabel = relDayPhrase(diff);
          return (
            <Link
              key={o.id}
              href={`/cho-de?event=${encodeURIComponent(o.id)}`}
              className="ev-related-card"
            >
              <span className="rc-date">{dateLabel}</span>
              {relLabel && <span className="rc-rel">{relLabel}</span>}
              <span className="rc-title">{o.title}</span>
              {typeof o.priority === "number" && (
                <span className="rc-meta">Ưu tiên #{o.priority}</span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
