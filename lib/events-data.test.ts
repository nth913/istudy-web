import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchActiveEvents, waitingUrlFor, type Event } from "./events-data";

const base: Event = {
  id: "vao-10-ha-noi-anh-2026",
  slug: "vao-10-ha-noi-anh-2026",
  title: "Vào 10 Hà Nội — Tiếng Anh",
  examEndTime: "2026-05-30T15:00:00+07:00",
};

describe("waitingUrlFor", () => {
  it("points to /de-thi-chi-tiet/<slug> when examRef present", () => {
    const e: Event = { ...base, examRef: { slug: "vao-10-tieng-anh-2026-ha-noi" } };
    expect(waitingUrlFor(e)).toBe("/de-thi-chi-tiet/vao-10-tieng-anh-2026-ha-noi");
  });

  it("falls back to /cho-de when no examRef", () => {
    expect(waitingUrlFor(base)).toBe("/cho-de?event=vao-10-ha-noi-anh-2026");
  });

  it("honors explicit waitingUrl override", () => {
    const e: Event = { ...base, waitingUrl: "/custom" };
    expect(waitingUrlFor(e)).toBe("/custom");
  });
});

describe("fetchActiveEvents fallback (no hardcoded demo event)", () => {
  beforeEach(() => {
    // Silence the expected degraded-path log so test output stays pristine.
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns an empty payload (no popup/hero, no events) when fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const res = await fetchActiveEvents();
    expect(res.events).toEqual([]);
    expect(res.slots.popup ?? null).toBeNull();
    expect(res.slots.hero ?? null).toBeNull();
  });

  it("returns an empty payload on a non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const res = await fetchActiveEvents();
    expect(res.events).toEqual([]);
    expect(res.slots.popup ?? null).toBeNull();
  });

  it("returns an empty payload on a malformed JSON shape", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ foo: 1 }) }),
    );
    const res = await fetchActiveEvents();
    expect(res.events).toEqual([]);
    expect(res.slots.popup ?? null).toBeNull();
  });

  it("never returns the hardcoded vao-10-tphcm-2026 demo event on failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    const res = await fetchActiveEvents();
    expect(res.events.find((e) => e.id === "vao-10-tphcm-2026")).toBeUndefined();
    expect(res.slots.popup).not.toBe("vao-10-tphcm-2026");
  });

  it("passes through a valid ActiveEventsResponse unchanged", async () => {
    const payload = {
      slots: { popup: "ev1", hero: "ev1", megaMenu: {} },
      events: [
        { id: "ev1", slug: "ev1", title: "Real", examEndTime: "2026-06-04T11:30:00+07:00" },
      ],
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload }),
    );
    const res = await fetchActiveEvents();
    expect(res.slots.popup).toBe("ev1");
    expect(res.events).toHaveLength(1);
  });
});
