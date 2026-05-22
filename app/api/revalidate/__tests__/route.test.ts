// @ts-nocheck -- vitest devDep chưa cài ở istudy-web root (chỉ tồn tại
// trong worktrees). Khi vitest được wire vào package.json, xoá dòng
// @ts-nocheck này.
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

import { POST } from "../route";
import { revalidateTag } from "next/cache";

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.REVALIDATE_SECRET = "test-secret";
  });

  it("reject missing secret header", async () => {
    const req = new Request(
      "http://localhost/api/revalidate?tag=mega-menu-kho-de",
      { method: "POST" },
    );
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("reject wrong secret", async () => {
    const req = new Request(
      "http://localhost/api/revalidate?tag=mega-menu-kho-de",
      {
        method: "POST",
        headers: { "x-secret": "wrong" },
      },
    );
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("reject missing tag param", async () => {
    const req = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: { "x-secret": "test-secret" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("reject tag not in whitelist", async () => {
    const req = new Request(
      "http://localhost/api/revalidate?tag=arbitrary-tag",
      {
        method: "POST",
        headers: { "x-secret": "test-secret" },
      },
    );
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("call revalidateTag for allowed tag", async () => {
    const req = new Request(
      "http://localhost/api/revalidate?tag=mega-menu-kho-de",
      {
        method: "POST",
        headers: { "x-secret": "test-secret" },
      },
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("mega-menu-kho-de");
  });
});
