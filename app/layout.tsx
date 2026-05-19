import type { Metadata } from "next";
import EventPopup from "@/components/EventPopup";
import "./globals.css";

export const metadata: Metadata = {
  title: "istudy — Better Understanding, Better Learning",
  description:
    "Nền tảng luyện thi tiếng Anh hàng đầu Việt Nam — kho đề thi, bài giảng, từ vựng & ngữ pháp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <EventPopup />
      </body>
    </html>
  );
}
