// @ts-nocheck -- vitest devDep chưa cài ở istudy-web root (chỉ tồn tại
// trong worktree feat-mega-menu-api). Khi vitest được wire vào package.json,
// xoá dòng @ts-nocheck này.
import { describe, it, expect } from "vitest";
import { resolvePhase, type ExamMeta } from "./de-thi";

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
