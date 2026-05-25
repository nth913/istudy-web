import type { Metadata } from "next";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await resolveSeo({
    collection: null,
    routeTitle: "Sắp ra mắt",
    noindex: true,
  });
  return buildMetadata(seo, "https://aistudy.com.vn/coming-soon");
}

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
