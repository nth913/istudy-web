import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "istudy — Better Understanding, Better Learning",
  description: "Nền tảng luyện thi tiếng Anh hàng đầu Việt Nam — đề thi, bài giảng, ngữ pháp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
