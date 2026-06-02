import { describe, it, expect, beforeEach } from "vitest";
import {
  websiteSchema,
  organizationSchema,
  breadcrumbSchema,
  articleSchema,
  learningResourceSchema,
} from "./jsonld";

describe("jsonld builders", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aistudy.com.vn";
  });

  it("websiteSchema has WebSite type + SearchAction with query-input", () => {
    const s = websiteSchema() as any;
    expect(s["@context"]).toBe("https://schema.org");
    expect(s["@type"]).toBe("WebSite");
    expect(s.potentialAction["@type"]).toBe("SearchAction");
    expect(s.potentialAction.target.urlTemplate).toBe(
      "https://aistudy.com.vn/kho-de-thi?q={search_term_string}",
    );
    expect(s.potentialAction["query-input"]).toContain("search_term_string");
  });

  it("organizationSchema has Organization type + absolute logo", () => {
    const s = organizationSchema() as any;
    expect(s["@type"]).toBe("Organization");
    expect(s.logo).toMatch(/^https:\/\/aistudy\.com\.vn\//);
  });

  it("breadcrumbSchema numbers positions from 1 and absolutises items", () => {
    const s = breadcrumbSchema([
      { name: "Trang chủ", url: "/" },
      { name: "Kho đề thi", url: "/kho-de-thi" },
    ]) as any;
    expect(s["@type"]).toBe("BreadcrumbList");
    expect(s.itemListElement).toHaveLength(2);
    expect(s.itemListElement[0].position).toBe(1);
    expect(s.itemListElement[1].item).toBe("https://aistudy.com.vn/kho-de-thi");
  });

  it("articleSchema includes headline, datePublished, author, publisher", () => {
    const s = articleSchema({
      title: "Thì hiện tại đơn",
      url: "/bai-viet-chi-tiet/thi-hien-tai-don",
      description: "Ngữ pháp cơ bản",
      datePublished: "2026-05-30T00:00:00.000Z",
      authorName: "istudy Team",
    }) as any;
    expect(s["@type"]).toBe("Article");
    expect(s.headline).toBe("Thì hiện tại đơn");
    expect(s.url).toBe("https://aistudy.com.vn/bai-viet-chi-tiet/thi-hien-tai-don");
    expect(s.datePublished).toBe("2026-05-30T00:00:00.000Z");
    expect(s.author.name).toBe("istudy Team");
    expect(s.publisher["@type"]).toBe("Organization");
  });

  it("articleSchema absolutizes a relative image", () => {
    const s = articleSchema({ title: "X", url: "/bai-viet-chi-tiet/x", image: "/og/x.webp" }) as any;
    expect(s.image).toBe("https://aistudy.com.vn/og/x.webp");
  });

  it("articleSchema omits optional fields cleanly when absent", () => {
    const s = articleSchema({ title: "X", url: "/bai-viet-chi-tiet/x" }) as any;
    expect("datePublished" in s).toBe(false);
    expect("image" in s).toBe(false);
    expect(s.author.name).toBe("istudy");
  });

  it("learningResourceSchema marks an exam resource, free, in Vietnamese", () => {
    const s = learningResourceSchema({
      title: "Đề Tiếng Anh vào 10 Hà Nội 2026",
      url: "/de-thi-chi-tiet/vao-10-anh-2026",
      subject: "Tiếng Anh",
    }) as any;
    expect(s["@type"]).toBe("LearningResource");
    expect(s.learningResourceType).toBe("Exam");
    expect(s.inLanguage).toBe("vi");
    expect(s.isAccessibleForFree).toBe(true);
    expect(s.about).toBe("Tiếng Anh");
    expect(s.url).toBe("https://aistudy.com.vn/de-thi-chi-tiet/vao-10-anh-2026");
  });
});
