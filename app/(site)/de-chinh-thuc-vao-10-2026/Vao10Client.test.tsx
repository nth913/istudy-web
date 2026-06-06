import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Vao10Client } from "./Vao10Client";
import { VAO10_PROVINCES, norm } from "@/lib/vao10/provinces";
import { mergeVao10 } from "@/lib/api/vao10";

describe("Vao10Client — render y hệt design + status slug-driven", () => {
  it("CMS rỗng → đủ 34 tile, tất cả 'Đang cập nhật ^^', không có link đề + dùng thumb design", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, []);
    const { container } = render(<Vao10Client provinces={provinces} />);

    // đủ 34 tile
    expect(container.querySelectorAll(".D-tile")).toHaveLength(34);
    // mọi tile updating → không link sang trang đề
    expect(container.querySelectorAll('a[href^="/de-thi-chi-tiet/"]')).toHaveLength(0);
    // status "Đang cập nhật ^^" hiện diện
    expect(screen.getAllByText("Đang cập nhật ^^").length).toBeGreaterThanOrEqual(34);
    // thumbnail mặc định (design) — phải là CON TRỰC TIẾP của .D-tile-thumb (đúng layout design)
    expect(container.querySelectorAll(".D-tile-thumb > .thumb, .D-tile-thumb > .pthumb").length).toBe(34);
    // hero đếm 0/34
    expect(screen.getByText(/0\/34 tỉnh đã có đề/)).toBeTruthy();
  });

  it("tỉnh có slug → render link /de-thi-chi-tiet/<slug>, không 'Đang cập nhật'", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, [
      { key: norm("Hà Nội"), slug: "vao-10-ha-noi-2026", thumbnailUrl: null, examTitle: "Đề HN 2026" },
    ]);
    const { container } = render(<Vao10Client provinces={provinces} />);
    const link = container.querySelector('a[href="/de-thi-chi-tiet/vao-10-ha-noi-2026"]');
    expect(link).toBeTruthy();
    expect(link!.textContent).toContain("Hà Nội");
    // caption meta của tile ready
    expect(link!.textContent).toContain("Đề 2026");
    // hero đếm 1/34
    expect(screen.getByText(/1\/34 tỉnh đã có đề/)).toBeTruthy();
  });

  it("tỉnh có thumbnail override (CMS) → render <img class=v10-thumb-img>", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, [
      { key: norm("Đà Nẵng"), slug: "vao-10-da-nang-2026", thumbnailUrl: "https://cdn/dn.webp", examTitle: "x" },
    ]);
    const { container } = render(<Vao10Client provinces={provinces} />);
    const img = container.querySelector("img.v10-thumb-img") as HTMLImageElement | null;
    expect(img).toBeTruthy();
    expect(img!.src).toContain("https://cdn/dn.webp");
  });

  it("thanh A–Z: chữ có tỉnh → .on, chữ trống → .off", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, []);
    const { container } = render(<Vao10Client provinces={provinces} />);
    const rail = container.querySelector(".D-rail")!;
    expect(rail.querySelectorAll("a.on").length).toBeGreaterThan(0);
    // 'A' (An Giang) phải .on
    const aLink = Array.from(rail.querySelectorAll("a.on")).find((a) => a.textContent === "A");
    expect(aLink).toBeTruthy();
    expect(aLink!.getAttribute("href")).toBe("#dz-A");
  });

  it("tìm kiếm offline: gõ 'ha noi' → chỉ tỉnh khớp hiện, còn lại display:none", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, []);
    const { container } = render(<Vao10Client provinces={provinces} />);
    const input = container.querySelector('input[type="search"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "ha noi" } });

    const tiles = Array.from(container.querySelectorAll(".D-tile")) as HTMLElement[];
    const visible = tiles.filter((t) => t.style.display !== "none");
    // chỉ Hà Nội khớp "ha noi"
    expect(visible).toHaveLength(1);
    expect(visible[0].getAttribute("data-prov")).toBe("ha noi");
    // rail ẩn khi đang tìm
    const rail = container.querySelector(".D-rail") as HTMLElement;
    expect(rail.style.display).toBe("none");
  });

  it("tìm kiếm không khớp → hiện empty state", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, []);
    const { container } = render(<Vao10Client provinces={provinces} />);
    const input = container.querySelector('input[type="search"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "zzzz" } });
    const empty = container.querySelector(".v10-empty") as HTMLElement;
    expect(empty.hidden).toBe(false);
  });
});

describe("Vao10Client — config panel", () => {
  it("renders 🎨 toggle button", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, []);
    render(<Vao10Client provinces={provinces} />);
    expect(screen.getByRole("button", { name: /bảng chỉnh màu/i })).toBeTruthy();
  });

  it("panel hidden by default; visible after toggle click", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, []);
    const { container } = render(<Vao10Client provinces={provinces} />);
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /bảng chỉnh màu/i }));
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it("close button hides panel", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, []);
    const { container } = render(<Vao10Client provinces={provinces} />);
    fireEvent.click(screen.getByRole("button", { name: /bảng chỉnh màu/i }));
    expect(container.querySelector('[role="dialog"]')).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /đóng/i }));
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it(".v10p applies DEFAULT_THUMB_CONFIG as inline CSS vars", () => {
    const provinces = mergeVao10(VAO10_PROVINCES, []);
    const { container } = render(<Vao10Client provinces={provinces} />);
    const v10p = container.querySelector(".v10p") as HTMLElement;
    expect(v10p.style.getPropertyValue("--thumb-saturate")).toBe("1.18");
    expect(v10p.style.getPropertyValue("--thumb-photo-veil")).toBe("0.22");
  });
});
