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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Baloo+2:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Baloo+2:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap"
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
