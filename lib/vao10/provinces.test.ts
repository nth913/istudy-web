import { describe, it, expect } from "vitest";
import {
  VAO10_PROVINCES,
  norm,
  sortByName,
  presentLetters,
  sizeFor,
  VAO10_ALPHABET,
} from "./provinces";

describe("vao10 provinces — cấu trúc y hệt design", () => {
  it("có đúng 34 đơn vị hành chính cấp tỉnh", () => {
    expect(VAO10_PROVINCES).toHaveLength(34);
  });

  it("tên tỉnh là duy nhất", () => {
    const names = VAO10_PROVINCES.map((p) => p.name);
    expect(new Set(names).size).toBe(34);
  });

  it("mỗi tỉnh có q (số câu) + time (thời lượng)", () => {
    for (const p of VAO10_PROVINCES) {
      expect(typeof p.q).toBe("number");
      expect(typeof p.time).toBe("string");
      expect(p.time.length).toBeGreaterThan(0);
    }
  });

  it("Hà Nội/Hải Phòng/TP.HCM có key ảnh địa danh; TP.HCM thi 90 phút", () => {
    const byName = Object.fromEntries(VAO10_PROVINCES.map((p) => [p.name, p]));
    expect(byName["Hà Nội"].key).toBe("ha noi");
    expect(byName["Hải Phòng"].key).toBe("hai phong");
    expect(byName["TP.HCM"].key).toBe("tp.hcm");
    expect(byName["TP.HCM"].time).toBe("90 phút");
  });
});

describe("norm — chuẩn hoá khoá (khớp CMS normProvinceKey)", () => {
  it("bỏ dấu + thường hoá", () => {
    expect(norm("Hà Nội")).toBe("ha noi");
    expect(norm("Đà Nẵng")).toBe("da nang");
    expect(norm("TP.HCM")).toBe("tp.hcm");
    expect(norm("Thừa Thiên Huế")).toBe("thua thien hue");
  });
  it("đ → d", () => {
    expect(norm("Đồng Nai")).toBe("dong nai");
    expect(norm("Điện Biên")).toBe("dien bien");
  });
  it("an toàn với null/undefined", () => {
    expect(norm(null)).toBe("");
    expect(norm(undefined)).toBe("");
  });
});

describe("sort A–Z + thanh chữ cái", () => {
  it("sortByName xếp theo locale vi", () => {
    const sorted = sortByName(VAO10_PROVINCES);
    expect(sorted[0].name).toBe("An Giang");
    // không mutate input
    expect(VAO10_PROVINCES[0].name).toBe("Hà Nội");
  });

  it("presentLetters trả các chữ đầu (uppercase) không trùng", () => {
    const sorted = sortByName(VAO10_PROVINCES);
    const letters = presentLetters(sorted);
    expect(letters).toContain("A"); // An Giang
    expect(letters).toContain("H"); // Hà Nội, Huế...
    expect(letters).toContain("T"); // TP.HCM, Tây Ninh...
    expect(new Set(letters).size).toBe(letters.length);
    // mọi chữ phải nằm trong bảng chữ cái design
    for (const L of letters) expect(VAO10_ALPHABET).toContain(L);
  });
});

describe("sizeFor — mosaic to/nhỏ deterministic (y hệt design)", () => {
  it("i%11===0 → big; i%7===3 → wide; còn lại rỗng", () => {
    expect(sizeFor(0)).toBe("big");
    expect(sizeFor(11)).toBe("big");
    expect(sizeFor(3)).toBe("wide");
    expect(sizeFor(10)).toBe("wide"); // 10%7===3
    expect(sizeFor(1)).toBe("");
    expect(sizeFor(2)).toBe("");
  });
});
