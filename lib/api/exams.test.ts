// @ts-nocheck -- vitest devDep chưa wire vào package.json (xem lib/render/de-thi.test.ts)
import { describe, it, expect } from "vitest";
import { buildQueryForTest } from "./exams";

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
