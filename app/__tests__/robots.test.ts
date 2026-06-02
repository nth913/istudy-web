import { describe, it, expect, beforeEach } from "vitest";
import robots from "../robots";

describe("robots", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aistudy.com.vn";
  });

  it("allows / and disallows non-indexable routes", () => {
    const r = robots();
    const rule = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rule.allow).toBe("/");
    expect(rule.disallow).toEqual(
      expect.arrayContaining(["/ket-qua", "/lam-bai", "/coming-soon", "/api/", "/print/"]),
    );
  });

  it("points to the sitemap and host on the canonical domain", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://aistudy.com.vn/sitemap.xml");
    expect(r.host).toBe("https://aistudy.com.vn");
  });
});
