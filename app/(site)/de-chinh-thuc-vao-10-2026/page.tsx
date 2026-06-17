import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { VAO10_PROVINCES } from "@/lib/vao10/provinces";
import { fetchVao10Overlay, mergeVao10 } from "@/lib/api/vao10";
import { DE_CHINH_THUC_VAO_10_2026_CSS } from "@/lib/page-css/de-chinh-thuc-vao-10-2026";
import { Vao10Client } from "./Vao10Client";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema, collectionPageSchema, faqPageSchema } from "@/lib/jsonld";
import { VAO10_FAQ } from "@/lib/vao10/faq";

export const revalidate = 86400;

const PAGE_URL = "https://aistudy.com.vn/de-chinh-thuc-vao-10-2026";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await resolveSeo({
    collection: "exams",
    routeTitle: "Đề chính thức vào lớp 10 Tiếng Anh 2026 | 34 tỉnh đáp án",
    routeDescription:
      "Đề thi tuyển sinh vào lớp 10 môn Tiếng Anh 2026 — tổng hợp 34 tỉnh thành do Sở GD&ĐT công bố. Kèm đáp án chi tiết, phân tích & luyện đề online miễn phí.",
    subtitle: "Đề thi",
  });
  return buildMetadata(seo, PAGE_URL);
}

export default async function DeChinhThucVao102026Page() {
  // FE hardcode cấu trúc 34 tỉnh; CMS chỉ overlay slug + thumbnail.
  // CMS không reachable → overlay rỗng → mọi tỉnh "Đang cập nhật ^^" + thumbnail design.
  const overlay = await fetchVao10Overlay();
  const provinces = mergeVao10(VAO10_PROVINCES, overlay.items);

  const breadcrumb = breadcrumbSchema([
    { name: "Trang chủ", url: "/" },
    { name: "Kho đề thi", url: "/kho-de-thi" },
    { name: "Đề thi vào lớp 10", url: "/kho-de-thi?cat=vao-10" },
    { name: "Đề chính thức 2026", url: "/de-chinh-thuc-vao-10-2026" },
  ]);
  const itemList = itemListSchema(provinces);
  const faqPage = faqPageSchema(VAO10_FAQ);
  const collectionPage = collectionPageSchema({
    name: "Đề chính thức vào lớp 10 Tiếng Anh 2026 — 34 tỉnh thành",
    description:
      "Tổng hợp đề thi tuyển sinh vào lớp 10 môn Tiếng Anh 2026 do Sở GD&ĐT 34 tỉnh thành công bố. Kèm đáp án chi tiết & luyện đề online miễn phí.",
    url: PAGE_URL,
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />
      <JsonLd data={faqPage} />
      <JsonLd data={collectionPage} />
      <style dangerouslySetInnerHTML={{ __html: DE_CHINH_THUC_VAO_10_2026_CSS }} />
      <Vao10Client provinces={provinces} />
      <Footer />
    </>
  );
}
