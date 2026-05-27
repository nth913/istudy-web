import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import EventPopup from "@/components/EventPopup";
import { VerifyToast } from "@/components/VerifyToast";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import "./globals.css";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await resolveSeo({
    collection: null,
    routeTitle: "Học Tiếng Anh: đề THPT, vào 10, từ vựng, ngữ pháp",
    routeDescription:
      "Luyện Tiếng Anh online miễn phí: kho đề THPT Tiếng Anh, đề vào 10 Tiếng Anh (đại trà & chuyên), từ vựng, ngữ pháp, blog học Tiếng Anh — cập nhật liên tục, phù hợp học sinh THCS – THPT.",
  });
  return buildMetadata(seo);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <EventPopup />
        <VerifyToast />
        {ADSENSE_CLIENT_ID && (
          <Script
            id="adsense-init"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
