import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { JsonLd } from "../JsonLd";

describe("JsonLd", () => {
  it("renders a ld+json script whose content parses back to the object", () => {
    const { container } = render(<JsonLd data={{ "@type": "WebSite", name: "istudy" }} />);
    const el = container.querySelector('script[type="application/ld+json"]');
    expect(el).not.toBeNull();
    expect(JSON.parse(el!.innerHTML.replace(/\\u003c/g, "<"))).toEqual({
      "@type": "WebSite",
      name: "istudy",
    });
  });

  it("escapes < to prevent breaking out of the script tag", () => {
    const { container } = render(<JsonLd data={{ name: "a</script>b" }} />);
    const el = container.querySelector('script[type="application/ld+json"]')!;
    expect(el.innerHTML).not.toContain("</script>");
    expect(el.innerHTML).toContain("\\u003c");
  });
});
