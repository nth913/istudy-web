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
 * (missing env, 404, network error) so callers always have data.
 */
export async function fetchActiveEvents(): Promise<ActiveEventsResponse> {
  const base = process.env.NEXT_PUBLIC_CMS_URL;
  if (!base) return mockResponse();
  try {
    const res = await fetch(`${base}/v1/events/active`, {
      // Default to short-lived cache; CMS spec §5 suggests 60s TTL.
      next: { revalidate: 60 },
    });
    if (!res.ok) return mockResponse();
    const data = (await res.json()) as ActiveEventsResponse;
    if (!data || !Array.isArray(data.events)) return mockResponse();
    return data;
  } catch {
    return mockResponse();
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
  return e.examUrl || `/de-thi-chi-tiet/${encodeURIComponent(e.slug || e.id)}`;
}

/** Resolve answer (đáp án) URL — used for `dap-an` state CTA. */
export function answerUrlFor(e: Event): string {
  return e.answerUrl || `/dap-an/${encodeURIComponent(e.slug || e.id)}`;
}

/** Lookup event by id from a response payload. */
export function pickEvent(
  response: ActiveEventsResponse,
  id?: string | null,
): Event | null {
  if (!id) return null;
  return response.events.find((e) => e.id === id) ?? null;
}
