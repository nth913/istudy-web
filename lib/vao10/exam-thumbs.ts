/* ============================================================
   exam-thumbs.ts — port nguyên exam-thumbs.js (design istudy-v4-1).
   Sinh thumbnail MẶC ĐỊNH (ảnh địa danh tỉnh + bộ nghệ thuật) cho
   trang "Đề chính thức vào 10 — 2026". Trả HTML string → render qua
   dangerouslySetInnerHTML. CMS thumbnail override xử lý riêng ở component.
   Ảnh hoa phượng / địa danh: Wikimedia Commons (CC BY-SA / PD).
   ============================================================ */
import { norm, VAO10_YEAR, type Vao10Province } from "./provinces";

const IMG: Record<string, string> = {
  a: "url('https://upload.wikimedia.org/wikipedia/commons/f/ff/Delonix_regia_flower.JPG')",
  b: "url('https://upload.wikimedia.org/wikipedia/commons/5/54/Acacia_roja_-_Flamboyant_(Delonix_regia)_-_Flor_(14343660050).jpg')",
  c: "url('https://upload.wikimedia.org/wikipedia/commons/7/7a/Acacia_roja_-_Flamboyant_(Delonix_regia)_-_Flor_(14343722568).jpg')",
  d: "url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Acacia_roja_(Delonix_regia)_(14553225752).jpg')",
  e: "url('https://upload.wikimedia.org/wikipedia/commons/8/8c/Acacia_roja_-_Flamboyant_(Delonix_regia)_(14342540529).jpg')",
  f: "url('https://upload.wikimedia.org/wikipedia/commons/8/89/Acacia_roja_-_Flamboyant_(Delonix_regia)_-_Flor_(14528839494).jpg')",
  g: "url('https://upload.wikimedia.org/wikipedia/commons/5/58/30_Red_Flowers_(9062677089).jpg')",
  h: "url('https://upload.wikimedia.org/wikipedia/commons/0/0a/Acacia_roja_-_Flamboyant_(Delonix_regia)_(14506054476).jpg')",
};

/* Mặt mèo lấy từ nút chuyển sáng/tối (dm-cat-sun). */
function cat(size: number): string {
  return (
    '<span class="catface" style="width:' + size + "px;height:" + size + 'px">' +
    '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<g stroke="#FBBF24" stroke-width="1.8" stroke-linecap="round">' +
    '<line x1="18" y1="1.5" x2="18" y2="4"/><line x1="6" y1="6" x2="7.8" y2="7.8"/><line x1="30" y1="6" x2="28.2" y2="7.8"/><line x1="1.5" y1="18" x2="4" y2="18"/><line x1="34.5" y1="18" x2="32" y2="18"/>' +
    "</g>" +
    '<path d="M7.5 14 L11 5.5 L16 12 Z" fill="#F97316"/><path d="M28.5 14 L25 5.5 L20 12 Z" fill="#F97316"/>' +
    '<path d="M10.2 11.8 L12.5 7.8 L14.6 11.8 Z" fill="#FCA5A5"/><path d="M25.8 11.8 L23.5 7.8 L21.4 11.8 Z" fill="#FCA5A5"/>' +
    '<ellipse cx="18" cy="21" rx="10.2" ry="9" fill="#FBBF24"/>' +
    '<path d="M14.2 13.5 q1 1.5 0 3" stroke="#F97316" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M21.8 13.5 q-1 1.5 0 3" stroke="#F97316" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M18 13 v3.2" stroke="#F97316" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="11.8" cy="23" rx="2.2" ry="1.3" fill="#F472B6" opacity="0.75"/><ellipse cx="24.2" cy="23" rx="2.2" ry="1.3" fill="#F472B6" opacity="0.75"/>' +
    '<circle cx="14.2" cy="20" r="1.7" fill="#1F2937"/><circle cx="21.8" cy="20" r="1.7" fill="#1F2937"/><circle cx="14.7" cy="19.4" r="0.6" fill="#fff"/><circle cx="22.3" cy="19.4" r="0.6" fill="#fff"/>' +
    '<path d="M16.9 22.8 L19.1 22.8 L18 24.2 Z" fill="#EC4899"/>' +
    '<path d="M18 24.2 q-1.3 1.6 -2.5 0.8" stroke="#1F2937" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M18 24.2 q1.3 1.6 2.5 0.8" stroke="#1F2937" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M9 22 L5.5 21.3 M9 23.4 L5.5 24" stroke="#92400E" stroke-width="0.8" stroke-linecap="round"/><path d="M27 22 L30.5 21.3 M27 23.4 L30.5 24" stroke="#92400E" stroke-width="0.8" stroke-linecap="round"/>' +
    "</svg></span>"
  );
}

function bg(url: string): string {
  return ' style="background-image:' + url + '"';
}

/* slug → HTML string (bộ thumbnail nghệ thuật). */
const T: Record<string, string> = {
  "meo-pastel": '<div class="thumb thumb--meo-pastel"><span class="face">' + cat(48) + "</span></div>",

  "thi-la-do":
    '<div class="thumb thumb--thi-la-do">' +
    '<span class="conf c1">🎊</span><span class="conf c2">✨</span><span class="conf c3">🎉</span><span class="conf c4">⭐</span>' +
    '<span class="core"><span class="cap2">🎓</span><b>Thi là Đỗ</b></span></div>',

  "mua-thi": '<div class="thumb thumb--mua-thi"><span class="pen">✏️</span><span class="scrib">Mùa thi 2026</span></div>',

  "phuong-he":
    '<div class="thumb thumb--phuong-he"><span class="pet p1">🌺</span><span class="pet p2">🍃</span><span class="pet p3">🌺</span><span class="word">HÈ 2026</span></div>',

  "sticker-co-vn":
    '<div class="thumb thumb--sticker-co-vn"><span class="s1">📚</span><span class="s2">⭐</span><span class="s3">✏️</span><span class="s4">📌</span><span class="s5">🇻🇳</span></div>',

  "meo-doc-sach":
    '<div class="thumb thumb--meo-doc-sach"><span class="duo">' + cat(34) + '📖</span><span class="lbl">MEOW &amp; READ</span></div>',

  "may-mo-mang":
    '<div class="thumb thumb--may-mo-mang"><span class="star">⭐</span><span class="star2">✦</span><span class="cloud">☁️</span></div>',

  "mascot-cheer":
    '<div class="thumb thumb--mascot-cheer"><span class="bubble">You got this!</span><span class="cat">' + cat(38) + "</span></div>",

  /* ---- ảnh hoa phượng thật ---- */
  "phuong-anh": '<div class="thumb thumb--photo"' + bg(IMG.a) + "></div>",
  "mua-thi-anh": '<div class="thumb thumb--photo"' + bg(IMG.b) + '><span class="ov-full"></span><span class="cap-c">MÙA THI 2026</span></div>',
  "si-tu": '<div class="thumb thumb--photo"' + bg(IMG.c) + "></div>",
  "phuong-tho": '<div class="thumb thumb--photo" style="background-image:' + IMG.b + ';background-position:left center"></div>',

  /* ---- hoa phượng + giấy + mộng mơ ---- */
  "phuong-polaroid":
    '<div class="thumb thumb--phuong-polaroid"><div class="pol"><div class="ph"' + bg(IMG.a) + '></div><div class="cap">Hè · 2026</div></div><span class="tape"></span></div>',

  "phuong-ep":
    '<div class="thumb thumb--phuong-ep"><span class="date">JUN 2026</span><div class="ph"' + bg(IMG.g) + '><span class="m tl"></span><span class="m br"></span></div></div>',

  "phuong-mong": '<div class="thumb thumb--phuong-mong"' + bg(IMG.d) + '><span class="wash"></span><span class="leak"></span><span class="vig"></span></div>',

  "phuong-postcard":
    '<div class="thumb thumb--phuong-postcard"><div class="card2"><div class="ph"' + bg(IMG.b) + '></div><div class="right"><span class="stamp"' + bg(IMG.c) + '></span><div class="lines"><span class="l1"></span><span class="l2"></span><span class="l3"></span></div></div></div></div>',

  "phuong-washi":
    '<div class="thumb thumb--phuong-washi"><div class="ph"' + bg(IMG.c) + '></div><span class="tape t1"></span><span class="tape t2"></span></div>',

  "phuong-tem": '<div class="thumb thumb--phuong-tem"><div class="stamp"><div class="ph"' + bg(IMG.f) + "></div></div></div>",

  "phuong-window":
    '<div class="thumb thumb--phuong-window"' + bg(IMG.e) + '><span class="paper"></span><span class="ring"></span><span class="petal p1"></span><span class="petal p2"></span></div>',

  "phuong-may":
    '<div class="thumb thumb--phuong-may"><span class="cloud c1"></span><span class="cloud c2"></span><span class="sp sp1">✦</span><span class="sp sp2">✦</span><span class="petal mp1"></span><span class="petal mp2"></span><span class="petal mp3"></span><span class="hill"' + bg(IMG.h) + "></span></div>",
};

const SLUGS = Object.keys(T);

/* ===== PROVINCE THUMBS · ảnh địa danh (3 khung tái dùng) ===== */
function wm(tail: string): string {
  return "url('https://upload.wikimedia.org/wikipedia/commons/" + tail + "')";
}
function esc(s: string): string {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

interface PvThumb {
  frame: "scrim" | "tint" | "bar";
  bg: string;
  name: string;
  tag?: string;
  eyebrow?: string;
}

function pvScrim(bgUrl: string, name: string, tag?: string): string {
  return (
    '<div class="thumb pthumb pthumb--scrim" style="background-image:' + bgUrl + '">' +
    (tag ? '<span class="pv-tag">' + esc(tag) + "</span>" : "") +
    '<span class="pv-name">' + esc(name) + "</span></div>"
  );
}
function pvTint(bgUrl: string, name: string, eyebrow?: string): string {
  return (
    '<div class="thumb pthumb pthumb--tint" style="background-image:' + bgUrl + '">' +
    '<span class="pv-center"><span class="pv-eyebrow">' + esc(eyebrow || "ĐỀ TIẾNG ANH") + "</span>" +
    "<b>" + esc(name) + '</b><span class="pv-rule"></span></span></div>'
  );
}
function pvBar(bgUrl: string, name: string, tag?: string): string {
  return (
    '<div class="thumb pthumb pthumb--bar"><div class="pv-photo" style="background-image:' + bgUrl + '"></div>' +
    '<div class="pv-strip"><span class="pv-dot"></span><b>' + esc(name) + "</b>" +
    "<small>" + esc(tag || "TIẾNG ANH") + "</small></div></div>"
  );
}
const PVFRAME = { scrim: pvScrim, tint: pvTint, bar: pvBar };
function renderPvThumb(t: PvThumb): string {
  return (PVFRAME[t.frame] || pvScrim)(t.bg, t.name, t.tag != null ? t.tag : t.eyebrow);
}

/* khoá = tên tỉnh đã chuẩn hoá (norm) */
const PROVINCE_THUMBS: Record<string, PvThumb[]> = {
  "ha noi": [
    { frame: "scrim", bg: wm("b/b4/Thap_rua.jpg"), name: "Hà Nội", tag: "Tiếng Anh" },
    { frame: "tint", bg: wm("6/66/46_Tr%E1%BA%A1ng_Nguy%C3%AAn_(V%C4%83n_Mi%E1%BA%BFu_-_Qu%E1%BB%91c_T%E1%BB%AD_Gi%C3%A1m).JPG"), name: "HÀ NỘI" },
    { frame: "bar", bg: wm("4/40/Night_in_Hanoi%2C_over_Hoan_Kiem_Lake_(2005).jpg"), name: "Hà Nội", tag: "TIẾNG ANH" },
  ],
  "tp.hcm": [
    { frame: "scrim", bg: wm("2/2d/Ch%E1%BB%A3_B%E1%BA%BFn_Th%C3%A0nh%2C_2015.jpg"), name: "TP.HCM", tag: "Tiếng Anh" },
    { frame: "tint", bg: wm("b/b8/Ben_Thanh_Market_(36350099003).jpg"), name: "TP.HCM" },
    { frame: "bar", bg: wm("9/9f/The_B%E1%BA%BFn_Th%C3%A0nh_market_in_Saigon.JPG"), name: "TP.HCM", tag: "TIẾNG ANH" },
  ],
  "hai phong": [
    { frame: "scrim", bg: IMG.a, name: "Hải Phòng", tag: "Tiếng Anh" },
    { frame: "tint", bg: IMG.d, name: "HẢI PHÒNG" },
    { frame: "bar", bg: IMG.c, name: "Hải Phòng", tag: "TIẾNG ANH" },
  ],
};

/* hash chuỗi → số nguyên không âm (ổn định) — y hệt design (fnv1a). */
function hash(str: string | null | undefined): number {
  const s = String(str == null ? "" : str);
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h >>> 0;
}

/** Trả HTML thumbnail cho 1 đề: theo tỉnh nếu có ảnh địa danh, không thì fallback bộ nghệ thuật. */
function renderExamThumbFor(exam: { province?: string; title?: string }): string {
  const list = exam.province ? PROVINCE_THUMBS[norm(exam.province)] : null;
  if (list && list.length) {
    return renderPvThumb(list[hash(exam.title || exam.province) % list.length]);
  }
  return T[SLUGS[hash(exam.title || "") % SLUGS.length]];
}

/**
 * Thumbnail MẶC ĐỊNH cho 1 tỉnh — y hệt design vao10-2026.js thumbFor(p):
 * ép ảnh địa danh nếu có thumbVariant + key trong PROVINCE_THUMBS; else fallback theo tỉnh/nghệ thuật.
 */
export function defaultProvinceThumbHtml(p: Vao10Province): string {
  if (p.thumbVariant != null) {
    const list = PROVINCE_THUMBS[norm(p.key || p.name)];
    if (list && list[p.thumbVariant]) return renderPvThumb(list[p.thumbVariant]);
  }
  return renderExamThumbFor({ province: p.key || p.name, title: p.name + " " + VAO10_YEAR });
}

/* export nội bộ cho test */
export const __test = { PROVINCE_THUMBS, SLUGS, renderExamThumbFor, hash };
