// @ts-nocheck -- vitest devDep chưa wire vào package.json (xem lib/render/de-thi.test.ts)
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { absoluteCmsUrl, buildQueryForTest, fetchExamBySlug } from "./exams";

describe("buildQuery — examType + yearMax", () => {
  it("include examType param", () => {
    const s = buildQueryForTest({ cat: "vao-10", examType: "thi-thu" });
    expect(s).toContain("examType=thi-thu");
  });

  it("include yearMax param", () => {
    const s = buildQueryForTest({ cat: "vao-10", yearMax: "2021" });
    expect(s).toContain("yearMax=2021");
  });

  it("omit both when undefined", () => {
    const s = buildQueryForTest({ cat: "vao-10" });
    expect(s).not.toContain("examType");
    expect(s).not.toContain("yearMax");
  });
});

describe("buildQuery — existing params still work", () => {
  it("include cat + province + year + sort + limit + offset", () => {
    const s = buildQueryForTest({
      cat: "vao-10",
      province: "ha-noi",
      year: "2025",
      sort: "latest",
      limit: 20,
      offset: 40,
    });
    expect(s).toContain("cat=vao-10");
    expect(s).toContain("province=ha-noi");
    expect(s).toContain("year=2025");
    expect(s).toContain("sort=latest");
    expect(s).toContain("limit=20");
    expect(s).toContain("offset=40");
  });

  it("return empty string when no params", () => {
    const s = buildQueryForTest({});
    expect(s).toBe("");
  });

  it("prefix with ? when params present", () => {
    const s = buildQueryForTest({ cat: "vao-10" });
    expect(s.startsWith("?")).toBe(true);
  });
});

describe('buildQuery deReady', () => {
  it('include deReady=true when set', () => {
    const s = buildQueryForTest({ cat: 'vao-10', deReady: true })
    expect(s).toContain('deReady=true')
  })
  it('include deReady=false when set', () => {
    const s = buildQueryForTest({ cat: 'vao-10', deReady: false })
    expect(s).toContain('deReady=false')
  })
  it('omit deReady when undefined', () => {
    const s = buildQueryForTest({ cat: 'vao-10' })
    expect(s).not.toContain('deReady')
  })
})

describe("absoluteCmsUrl", () => {
  beforeEach(() => vi.stubEnv("NEXT_PUBLIC_CMS_URL", "https://h913.aistudy.com.vn"));
  afterEach(() => vi.unstubAllEnvs());

  it("returns undefined when input is undefined", () => {
    expect(absoluteCmsUrl(undefined)).toBeUndefined();
  });

  it("returns undefined when input is empty string", () => {
    expect(absoluteCmsUrl("")).toBeUndefined();
  });

  it("prefixes cmsBase when url is relative with leading slash", () => {
    expect(absoluteCmsUrl("/api/media/file/foo.pdf")).toBe(
      "https://h913.aistudy.com.vn/api/media/file/foo.pdf",
    );
  });

  it("prefixes cmsBase + slash when url is relative without leading slash", () => {
    expect(absoluteCmsUrl("api/media/file/foo.pdf")).toBe(
      "https://h913.aistudy.com.vn/api/media/file/foo.pdf",
    );
  });

  it("returns absolute https url unchanged", () => {
    expect(absoluteCmsUrl("https://cdn.example.com/foo.pdf")).toBe(
      "https://cdn.example.com/foo.pdf",
    );
  });

  it("returns absolute http url unchanged", () => {
    expect(absoluteCmsUrl("http://cdn.example.com/foo.pdf")).toBe(
      "http://cdn.example.com/foo.pdf",
    );
  });
});

describe("fetchExamBySlug — published-only query", () => {
  beforeEach(() => vi.stubEnv("NEXT_PUBLIC_CMS_URL", "https://cms.example.com"));
  afterEach(() => vi.unstubAllEnvs());

  it("includes where[_status][equals]=published in URL", async () => {
    const calls: string[] = [];
    const origFetch = globalThis.fetch;
    // @ts-expect-error stubbing global fetch for test
    globalThis.fetch = async (url: string) => {
      calls.push(url);
      return new Response(JSON.stringify({ docs: [] }), { status: 200 });
    };
    try {
      await fetchExamBySlug("foo-slug");
    } finally {
      globalThis.fetch = origFetch;
    }
    expect(calls[0]).toContain("where[slug][equals]=foo-slug");
    expect(calls[0]).toContain("where[_status][equals]=published");
  });
});
