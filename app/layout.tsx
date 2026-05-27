import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import EventPopup from "@/components/EventPopup";
import { VerifyToast } from "@/components/VerifyToast";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import "./globals.css";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await resolveSeo({
    collection: null,
    routeTitle: "Học Tiếng Anh: đề THPT, vào 10, từ vựng, ngữ pháp",
    routeDescription:
      "Ngân hàng đề Tiếng Anh · Đề vào 10 · Đề vào chuyên · Từ vựng · Ngữ pháp · blog Tiếng Anh — cập nhật liên tục, phù hợp học sinh/giáo viên THCS – THPT.",
  });
  return buildMetadata(seo);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var p=location.pathname;var isPrint=p==='/print'||p.indexOf('/print/')===0;var t=isPrint?'light':(localStorage.getItem('istudyTheme')||'light');var r=document.documentElement;r.setAttribute('data-theme',t);r.style.colorScheme=t==='dark'?'dark':'light';}catch(e){}})();",
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <EventPopup />
        <VerifyToast />
        <FloatingThemeToggle />
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
