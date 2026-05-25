// @ts-nocheck -- vitest devDep chưa cài ở istudy-web root (chỉ tồn tại
// trong worktree feat-mega-menu-api). Khi vitest được wire vào package.json,
// xoá dòng @ts-nocheck này.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { detectAnswerFileType, examFromCms, getAllExamSlugs, getExamBySlug, resolvePhase, type ExamMeta } from "./de-thi";

const base: Pick<ExamMeta, "demoMode" | "numCodesReady" | "numCodes"> = {
  demoMode: "ready-multi",
  numCodesReady: 1,
  numCodes: 1,
};

describe("resolvePhase", () => {
  it("returns waiting when demoMode=waiting", () => {
    expect(resolvePhase({ ...base, demoMode: "waiting" })).toBe("waiting");
  });

  it("returns ready-1 when demoMode=ready-1", () => {
    expect(resolvePhase({ ...base, demoMode: "ready-1" })).toBe("ready-1");
  });

  it("returns waiting when numCodesReady=0 (ready-multi)", () => {
    expect(
      resolvePhase({
        ...base,
        demoMode: "ready-multi",
        numCodesReady: 0,
        numCodes: 24,
      }),
    ).toBe("waiting");
  });

  it("coerces ready-multi+numCodes=1 to ready-1 (1 mã đề = đề cũ)", () => {
    expect(
      resolvePhase({
        ...base,
        demoMode: "ready-multi",
        numCodes: 1,
        numCodesReady: 1,
      }),
    ).toBe("ready-1");
  });

  it("returns ready-multi when numCodes>1 + numCodesReady>0", () => {
    expect(
      resolvePhase({
        ...base,
        demoMode: "ready-multi",
        numCodes: 24,
        numCodesReady: 8,
      }),
    ).toBe("ready-multi");
  });
});

const cmsBase = {
  slug: "exam-x",
  title: "Test exam",
  category: "vao-10",
  examType: "chinh-thuc",
  year: "2026",
  views: 0,
  testOnline: false,
  _status: "published" as const,
  createdAt: "2026-05-20T00:00:00.000Z",
  updatedAt: "2026-05-21T00:00:00.000Z",
};

describe("examFromCms — pdf/answer URL extraction", () => {
  beforeEach(() => vi.stubEnv("NEXT_PUBLIC_CMS_URL", "https://h913.aistudy.com.vn"));
  afterEach(() => vi.unstubAllEnvs());

  it("returns absolute pdfUrl + raw pdfFilename when pdfFile is an object", () => {
    const exam = examFromCms({
      ...cmsBase,
      pdfFile: { id: "1", filename: "real đề.pdf", url: "/api/media/file/real%20%C4%91%E1%BB%81.pdf" },
    });
    expect(exam.meta.pdfUrl).toBe(
      "https://h913.aistudy.com.vn/api/media/file/real%20%C4%91%E1%BB%81.pdf",
    );
    expect(exam.meta.pdfFilename).toBe("real đề.pdf");
    expect(exam.meta.pdfEnabled).toBe(true);
    expect(exam.meta.numCodesReady).toBe(1);
    expect(exam.meta.demoMode).toBe("ready-1");
  });

  it("returns undefined URLs when pdfFile/answerFile are absent", () => {
    const exam = examFromCms({ ...cmsBase });
    expect(exam.meta.pdfUrl).toBeUndefined();
    expect(exam.meta.answerUrl).toBeUndefined();
    expect(exam.meta.pdfEnabled).toBe(false);
    expect(exam.meta.numCodesReady).toBe(0);
    expect(exam.meta.demoMode).toBe("waiting");
  });

  it("returns absolute answerUrl when answerFile is an object", () => {
    const exam = examFromCms({
      ...cmsBase,
      answerFile: { id: "2", filename: "answer.pdf", url: "/api/media/file/answer.pdf" },
    });
    expect(exam.meta.answerUrl).toBe("https://h913.aistudy.com.vn/api/media/file/answer.pdf");
    expect(exam.meta.answerFilename).toBe("answer.pdf");
  });

  it("ignores string-id pdfFile (no depth=1 populated)", () => {
    const exam = examFromCms({ ...cmsBase, pdfFile: "some-id-string" });
    expect(exam.meta.pdfUrl).toBeUndefined();
    expect(exam.meta.pdfFilename).toBeUndefined();
  });

  it("propagates updatedAt to meta", () => {
    const exam = examFromCms({ ...cmsBase });
    expect(exam.meta.updatedAt).toBe("2026-05-21T00:00:00.000Z");
  });
});

describe("production resolver — mock removed", () => {
  it("getExamBySlug returns null for legacy mock slugs", () => {
    expect(getExamBySlug("de-mau-thpt-qg-2026-tieng-anh")).toBeNull();
    expect(getExamBySlug("de-thi-thu-thpt-2026-tieng-anh")).toBeNull();
    expect(getExamBySlug("de-thi-thpt-qg-2026-tieng-anh")).toBeNull();
  });

  it("getAllExamSlugs returns empty array", () => {
    expect(getAllExamSlugs()).toEqual([]);
  });
});

describe("examFromCms allowDownload mapping", () => {
  const base = {
    slug: "test-exam",
    title: "Test exam",
    category: "thpt-qg",
    examType: "chinh-thuc",
    year: "2026",
    _status: "published" as const,
    createdAt: "2026-05-24T00:00:00Z",
    updatedAt: "2026-05-24T00:00:00Z",
  };

  it("maps allowDownload=true when CMS field true", () => {
    const exam = examFromCms({ ...base, allowDownload: true } as any);
    expect(exam.meta.allowDownload).toBe(true);
  });

  it("maps allowDownload=false when CMS field false", () => {
    const exam = examFromCms({ ...base, allowDownload: false } as any);
    expect(exam.meta.allowDownload).toBe(false);
  });

  it("defaults allowDownload=true when CMS field undefined (backward compat)", () => {
    const exam = examFromCms(base);
    expect(exam.meta.allowDownload).toBe(true);
  });
});

describe("detectAnswerFileType", () => {
  it("returns 'pdf' when mime is application/pdf", () => {
    expect(detectAnswerFileType("application/pdf", "x.pdf")).toBe("pdf");
  });

  it("returns 'image' when mime starts with image/", () => {
    expect(detectAnswerFileType("image/jpeg", "x.jpg")).toBe("image");
    expect(detectAnswerFileType("image/png", "x.png")).toBe("image");
    expect(detectAnswerFileType("image/webp", "x.webp")).toBe("image");
    expect(detectAnswerFileType("image/gif", "x.gif")).toBe("image");
  });

  it("falls back to extension when mime is null — pdf", () => {
    expect(detectAnswerFileType(null, "answer.pdf")).toBe("pdf");
  });

  it("falls back to extension when mime is null — image (case-insensitive)", () => {
    expect(detectAnswerFileType(null, "answer.JPG")).toBe("image");
    expect(detectAnswerFileType(null, "answer.PNG")).toBe("image");
    expect(detectAnswerFileType(null, "answer.jpeg")).toBe("image");
    expect(detectAnswerFileType(null, "answer.webp")).toBe("image");
  });

  it("returns null when both mime and filename give no signal", () => {
    expect(detectAnswerFileType(null, null)).toBeNull();
    expect(detectAnswerFileType(null, "answer.bin")).toBeNull();
    expect(detectAnswerFileType("application/octet-stream", "answer.bin")).toBeNull();
  });

  it("prefers mime over extension when both present", () => {
    expect(detectAnswerFileType("image/jpeg", "x.pdf")).toBe("image");
    expect(detectAnswerFileType("application/pdf", "x.jpg")).toBe("pdf");
  });
});
