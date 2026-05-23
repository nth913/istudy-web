// @ts-nocheck -- vitest devDep chưa cài ở istudy-web root (chỉ tồn tại
// trong worktrees). Khi vitest được wire vào package.json, xoá dòng
// @ts-nocheck này.
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

import { POST } from "../route";
import { revalidateTag, revalidatePath } from "next/cache";

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.REVALIDATE_SECRET = "test-secret";
  });

  // --- Tag mode (exams + mega menu) ---
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
      { method: "POST", headers: { "x-secret": "wrong" } },
    );
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("reject neither tag nor paths", async () => {
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
      { method: "POST", headers: { "x-secret": "test-secret" } },
    );
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("call revalidateTag for allowed tag (x-secret header)", async () => {
    const req = new Request(
      "http://localhost/api/revalidate?tag=mega-menu-kho-de",
      { method: "POST", headers: { "x-secret": "test-secret" } },
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("mega-menu-kho-de");
  });

  // --- Path mode (posts legacy contract) ---
  it("call revalidatePath for allowed paths (x-revalidate-secret header)", async () => {
    const req = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: {
        "x-revalidate-secret": "test-secret",
        "content-type": "application/json",
      },
      body: JSON.stringify({ paths: ["/bai-viet", "/bai-viet-chi-tiet/abc"] }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidatePath).toHaveBeenCalledWith("/bai-viet");
    expect(revalidatePath).toHaveBeenCalledWith("/bai-viet-chi-tiet/abc");
  });

  it("reject paths outside whitelist", async () => {
    const req = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: {
        "x-revalidate-secret": "test-secret",
        "content-type": "application/json",
      },
      body: JSON.stringify({ paths: ["/admin", "/api/secret"] }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("mix allowed + rejected paths returns accepted list", async () => {
    const req = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: {
        "x-revalidate-secret": "test-secret",
        "content-type": "application/json",
      },
      body: JSON.stringify({ paths: ["/bai-viet", "/admin"] }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidatePath).toHaveBeenCalledWith("/bai-viet");
    expect(revalidatePath).not.toHaveBeenCalledWith("/admin");
    const body = await res.json();
    expect(body.rejected).toContain("/admin");
  });
});
