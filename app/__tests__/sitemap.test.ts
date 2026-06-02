import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import sitemap from "../sitemap";

const SAMPLE = {
  urls: [
    { loc: "https://aistudy.com.vn/", priority: 1.0 },
    { loc: "https://aistudy.com.vn/kho-de-thi", priority: 0.9 },
    { loc: "https://aistudy.com.vn/de-thi-chi-tiet/vao-10-anh-2026", lastmod: "2026-06-01T00:00:00.000Z", priority: 0.7 },
    { loc: "https://aistudy.com.vn/bai-viet-chi-tiet/thi-hien-tai-don", lastmod: "2026-05-30T00:00:00.000Z", priority: 0.6 },
    { loc: "https://aistudy.com.vn/sach/luyen-thi", priority: 0.5 },
    { loc: "https://aistudy.com.vn/tinh/ha-noi", priority: 0.4 },
    { loc: "https://aistudy.com.vn/mon-hoc/tieng-anh", priority: 0.4 },
    { loc: "https://aistudy.com.vn/nam/2026", priority: 0.4 },
  ],
};

describe("sitemap", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aistudy.com.vn";
    process.env.NEXT_PUBLIC_CMS_URL = "https://h913.aistudy.com.vn";
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps allowed routes and drops hub routes not present on main", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => SAMPLE }));
    const out = await sitemap();
    const urls = out.map((e) => e.url);
    expect(urls).toContain("https://aistudy.com.vn/");
    expect(urls).toContain("https://aistudy.com.vn/de-thi-chi-tiet/vao-10-anh-2026");
    expect(urls).toContain("https://aistudy.com.vn/bai-viet-chi-tiet/thi-hien-tai-don");
    expect(urls.some((u) => u.includes("/sach/"))).toBe(false);
    expect(urls.some((u) => u.includes("/tinh/"))).toBe(false);
    expect(urls.some((u) => u.includes("/mon-hoc/"))).toBe(false);
    expect(urls.some((u) => u.includes("/nam/"))).toBe(false);
  });

  it("rewrites the host to NEXT_PUBLIC_SITE_URL and keeps lastModified", async () => {
    const drifted = { urls: [{ loc: "https://h913.aistudy.com.vn/kho-de-thi", priority: 0.9 }] };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => drifted }));
    const out = await sitemap();
    expect(out[0].url).toBe("https://aistudy.com.vn/kho-de-thi");
  });

  it("falls back to static core routes when the fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    const out = await sitemap();
    const urls = out.map((e) => e.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://aistudy.com.vn/",
        "https://aistudy.com.vn/kho-de-thi",
        "https://aistudy.com.vn/bai-viet",
        "https://aistudy.com.vn/cho-de",
      ]),
    );
  });
});
