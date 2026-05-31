import { describe, it, expect } from "vitest";
import { waitingUrlFor, type Event } from "./events-data";

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
