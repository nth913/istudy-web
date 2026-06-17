import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RichText } from "./lexical";

const txt = (text: string) => ({
  type: "text",
  text,
  format: 0,
  mode: "normal",
  style: "",
  detail: 0,
  version: 1,
});

const para = (...children: object[]) => ({
  type: "paragraph",
  children,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
});

const rootOf = (...children: object[]) =>
  ({ type: "root", children, format: "", indent: 0, version: 1, direction: "ltr" }) as never;

const uploadNode = (value: object) => ({
  type: "upload",
  version: 1,
  format: "",
  indent: 0,
  direction: null,
  value,
  relationTo: "media",
});

describe("RichText — upload node", () => {
  it("image mimeType renders <img> inside <figure>", () => {
    const root = rootOf(
      uploadNode({
        url: "https://cdn.example.com/photo.jpg",
        mimeType: "image/jpeg",
        alt: "Ảnh minh họa",
        width: 800,
        height: 600,
      }),
    );
    const { container } = render(<RichText root={root} />);
    const figure = container.querySelector("figure.article-img");
    expect(figure).toBeTruthy();
    const img = figure!.querySelector("img");
    expect(img).toBeTruthy();
    expect(img!.getAttribute("src")).toBe("https://cdn.example.com/photo.jpg");
  });

  it("upload node with no URL renders nothing", () => {
    const root = rootOf(
      uploadNode({
        url: "",
        mimeType: "image/png",
      }),
    );
    const { container } = render(<RichText root={root} />);
    expect(container.querySelector("figure")).toBeNull();
    expect(container.querySelector("img")).toBeNull();
  });

  it("upload node with PDF mimeType renders nothing", () => {
    const root = rootOf(
      uploadNode({
        url: "https://cdn.example.com/doc.pdf",
        mimeType: "application/pdf",
      }),
    );
    const { container } = render(<RichText root={root} />);
    expect(container.querySelector("figure")).toBeNull();
    expect(container.querySelector("img")).toBeNull();
  });

  it("upload node with alt text renders <figcaption>", () => {
    const root = rootOf(
      uploadNode({
        url: "https://cdn.example.com/photo.webp",
        mimeType: "image/webp",
        alt: "Chú thích ảnh",
      }),
    );
    const { container } = render(<RichText root={root} />);
    const figcaption = container.querySelector("figcaption");
    expect(figcaption).toBeTruthy();
    expect(figcaption!.textContent).toBe("Chú thích ảnh");
  });

  it("caption field takes priority over alt for figcaption", () => {
    const root = rootOf(
      uploadNode({
        url: "https://cdn.example.com/photo.jpg",
        mimeType: "image/jpeg",
        caption: "Chú thích chính",
        alt: "Alt fallback",
      }),
    );
    const { container } = render(<RichText root={root} />);
    const figcaption = container.querySelector("figcaption");
    expect(figcaption).toBeTruthy();
    expect(figcaption!.textContent).toBe("Chú thích chính");
  });

  it("upload node with no alt renders no figcaption", () => {
    const root = rootOf(
      uploadNode({
        url: "https://cdn.example.com/photo.jpg",
        mimeType: "image/jpeg",
      }),
    );
    const { container } = render(<RichText root={root} />);
    expect(container.querySelector("figcaption")).toBeNull();
    expect(container.querySelector("img")).toBeTruthy();
  });
});

describe("RichText — link node", () => {
  it("đọc url từ fields.url (chuẩn Payload Lexical — link tạo từ admin editor / seed)", () => {
    const root = rootOf(
      para({
        type: "link",
        version: 1,
        fields: { linkType: "custom", url: "/de-chinh-thuc-vao-10-2026", newTab: false },
        children: [txt("Xem đề chính thức 34 tỉnh thành →")],
      }),
    );
    const { container } = render(<RichText root={root} />);
    const a = container.querySelector("a");
    expect(a).toBeTruthy();
    expect(a!.getAttribute("href")).toBe("/de-chinh-thuc-vao-10-2026");
    expect(a!.textContent).toContain("Xem đề chính thức 34 tỉnh thành");
  });

  it("vẫn đọc url top-level (backward compat shape cũ)", () => {
    const root = rootOf(
      para({ type: "link", version: 1, url: "/kho-de-thi", children: [txt("Kho đề")] }),
    );
    const { container } = render(<RichText root={root} />);
    expect(container.querySelector("a")!.getAttribute("href")).toBe("/kho-de-thi");
  });

  it("thiếu url mọi chỗ → href='#' (không crash)", () => {
    const root = rootOf(para({ type: "link", version: 1, children: [txt("x")] }));
    const { container } = render(<RichText root={root} />);
    expect(container.querySelector("a")!.getAttribute("href")).toBe("#");
  });
});
