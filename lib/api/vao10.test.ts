import { describe, it, expect, vi, afterEach } from "vitest";
import { mergeVao10, hrefForMerged, fetchVao10Overlay } from "./vao10";
import type { Vao10Province } from "@/lib/vao10/provinces";

const PROV: Vao10Province[] = [
  { name: "Hà Nội", key: "ha noi", q: 40, time: "60 phút", hot: true },
  { name: "Quảng Ninh", q: 40, time: "60 phút" },
  { name: "Đồng Nai", q: 40, time: "60 phút" },
];

describe("mergeVao10 — overlay slug-driven", () => {
  it("tỉnh có slug (overlay) → status ready + slug + thumbnailUrl", () => {
    const merged = mergeVao10(PROV, [
      { key: "ha noi", slug: "vao-10-ha-noi-2026", thumbnailUrl: "https://cdn/x.webp", examTitle: "Đề HN" },
    ]);
    const hn = merged.find((m) => m.name === "Hà Nội")!;
    expect(hn.status).toBe("ready");
    expect(hn.slug).toBe("vao-10-ha-noi-2026");
    expect(hn.thumbnailUrl).toBe("https://cdn/x.webp");
  });

  it("tỉnh KHÔNG có overlay → status updating, slug/thumbnail null", () => {
    const merged = mergeVao10(PROV, []);
    for (const m of merged) {
      expect(m.status).toBe("updating");
      expect(m.slug).toBeNull();
      expect(m.thumbnailUrl).toBeNull();
    }
  });

  it("overlay có row nhưng slug null (đề chưa publish) → vẫn updating", () => {
    const merged = mergeVao10(PROV, [
      { key: "dong nai", slug: null, thumbnailUrl: "https://cdn/dn.webp", examTitle: null },
    ]);
    const dn = merged.find((m) => m.name === "Đồng Nai")!;
    expect(dn.status).toBe("updating");
    expect(dn.slug).toBeNull();
    // thumbnail override vẫn áp dụng dù chưa có đề
    expect(dn.thumbnailUrl).toBe("https://cdn/dn.webp");
  });

  it("merge khớp theo norm(name) ↔ key (bỏ dấu)", () => {
    const merged = mergeVao10([{ name: "Đà Nẵng", q: 40, time: "60 phút" }], [
      { key: "da nang", slug: "vao-10-da-nang-2026", thumbnailUrl: null, examTitle: "x" },
    ]);
    expect(merged[0].status).toBe("ready");
    expect(merged[0].slug).toBe("vao-10-da-nang-2026");
  });

  it("giữ nguyên thứ tự + số lượng tỉnh đầu vào", () => {
    const merged = mergeVao10(PROV, []);
    expect(merged.map((m) => m.name)).toEqual(["Hà Nội", "Quảng Ninh", "Đồng Nai"]);
  });
});

describe("hrefForMerged", () => {
  it("ready → /de-thi-chi-tiet/<slug>", () => {
    const [p] = mergeVao10([PROV[0]], [{ key: "ha noi", slug: "s1", thumbnailUrl: null, examTitle: null }]);
    expect(hrefForMerged(p)).toBe("/de-thi-chi-tiet/s1");
  });
  it("updating → null (không click được)", () => {
    const [p] = mergeVao10([PROV[1]], []);
    expect(hrefForMerged(p)).toBeNull();
  });
});

describe("fetchVao10Overlay — graceful", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("fetch OK → trả items", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items: [{ key: "ha noi", slug: "s", thumbnailUrl: null, examTitle: null }], updatedAt: "T" }),
      }),
    );
    const out = await fetchVao10Overlay();
    expect(out.items).toHaveLength(1);
    expect(out.items[0].key).toBe("ha noi");
  });

  it("status không OK → rỗng", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }));
    const out = await fetchVao10Overlay();
    expect(out.items).toEqual([]);
  });

  it("fetch throw (CMS không reachable) → rỗng", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));
    const out = await fetchVao10Overlay();
    expect(out.items).toEqual([]);
  });
});
