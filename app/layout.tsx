import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import EventPopup from "@/components/EventPopup";
import { VerifyToast } from "@/components/VerifyToast";
import "./globals.css";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  title: "istudy — Better Understanding, Better Learning",
  description:
    "Nền tảng luyện thi tiếng Anh hàng đầu Việt Nam — kho đề thi, bài giảng, từ vựng & ngữ pháp.",
};

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
