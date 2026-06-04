import { describe, it, expect, vi, beforeEach } from "vitest";

// Override mock global (vitest.setup.ts không có redirect/notFound).
// LƯU Ý: implementation phải INLINE trong factory — wrapper qua vi.fn const
// bên ngoài bị quirk hoisting của vitest làm mất arg (đã debug 2026-06-04).
const redirectCalls: unknown[][] = [];
vi.mock("next/navigation", () => ({
  redirect: (...args: unknown[]) => {
    redirectCalls.push(args);
    throw new Error(`NEXT_REDIRECT:${String(args[0])}`);
  },
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

import { POST_REDIRECTS } from "@/app/(site)/bai-viet-chi-tiet/post-redirects";
import Page from "@/app/(site)/bai-viet-chi-tiet/[slug]/page";

describe("POST_REDIRECTS map", () => {
  it("bài vao10 → /de-chinh-thuc-vao-10-2026", () => {
    expect(POST_REDIRECTS["de-chinh-thuc-vao-10-2026-tieng-anh"]).toBe(
      "/de-chinh-thuc-vao-10-2026",
    );
  });

  it("mọi đích đều là internal path (bắt đầu bằng /)", () => {
    for (const target of Object.values(POST_REDIRECTS)) {
      expect(target.startsWith("/")).toBe(true);
    }
  });
});

describe("trang bài viết — slug nằm trong map", () => {
  beforeEach(() => {
    redirectCalls.length = 0;
  });

  it("redirect ngay sang trang đích, KHÔNG fetch CMS", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    await expect(
      Page({ params: Promise.resolve({ slug: "de-chinh-thuc-vao-10-2026-tieng-anh" }) }),
    ).rejects.toThrow("NEXT_REDIRECT:/de-chinh-thuc-vao-10-2026");

    expect(redirectCalls).toEqual([["/de-chinh-thuc-vao-10-2026"]]);
    expect(fetchSpy).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
