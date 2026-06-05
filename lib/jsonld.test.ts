import { describe, it, expect, beforeEach } from "vitest";
import {
  websiteSchema,
  organizationSchema,
  breadcrumbSchema,
  articleSchema,
  learningResourceSchema,
  itemListSchema,
} from "./jsonld";
import type { Vao10MergedProvince } from "./api/vao10";

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

describe("itemListSchema", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aistudy.com.vn";
  });

  const mockProvinces: Vao10MergedProvince[] = [
    {
      name: "Hà Nội",
      q: 40,
      time: "60 phút",
      hot: true,
      slug: "vao-10-anh-ha-noi-2026",
      thumbnailUrl: null,
      status: "ready",
    },
    {
      name: "Hải Phòng",
      q: 40,
      time: "60 phút",
      slug: null,
      thumbnailUrl: null,
      status: "updating",
    },
  ];

  it("returns @type ItemList with correct numberOfItems", () => {
    const s = itemListSchema(mockProvinces) as any;
    expect(s["@context"]).toBe("https://schema.org");
    expect(s["@type"]).toBe("ItemList");
    expect(s.numberOfItems).toBe(2);
  });

  it("positions start at 1", () => {
    const s = itemListSchema(mockProvinces) as any;
    expect(s.itemListElement[0].position).toBe(1);
    expect(s.itemListElement[1].position).toBe(2);
  });

  it("ready province ListItem has absolute url", () => {
    const s = itemListSchema(mockProvinces) as any;
    const first = s.itemListElement[0];
    expect(first.url).toBe("https://aistudy.com.vn/de-thi-chi-tiet/vao-10-anh-ha-noi-2026");
    expect(first.item.url).toBe("https://aistudy.com.vn/de-thi-chi-tiet/vao-10-anh-ha-noi-2026");
  });

  it("updating province ListItem has no url field", () => {
    const s = itemListSchema(mockProvinces) as any;
    const second = s.itemListElement[1];
    expect("url" in second).toBe(false);
    expect("url" in second.item).toBe(false);
  });

  it("item.name includes province name", () => {
    const s = itemListSchema(mockProvinces) as any;
    expect(s.itemListElement[0].name).toContain("Hà Nội");
    expect(s.itemListElement[1].name).toContain("Hải Phòng");
  });

  it("item is LearningResource Exam, free, Vietnamese", () => {
    const s = itemListSchema(mockProvinces) as any;
    const lr = s.itemListElement[0].item;
    expect(lr["@type"]).toBe("LearningResource");
    expect(lr.learningResourceType).toBe("Exam");
    expect(lr.inLanguage).toBe("vi");
    expect(lr.isAccessibleForFree).toBe(true);
  });
});
