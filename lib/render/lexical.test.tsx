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
