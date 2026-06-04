/* ============================================================
   lib/api/vao10.ts — overlay CMS cho trang "Đề chính thức vào 10 — 2026".
   FE hardcode cấu trúc 34 tỉnh (lib/vao10/provinces); CMS chỉ overlay
   slug đề + thumbnail theo tỉnh. Merge bằng norm(name) (khớp CMS normProvinceKey).
   Trạng thái: có slug → "ready" (click sang /de-thi-chi-tiet/<slug>);
   không slug → "updating" ("Đang cập nhật ^^").
   ============================================================ */
import { norm, type Vao10Province } from "@/lib/vao10/provinces";

/** 1 item overlay từ CMS (GET /api/vao10/2026). */
export interface Vao10OverlayItem {
  key: string;
  slug: string | null;
  thumbnailUrl: string | null;
  examTitle: string | null;
}

export interface Vao10OverlayResponse {
  items: Vao10OverlayItem[];
  updatedAt: string;
}

/** Tỉnh sau khi merge cấu trúc FE + overlay CMS. */
export interface Vao10MergedProvince extends Vao10Province {
  slug: string | null;
  thumbnailUrl: string | null;
  status: "ready" | "updating";
}

function cmsBase(): string {
  return process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3131";
}

/** Lấy overlay từ CMS. Lỗi / không reachable → rỗng (trang vẫn render, mọi tỉnh "Đang cập nhật ^^"). */
export async function fetchVao10Overlay(): Promise<Vao10OverlayResponse> {
  try {
    const res = await fetch(`${cmsBase()}/api/vao10/2026`, {
      next: { revalidate: 60, tags: ["vao10-2026"] },
    });
    if (!res.ok) throw new Error(`vao10/2026 failed: ${res.status}`);
    const json = (await res.json()) as Partial<Vao10OverlayResponse>;
    return {
      items: Array.isArray(json.items) ? json.items : [],
      updatedAt: json.updatedAt ?? "",
    };
  } catch {
    return { items: [], updatedAt: "" };
  }
}

/**
 * Merge cấu trúc 34 tỉnh (FE) với overlay (CMS) theo norm(name).
 * Pure — test được không cần fetch.
 */
export function mergeVao10(
  provinces: Vao10Province[],
  overlay: Vao10OverlayItem[],
): Vao10MergedProvince[] {
  const byKey = new Map<string, Vao10OverlayItem>();
  for (const it of overlay) {
    if (it && typeof it.key === "string") byKey.set(it.key, it);
  }
  return provinces.map((p) => {
    const ov = byKey.get(norm(p.name));
    const slug = ov?.slug ?? null;
    return {
      ...p,
      slug,
      thumbnailUrl: ov?.thumbnailUrl ?? null,
      status: slug ? "ready" : "updating",
    };
  });
}

/** Link đích của 1 tile: chỉ tỉnh "ready" mới click được. */
export function hrefForMerged(p: Vao10MergedProvince): string | null {
  return p.status === "ready" && p.slug ? `/de-thi-chi-tiet/${p.slug}` : null;
}
