import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { VAO10_PROVINCES } from "@/lib/vao10/provinces";
import { fetchVao10Overlay, mergeVao10 } from "@/lib/api/vao10";
import { DE_CHINH_THUC_VAO_10_2026_CSS } from "@/lib/page-css/de-chinh-thuc-vao-10-2026";
import { Vao10Client } from "./Vao10Client";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await resolveSeo({
    collection: "exams",
    routeTitle: "Đề chính thức vào lớp 10 năm 2026 — Tiếng Anh",
    routeDescription:
      "Đề tuyển sinh vào lớp 10 môn Tiếng Anh năm 2026 chính thức của 34 tỉnh thành — kèm đáp án và làm bài online.",
    subtitle: "Đề thi",
  });
  return buildMetadata(seo, "https://aistudy.com.vn/de-chinh-thuc-vao-10-2026");
}

export default async function DeChinhThucVao102026Page() {
  // FE hardcode cấu trúc 34 tỉnh; CMS chỉ overlay slug + thumbnail.
  // CMS không reachable → overlay rỗng → mọi tỉnh "Đang cập nhật ^^" + thumbnail design.
  const overlay = await fetchVao10Overlay();
  const provinces = mergeVao10(VAO10_PROVINCES, overlay.items);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DE_CHINH_THUC_VAO_10_2026_CSS }} />
      <Vao10Client provinces={provinces} />
      <Footer />
    </>
  );
}
