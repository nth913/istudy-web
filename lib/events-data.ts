/**
 * Events data layer for istudy-web.
 *
 * Source of truth for "exam events" (kỳ thi) used by:
 *  - Hero countdown (homepage)
 *  - Floating EventPopup (every page)
 *  - Mega menu promo slot (per submenu)
 *
 * Per cms-events-spec.md §5, the CMS picks WHICH event lands in which slot
 * (hero / popup / megamenuPromos). FE never sorts by priority or computes
 * isActive — it just reads slots + renders.
 *
 * When the CMS endpoint is unavailable (404, network error, no env), this
 * module returns a deterministic mock payload so the popup keeps working
 * locally and in preview.
 */

export type EventState = 'pre' | 'de' | 'dap-an';

export interface Event {
  /** Stable kebab-case id used in URLs (?event=<id>). */
  id: string;
  /** Slug for SEO-friendly URLs (separate from `id` so CMS can pick a route). */
  slug: string;
  /** Long human-readable name (free text). */
  title: string;
  /** Optional short label for tight slots (mega menu chips, popup name). */
  short?: string;
  /** ISO-8601 with +07:00 offset, e.g. "2026-06-04T11:30:00+07:00". */
  examEndTime: string;
  /** ISO-8601 start time (optional, defaults to 2 hours before examEndTime). */
  examStartTime?: string;
  /** One of the submenu enums from cms-events-spec.md §3. */
  submenu?: string;
  /** Explicit flag — đề đã được đăng lên hệ thống. */
  deReady?: boolean;
  /** Explicit flag — đáp án (kèm đề) đã có. Ưu tiên cao hơn deReady. */
  dapAnReady?: boolean;
  /** BE-internal hint; FE ignores when computing slots. */
  priority?: number;
  /** Custom eyebrow text for hero card; falls back to state-based default. */
  heroEyebrow?: string;
  /** Optional deep-link overrides. */
  waitingUrl?: string;
  examUrl?: string;
  answerUrl?: string;
}

export interface EventSlots {
  /** Event id to render in homepage hero countdown. */
  hero?: string | null;
  /** Event id to render in floating popup. */
  popup?: string | null;
  /** Map submenu -> event id for mega-menu promo overrides. */
  megaMenu?: Record<string, string>;
}

export interface ActiveEventsResponse {
  slots: EventSlots;
  events: Event[];
  /** ISO-8601 timestamp of when the BE produced this payload. */
  updatedAt?: string;
}

/**
 * Deterministic mock payload — keeps the EventPopup useful in dev/preview
 * even when the CMS API is offline.
 *
 * Today's "feature event" per spec: Đề minh hoạ vào lớp 10 TPHCM 2026 môn Anh.
 */
function mockResponse(): ActiveEventsResponse {
  const ev: Event = {
    id: 'vao-10-tphcm-2026',
    slug: 'vao-10-tphcm-2026',
    title: 'Đề minh hoạ vào lớp 10 TPHCM 2026 môn Anh',
    short: 'Đề minh hoạ vào 10 TPHCM 2026',
    examEndTime: '2026-06-04T11:30:00+07:00',
    examStartTime: '2026-06-04T09:30:00+07:00',
    submenu: 'vao-10',
    deReady: false,
    dapAnReady: false,
    priority: 1,
    heroEyebrow: 'Sự kiện sắp diễn ra',
  };
  return {
    slots: {
      hero: ev.id,
      popup: ev.id,
      megaMenu: { 'vao-10': ev.id },
    },
    events: [ev],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Fetch active events from CMS. Returns mock payload on any failure
 * (missing env, 404, network error, abort) so callers always have data.
 *
 * Calls the new MB1 endpoint `GET /api/events/active?surface=<surface>` which
 * returns either `{ slots, events, updatedAt }` directly (preferred) or a
 * `{ docs: Event[] }` shape — we accept both and normalise to
 * `ActiveEventsResponse` so existing consumers (hero, popup, mega menu)
 * keep working without changes.
 */
export async function fetchActiveEvents(
  surface: string = "header-mega",
): Promise<ActiveEventsResponse> {
  const base = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3131";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `${base}/api/events/active?surface=${encodeURIComponent(surface)}`,
      {
        signal: controller.signal,
        // Default to 5-min cache — events change rarely, popup latency matters.
        next: { revalidate: 300 },
      },
    );
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = (await res.json()) as
      | ActiveEventsResponse
      | { docs?: Event[] };
    // New `{ docs }` shape — wrap into ActiveEventsResponse with a single
    // surface slot pointing at the first event so downstream pickers work.
    if (data && Array.isArray((data as { docs?: Event[] }).docs)) {
      const events = (data as { docs: Event[] }).docs;
      const first = events[0];
      return {
        slots: first
          ? { hero: first.id, popup: first.id, megaMenu: {} }
          : { megaMenu: {} },
        events,
        updatedAt: new Date().toISOString(),
      };
    }
    if (
      data &&
      Array.isArray((data as ActiveEventsResponse).events)
    ) {
      return data as ActiveEventsResponse;
    }
    return mockResponse();
  } catch (err) {
    console.warn("[fetchActiveEvents] fallback to mock", err);
    return mockResponse();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Compute the event's content state from explicit flags + time-based
 * fallback per cms-events-spec.md §1.1:
 *   1. dapAnReady → 'dap-an'
 *   2. deReady → 'de'
 *   3. now < examEndTime → 'pre'
 *   4. now - examEndTime ≥ 4h → 'dap-an'
 *   5. now - examEndTime ≥ 30min → 'de'
 *   6. else → 'pre'
 */
export function computeEventState(e: Event, now: Date): EventState {
  if (e.dapAnReady) return 'dap-an';
  if (e.deReady) return 'de';
  const endMs = new Date(e.examEndTime).getTime();
  if (Number.isNaN(endMs)) return 'pre';
  const sinceEnd = now.getTime() - endMs;
  if (sinceEnd < 0) return 'pre';
  if (sinceEnd >= 4 * 3600_000) return 'dap-an';
  if (sinceEnd >= 30 * 60_000) return 'de';
  return 'pre';
}

/** Resolve waiting URL — used for `pre` state CTA. */
export function waitingUrlFor(e: Event): string {
  return e.waitingUrl || `/cho-de?event=${encodeURIComponent(e.id)}`;
}

/** Resolve exam (đề thi) URL — used for `de` state CTA. */
export function examUrlFor(e: Event): string {
  return e.examUrl || "/de-thi-chi-tiet";
}

/** Resolve answer (đáp án) URL — used for `dap-an` state CTA. */
export function answerUrlFor(e: Event): string {
  return e.answerUrl || "/dap-an";
}

/** Lookup event by id from a response payload. */
export function pickEvent(
  response: ActiveEventsResponse,
  id?: string | null,
): Event | null {
  if (!id) return null;
  return response.events.find((e) => e.id === id) ?? null;
}

/**
 * Compute day diff (rounded) between an event's exam date and `now`.
 * Negative = past, 0 = today (same calendar day), positive = future.
 *
 * Uses the +07:00 server timezone implicit in `examEndTime`.
 */
export function dayDiffFromEvent(e: Event, now: Date): number {
  const endMs = new Date(e.examEndTime).getTime();
  if (Number.isNaN(endMs)) return 0;
  // Anchor to the calendar-day start of the event in +07:00.
  const eventDate = new Date(e.examEndTime);
  const eventDayStart = new Date(
    Date.UTC(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate())
  ).getTime();
  const nowDayStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  ).getTime();
  return Math.round((eventDayStart - nowDayStart) / 86400000);
}

/**
 * Mega-menu rule (port of design v2 events.js renderEventCard guard):
 *
 *   "Chỉ hiển thị event card ở mega menu khi event đang diễn ra ĐÚNG hôm nay
 *    (dayDiff === 0). Ngược lại fall back về promo mặc định — event sắp tới /
 *    đã qua vẫn xuất hiện ở các surface khác (hero, popup) nhưng KHÔNG chiếm
 *    slot này."
 *
 * BE override path: if `slots.megaMenu[submenu]` explicitly assigns an event
 * id (regardless of date), render that event card. This lets CMS pin a card
 * for marketing days even when the calendar diff is not zero.
 *
 * Returns the Event to render, or null if the slot should fall back to promo.
 */
export function pickMegaMenuEvent(
  response: ActiveEventsResponse,
  submenuId: string,
  now: Date = new Date(),
): Event | null {
  if (!submenuId) return null;
  const explicitId = response.slots?.megaMenu?.[submenuId];
  if (explicitId) {
    return pickEvent(response, explicitId);
  }
  // No BE override → only render when an event for this submenu is today.
  const candidate = response.events.find((e) => e.submenu === submenuId);
  if (!candidate) return null;
  if (Math.abs(dayDiffFromEvent(candidate, now)) === 0) return candidate;
  return null;
}

/**
 * Compact phrase used for event-card eyebrow text.
 */
export function relDayPhrase(diff: number): string {
  if (diff === 0) return "Diễn ra hôm nay";
  if (diff === 1) return "Diễn ra ngày mai";
  if (diff === -1) return "Đã diễn ra hôm qua";
  if (diff > 1) return `Còn ${diff} ngày`;
  return `Đã ${Math.abs(diff)} ngày trước`;
}

/**
 * Format an Event's exam date as `dd/mm/yyyy` (server TZ +07:00).
 */
export function formatEventDate(e: Event): string {
  const d = new Date(e.examEndTime);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
