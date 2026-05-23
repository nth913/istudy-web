import { redirect } from "next/navigation";

/**
 * Landing redirect for `/de-thi-chi-tiet` (no slug).
 *
 * Defaults to the 24-mã THPT QG variant — matches the original copy
 * (`Đề thi tốt nghiệp THPT Quốc gia 2026 — Môn Tiếng Anh`) and the
 * auto-enable-PDF date previously hardcoded in the page (`27/06/2026`).
 */
export default function DeThiChiTietLanding() {
  redirect("/de-thi-chi-tiet/de-thi-thpt-qg-2026-tieng-anh");
}
