import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchRelatedExams } from "../exams";

const ITEMS = {
  items: [
    { id: "1", slug: "vao-10-anh-2026", title: "current", category: "vao-10", examType: "chinh-thuc", year: "2026", createdAt: "x" },
    { id: "2", slug: "vao-10-anh-2025", title: "a", category: "vao-10", examType: "chinh-thuc", year: "2025", createdAt: "x" },
    { id: "3", slug: "vao-10-anh-2024", title: "b", category: "vao-10", examType: "chinh-thuc", year: "2024", createdAt: "x" },
  ],
  total: 3, limit: 7, offset: 0,
};

describe("fetchRelatedExams", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_CMS_URL = "https://h913.aistudy.com.vn";
  });
  afterEach(() => vi.unstubAllGlobals());

  it("excludes the current slug and caps the count", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ITEMS }));
    const out = await fetchRelatedExams("vao-10", "vao-10-anh-2026", 6);
    expect(out.find((e) => e.slug === "vao-10-anh-2026")).toBeUndefined();
    expect(out.length).toBe(2);
  });

  it("returns [] on fetch failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    const out = await fetchRelatedExams("vao-10", "x", 6);
    expect(out).toEqual([]);
  });
});
