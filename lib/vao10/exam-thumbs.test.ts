import { describe, it, expect } from "vitest";
import { defaultProvinceThumbHtml } from "./exam-thumbs";
import type { Vao10Province } from "./provinces";

const P = (over: Partial<Vao10Province>): Vao10Province => ({
  name: "X",
  q: 40,
  time: "60 phút",
  ...over,
});

describe("defaultProvinceThumbHtml — thumbnail mặc định y hệt design", () => {
  it("Hà Nội (thumbVariant 0) → ảnh địa danh khung scrim, có tên tỉnh", () => {
    const html = defaultProvinceThumbHtml(P({ name: "Hà Nội", key: "ha noi", thumbVariant: 0 }));
    expect(html).toContain("pthumb--scrim");
    expect(html).toContain("Hà Nội");
  });

  it("tỉnh có ảnh địa danh nhưng không ép variant → vẫn ra khung pthumb", () => {
    const html = defaultProvinceThumbHtml(P({ name: "Hải Phòng", key: "hai phong" }));
    expect(html).toContain("pthumb");
  });

  it("tỉnh KHÔNG có ảnh địa danh → fallback bộ thumb nghệ thuật", () => {
    const html = defaultProvinceThumbHtml(P({ name: "Quảng Ninh" }));
    expect(html).toContain('class="thumb thumb--');
    expect(html).not.toContain("pthumb");
  });

  it("deterministic — cùng tỉnh cho cùng output (refresh không đổi thumb)", () => {
    const a = defaultProvinceThumbHtml(P({ name: "Cần Thơ" }));
    const b = defaultProvinceThumbHtml(P({ name: "Cần Thơ" }));
    expect(a).toBe(b);
  });

  it("luôn trả 1 string HTML không rỗng cho mọi tỉnh", () => {
    for (const name of ["Nghệ An", "Đắk Lắk", "Cà Mau", "TP.HCM", "Huế"]) {
      const html = defaultProvinceThumbHtml(P({ name }));
      expect(typeof html).toBe("string");
      expect(html.length).toBeGreaterThan(10);
    }
  });
});
