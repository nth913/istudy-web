import { redirect } from "next/navigation";

// Static placeholder route — every detail render now lives at
// /bai-viet-chi-tiet/[slug]. Visiting the slug-less URL bounces back to the
// blog index so we don't leak the old hardcoded demo content.
export default function BaiVietChiTietRedirect() {
  redirect("/bai-viet");
}
