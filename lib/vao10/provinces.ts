/* ============================================================
   provinces.ts — cấu trúc 34 tỉnh/thành cho trang
   "Đề chính thức vào lớp 10 — 2026" (mẫu D).
   Port nguyên từ design vao10-2026.js (P array). FE là single
   source của cấu trúc; CMS chỉ overlay slug + thumbnail (lib/api/vao10).
   34 đơn vị hành chính cấp tỉnh sau cải cách 2025.
   ============================================================ */

export const VAO10_YEAR = 2026;

export interface Vao10Province {
  /** Tên hiển thị, đúng y design. Cũng là khoá merge (qua norm()). */
  name: string;
  /** Khoá ảnh địa danh có sẵn (PROVINCE_THUMBS). */
  key?: string;
  /** Số câu. */
  q: number;
  /** Thời lượng. */
  time: string;
  /** Tỉnh nổi bật (tile to + badge "Thi là Đỗ"). */
  hot?: boolean;
  /** Ép 1 ảnh địa danh cụ thể (index trong PROVINCE_THUMBS[key]). */
  thumbVariant?: number;
}

/** 34 tỉnh — y hệt design (đã bỏ field upcoming/date: trạng thái nay do CMS slug quyết). */
export const VAO10_PROVINCES: Vao10Province[] = [
  { name: "Hà Nội", key: "ha noi", q: 40, time: "60 phút", hot: true, thumbVariant: 0 },
  { name: "Hải Phòng", key: "hai phong", q: 40, time: "60 phút", hot: true },
  { name: "Quảng Ninh", q: 40, time: "60 phút" },
  { name: "Bắc Ninh", q: 40, time: "60 phút", hot: true },
  { name: "Ninh Bình", q: 40, time: "60 phút", hot: true },
  { name: "Hưng Yên", q: 40, time: "60 phút" },
  { name: "Phú Thọ", q: 40, time: "60 phút" },
  { name: "Thái Nguyên", q: 40, time: "60 phút" },
  { name: "Lào Cai", q: 40, time: "60 phút" },
  { name: "Tuyên Quang", q: 40, time: "60 phút" },
  { name: "Sơn La", q: 40, time: "60 phút" },
  { name: "Lạng Sơn", q: 40, time: "60 phút" },
  { name: "Cao Bằng", q: 40, time: "60 phút" },
  { name: "Điện Biên", q: 40, time: "60 phút" },
  { name: "Lai Châu", q: 40, time: "60 phút" },
  { name: "Nghệ An", q: 40, time: "60 phút", hot: true },
  { name: "Thanh Hóa", q: 40, time: "60 phút", hot: true },
  { name: "Đà Nẵng", q: 40, time: "60 phút", hot: true },
  { name: "Huế", q: 40, time: "60 phút" },
  { name: "Khánh Hòa", q: 40, time: "60 phút" },
  { name: "Hà Tĩnh", q: 40, time: "60 phút" },
  { name: "Lâm Đồng", q: 40, time: "60 phút" },
  { name: "Đắk Lắk", q: 40, time: "60 phút" },
  { name: "Gia Lai", q: 40, time: "60 phút" },
  { name: "Quảng Ngãi", q: 40, time: "60 phút" },
  { name: "Quảng Trị", q: 40, time: "60 phút" },
  { name: "TP.HCM", key: "tp.hcm", q: 40, time: "90 phút", hot: true },
  { name: "Đồng Nai", q: 40, time: "60 phút", hot: true },
  { name: "Cần Thơ", q: 40, time: "60 phút" },
  { name: "An Giang", q: 40, time: "60 phút" },
  { name: "Tây Ninh", q: 40, time: "60 phút" },
  { name: "Đồng Tháp", q: 40, time: "60 phút" },
  { name: "Vĩnh Long", q: 40, time: "60 phút" },
  { name: "Cà Mau", q: 40, time: "60 phút" },
];

/**
 * Chuẩn hoá tên (bỏ dấu, thường hoá) — tương đương design vao10-2026.js.
 * Dùng cho: khoá merge overlay (khớp CMS normProvinceKey), tìm kiếm,
 * nhóm chữ cái, khoá ảnh địa danh.
 * `\p{Diacritic}` (sau NFD) tương đương `[̀-ͯ]` cho tiếng Việt.
 */
export function norm(s: string | null | undefined): string {
  return String(s == null ? "" : s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .trim();
}

/** Bảng chữ cái thanh A–Z (tiếng Việt, không J/W/Z) — y hệt design. */
export const VAO10_ALPHABET = "ABCDEFGHIKLMNOPQRSTUVXY".split("");

/** Sắp xếp A–Z theo locale "vi" — y hệt design. */
export function sortByName<T extends { name: string }>(list: T[]): T[] {
  return list.slice().sort((a, b) => norm(a.name).localeCompare(norm(b.name), "vi"));
}

/** Các chữ cái đầu hiện diện (uppercase) trong danh sách đã sort. */
export function presentLetters(list: { name: string }[]): string[] {
  const present: string[] = [];
  list.forEach((p) => {
    const L = norm(p.name)[0]?.toUpperCase();
    if (L && !present.includes(L)) present.push(L);
  });
  return present;
}

/** Kích thước tile mosaic theo index (sau sort) — y hệt design. */
export function sizeFor(i: number): "big" | "wide" | "" {
  return i % 11 === 0 ? "big" : i % 7 === 3 ? "wide" : "";
}

/** Bộ sticker xoay vòng — y hệt design. */
export const VAO10_STICKERS = ["🌸", "⭐", "🎀", "🦋", "🌟", "💫"];
